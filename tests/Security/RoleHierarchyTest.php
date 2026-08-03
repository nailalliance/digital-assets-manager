<?php

namespace App\Tests\Security;

use PHPUnit\Framework\TestCase;
use Symfony\Component\Security\Core\Role\RoleHierarchy;
use Symfony\Component\Yaml\Yaml;

final class RoleHierarchyTest extends TestCase
{
    public function testSuperAdministratorInheritsDamAdministratorAccess(): void
    {
        $configuration = Yaml::parseFile(
            dirname(__DIR__, 2) . '/config/packages/security.yaml'
        );
        $hierarchy = new RoleHierarchy(
            $configuration['security']['role_hierarchy']
        );

        $roles = $hierarchy->getReachableRoleNames(['ROLE_SUPER_ADMIN']);

        self::assertContains('ROLE_ADMIN', $roles);
        self::assertContains('ROLE_FTP_ADMIN', $roles);
        self::assertContains('ROLE_FTP_DESIGNER', $roles);
        self::assertContains('ROLE_FTP_CONTRIBUTOR', $roles);
        self::assertContains('ROLE_USER', $roles);
    }
}
