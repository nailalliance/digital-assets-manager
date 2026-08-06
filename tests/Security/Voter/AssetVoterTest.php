<?php

namespace App\Tests\Security\Voter;

use App\Entity\Assets\Assets;
use App\Entity\Assets\AssetStatusEnum;
use App\Entity\Assets\Brands;
use App\Entity\Assets\Categories;
use App\Entity\User;
use App\Security\Voter\AssetVoter;
use App\Service\DesignerAssetAccessChecker;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\Authorization\Voter\VoterInterface;

class AssetVoterTest extends TestCase
{
    #[DataProvider('provideVoteCases')]
    public function testVote(array $userRoles, array $userRestrictedBrandIds, int $assetParentBrandId, AssetStatusEnum $assetStatus, int $expectedVote): void
    {
        // Step 1: Create the User and assign their brands
        $user = new User();
        $user->setRoles($userRoles);
        foreach ($userRestrictedBrandIds as $brandId) {
            $restrictedBrand = $this->createMock(Brands::class);
            $restrictedBrand->method('getId')->willReturn($brandId);
            $user->addRestrictedBrand($restrictedBrand);
        }

        // Step 2: Create the Asset with its parent brand
        $parentBrand = $this->createMock(Brands::class);
        $parentBrand->method('getId')->willReturn($assetParentBrandId);
        $childBrand = $this->createMock(Brands::class);
        $childBrand->method('getBrands')->willReturn($parentBrand);
        $asset = new Assets();
        $asset->setStatus($assetStatus);
        $asset->addBrand($childBrand);

        // Step 3: Set up the mocks and run the test
        $mockSecurity = $this->createMock(Security::class);
        $mockSecurity->method('isGranted')->willReturnCallback(fn(string $attribute) => in_array($attribute, $userRoles));

        $voter = new AssetVoter($mockSecurity, new DesignerAssetAccessChecker());
        $token = new UsernamePasswordToken($user, 'main', $user->getRoles());

        $this->assertSame($expectedVote, $voter->vote($token, $asset, [AssetVoter::VIEW]));
    }

    public static function provideVoteCases(): \Generator
    {
        // Data format: [userRoles, userRestrictedBrandIds, assetParentBrandId, expectedVote]
        yield 'Designer can view any asset' => [
            ['ROLE_FTP_DESIGNER'],
            [], // No brand restrictions
            99, // Asset can be from any brand
            AssetStatusEnum::DESIGNER,
            VoterInterface::ACCESS_GRANTED
        ];

        yield 'Restricted user can view allowed asset' => [
            ['ROLE_BOARD_USER'],
            [3], // User has access to brand 3
            3,   // Asset is from brand 3
            AssetStatusEnum::ACTIVE,
            VoterInterface::ACCESS_GRANTED
        ];

        yield 'Restricted user cannot view designer-only asset' => [
            ['ROLE_BOARD_USER'],
            [3], // User has access to brand 3
            3,   // Asset is from brand 3
            AssetStatusEnum::DESIGNER,
            VoterInterface::ACCESS_DENIED
        ];

        yield 'Restricted user cannot view disallowed asset' => [
            ['ROLE_BOARD_USER'],
            [3], // User has access to brand 3
            4,   // Asset is from brand 4
            AssetStatusEnum::ACTIVE,
            VoterInterface::ACCESS_DENIED
        ];

        yield 'User with no brands cannot view any asset' => [
            ['ROLE_BOARD_USER'],
            [], // User has no brand access
            5,  // Asset is from any brand
            AssetStatusEnum::ACTIVE,
            VoterInterface::ACCESS_DENIED
        ];
    }

    public function testRegularUserCanViewDesignerAssetGrantedByCategory(): void
    {
        $user = (new User())->setRoles(['ROLE_USER']);
        $category = new Categories();
        $category->addDesignerAccessUser($user);

        $asset = (new Assets())->setStatus(AssetStatusEnum::DESIGNER);
        $asset->addCategory($category);

        $this->assertSame(VoterInterface::ACCESS_GRANTED, $this->vote($user, $asset));
    }

    public function testRegularUserCanViewDesignerAssetGrantedByParentBrand(): void
    {
        $user = (new User())->setRoles(['ROLE_USER']);
        $parentBrand = new Brands();
        $childBrand = (new Brands())->setBrands($parentBrand);
        $parentBrand->addDesignerAccessUser($user);

        $asset = (new Assets())->setStatus(AssetStatusEnum::DESIGNER);
        $asset->addBrand($childBrand);

        $this->assertSame(VoterInterface::ACCESS_GRANTED, $this->vote($user, $asset));
    }

    public function testDesignerGrantDoesNotExposeNormalAssetOutsideRegularBrandAccess(): void
    {
        $user = (new User())->setRoles(['ROLE_USER']);
        $category = new Categories();
        $category->addDesignerAccessUser($user);

        $asset = (new Assets())->setStatus(AssetStatusEnum::ACTIVE);
        $asset->addCategory($category);

        $this->assertSame(VoterInterface::ACCESS_DENIED, $this->vote($user, $asset));
    }

    public function testUnrelatedRegularUserCannotViewDesignerAsset(): void
    {
        $user = (new User())->setRoles(['ROLE_USER']);
        $asset = (new Assets())->setStatus(AssetStatusEnum::DESIGNER);
        $asset->addCategory(new Categories());

        $this->assertSame(VoterInterface::ACCESS_DENIED, $this->vote($user, $asset));
    }

    private function vote(User $user, Assets $asset): int
    {
        $mockSecurity = $this->createMock(Security::class);
        $mockSecurity->method('isGranted')->willReturnCallback(
            fn (string $attribute) => in_array($attribute, $user->getRoles(), true)
        );

        $voter = new AssetVoter($mockSecurity, new DesignerAssetAccessChecker());
        $token = new UsernamePasswordToken($user, 'main', $user->getRoles());

        return $voter->vote($token, $asset, [AssetVoter::VIEW]);
    }
}
