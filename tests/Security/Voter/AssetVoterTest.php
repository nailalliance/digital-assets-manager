<?php

namespace App\Tests\Security\Voter;

use App\Entity\Assets\Assets;
use App\Entity\Assets\Brands;
use App\Entity\User;
use App\Security\Voter\AssetVoter;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\Authorization\Voter\VoterInterface;

class AssetVoterTest extends TestCase
{
    #[DataProvider('provideVoteCases')]
    public function testVote(array $userRoles, array $userRestrictedBrandIds, int $assetParentBrandId, int $expectedVote): void
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
        $asset->addBrand($childBrand);

        // Step 3: Set up the mocks and run the test
        $mockSecurity = $this->createMock(Security::class);
        $mockSecurity->method('isGranted')->willReturnCallback(fn(string $attribute) => in_array($attribute, $userRoles));

        $voter = new AssetVoter($mockSecurity);
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
            VoterInterface::ACCESS_GRANTED
        ];

        yield 'Restricted user can view allowed asset' => [
            ['ROLE_BOARD_USER'],
            [3], // User has access to brand 3
            3,   // Asset is from brand 3
            VoterInterface::ACCESS_GRANTED
        ];

        yield 'Restricted user cannot view disallowed asset' => [
            ['ROLE_BOARD_USER'],
            [3], // User has access to brand 3
            4,   // Asset is from brand 4
            VoterInterface::ACCESS_DENIED
        ];

        yield 'User with no brands cannot view any asset' => [
            ['ROLE_BOARD_USER'],
            [], // User has no brand access
            5,  // Asset is from any brand
            VoterInterface::ACCESS_DENIED
        ];
    }
}
