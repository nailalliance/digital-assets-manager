<?php
/**
 * Copyright (c) 2025 Nail Alliance.
 * @Author: Fabian Nino
 * Date: 9/4/2025
 */

namespace App\Service;

use Symfony\Component\Security\Core\Role\RoleHierarchyInterface;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * A dedicated service to check roles for any given user entity,
 * correctly respecting the role hierarchy.
 */
class UserRoleChecker
{
    private RoleHierarchyInterface $roleHierarchy;

    /**
     * The service constructor.
     * Symfony's service container will automatically inject the RoleHierarchy service.
     *
     * @param RoleHierarchyInterface $roleHierarchy
     */
    public function __construct(RoleHierarchyInterface $roleHierarchy)
    {
        $this->roleHierarchy = $roleHierarchy;
    }

    /**
     * Checks if a user has a specific role, including roles
     * inherited from the role hierarchy.
     *
     * @param UserInterface $user The user entity to check.
     * @param string $role The role to check for (e.g., 'ROLE_EDITOR').
     * @return bool True if the user has the role, false otherwise.
     */
    public function hasRole(UserInterface &$user, string $role): bool
    {
        // 1. Get the user's direct roles from the entity.
        $userRoles = $user->getRoles();

        // 2. Use the RoleHierarchy service to get the full list of all roles,
        //    including all parent roles from the hierarchy.
        $reachableRoles = $this->roleHierarchy->getReachableRoleNames($userRoles);

        // 3. Check if the target role exists in the flattened list of reachable roles.
        return in_array($role, $reachableRoles, true);
    }
}
