<?php

namespace App\Service;

use App\Entity\Assets\Assets;
use App\Entity\Assets\Brands;
use App\Entity\Assets\Categories;
use App\Entity\User;

final class DesignerAssetAccessChecker
{
    public function isGranted(User $user, Assets $asset): bool
    {
        foreach ($asset->getBrand() as $brand) {
            if ($this->userHasBrandGrant($user, $brand)) {
                return true;
            }
        }

        foreach ($asset->getCategories() as $category) {
            if ($this->userHasCategoryGrant($user, $category)) {
                return true;
            }
        }

        return false;
    }

    private function userHasBrandGrant(User $user, Brands $brand): bool
    {
        $visited = [];
        $current = $brand;

        while ($current !== null) {
            $objectId = spl_object_id($current);
            if (isset($visited[$objectId])) {
                return false;
            }

            $visited[$objectId] = true;
            if ($user->getDesignerAccessBrands()->contains($current)) {
                return true;
            }

            $current = $current->getBrands();
        }

        return false;
    }

    private function userHasCategoryGrant(User $user, Categories $category): bool
    {
        $visited = [];
        $current = $category;

        while ($current !== null) {
            $objectId = spl_object_id($current);
            if (isset($visited[$objectId])) {
                return false;
            }

            $visited[$objectId] = true;
            if ($user->getDesignerAccessCategories()->contains($current)) {
                return true;
            }

            $current = $current->getCategories();
        }

        return false;
    }
}
