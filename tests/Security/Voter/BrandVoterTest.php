<?php

namespace App\Tests\Security\Voter;

use App\Entity\Assets\Brands;
use App\Entity\User;
use App\Security\Voter\BrandVoter;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\Authorization\Voter\VoterInterface;

class BrandVoterTest extends TestCase
{
    #[DataProvider('provideVoteCases')]
    public function testVote(array $userRoles, array $userRestrictedBrandIds, int $targetBrandId, int $expectedVote): void
    {
        // Step 1: Create the User and assign their brands
        $user = new User();
        $user->setRoles($userRoles);
        foreach ($userRestrictedBrandIds as $brandId) {
            $restrictedBrand = $this->createMock(Brands::class);
            $restrictedBrand->method('getId')->willReturn($brandId);
            $user->addRestrictedBrand($restrictedBrand);
        }

        // Step 2: Create the target Brand to vote on
        $targetBrand = $this->createMock(Brands::class);
        $targetBrand->method('getId')->willReturn($targetBrandId);
        $targetBrand->method('getBrands')->willReturn(null); // It's a parent brand

        // Step 3: Set up the mocks and run the test
        $mockSecurity = $this->createMock(Security::class);
        $mockSecurity->method('isGranted')->willReturnCallback(fn(string $attribute) => in_array($attribute, $userRoles));

        $voter = new BrandVoter($mockSecurity);
        $token = new UsernamePasswordToken($user, 'main', $user->getRoles());

        $this->assertSame($expectedVote, $voter->vote($token, $targetBrand, [BrandVoter::VIEW]));
    }

    public static function provideVoteCases(): \Generator
    {
        // Data format: [userRoles, userRestrictedBrandIds, targetBrandId, expectedVote]
        yield 'Designer can view any brand' => [
            ['ROLE_FTP_DESIGNER'],
            [], // No restrictions
            4,  // Target brand doesn't matter
            VoterInterface::ACCESS_GRANTED
        ];

        yield 'Restricted user can view allowed brand' => [
            ['ROLE_BOARD_USER'],
            [3], // User has access to brand 3
            3,   // Target brand is brand 3
            VoterInterface::ACCESS_GRANTED
        ];

        yield 'Restricted user cannot view disallowed brand' => [
            ['ROLE_BOARD_USER'],
            [3], // User has access to brand 3
            4,   // Target brand is brand 4
            VoterInterface::ACCESS_DENIED
        ];
    }
}
