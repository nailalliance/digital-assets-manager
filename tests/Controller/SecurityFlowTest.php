<?php

namespace App\Tests\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class SecurityFlowTest extends WebTestCase
{
    private function getRestrictedUser(): User
    {
        // The container is available after the client has been created.
        $userRepository = static::getContainer()->get(UserRepository::class);
        $user = $userRepository->findOneBy(['username' => 'fabian+test']);

        $this->assertNotNull($user, 'Test user "restricted_user@example.com" not found in the test database. Did you load your fixtures?');

        return $user;
    }

    public function testRestrictedUserCannotAccessDisallowedAssetPage(): void
    {
        $client = static::createClient(); // This boots the kernel correctly.
        $user = $this->getRestrictedUser();
        $client->loginUser($user);

        // This asset ID should belong to a brand the user CANNOT access (e.g., Brand ID 4)
        $client->request('GET', '/asset/456');

        $this->assertResponseStatusCodeSame(403); // Expect "Forbidden"
    }

    public function testRestrictedUserCanAccessAllowedAssetPage(): void
    {
        $client = static::createClient();
        $user = $this->getRestrictedUser();
        $client->loginUser($user);

        // This asset ID should belong to a brand the user CAN access (e.g., Brand ID 3)
        $client->request('GET', '/asset/123');

        $this->assertResponseIsSuccessful();
    }

    // public function testSearchRespectsBrandRestrictions(): void
    // {
    //     $client = static::createClient();
    //     $user = $this->getRestrictedUser();
    //     $client->loginUser($user);
    //
    //     // Use a search term that you know exists in assets from allowed and disallowed brands
    //     $crawler = $client->request('GET', '/search?q=bottle');
    //
    //     $this->assertResponseIsSuccessful();
    //
    //     // This assertion depends on your template structure.
    //     // It checks that no assets from a disallowed brand page (e.g., Brand 4) appear.
    //     $this->assertSelectorNotExists('a[href="/brand/4"]');
    //     $this->assertSelectorExists('a[href="/brand/2"]');
    // }
    //
    // public function testDownloadListRespectsBrandRestrictions(): void
    // {
    //     $client = static::createClient();
    //     $user = $this->getRestrictedUser();
    //     $client->loginUser($user);
    //
    //     // Before running this test, ensure the user has lists set up in your fixtures:
    //     // - "Allowed List": Contains only assets from Brand 3
    //     // - "Forbidden List": Contains an asset from Brand 4
    //     $crawler = $client->request('GET', '/download/lists');
    //
    //     $this->assertResponseIsSuccessful();
    //     $this->assertSelectorTextContains('body', 'Allowed List');
    //     $this->assertSelectorTextNotContains('body', 'Forbidden List');
    // }
}
