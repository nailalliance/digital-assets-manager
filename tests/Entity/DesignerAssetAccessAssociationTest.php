<?php

namespace App\Tests\Entity;

use App\Entity\Assets\Brands;
use App\Entity\Assets\Categories;
use App\Entity\User;
use PHPUnit\Framework\TestCase;

class DesignerAssetAccessAssociationTest extends TestCase
{
    public function testBrandMaintainsBothSidesOfDesignerAccessGrant(): void
    {
        $brand = new Brands();
        $user = new User();

        $brand->addDesignerAccessUser($user);

        self::assertTrue($brand->getDesignerAccessUsers()->contains($user));
        self::assertTrue($user->getDesignerAccessBrands()->contains($brand));

        $brand->removeDesignerAccessUser($user);

        self::assertFalse($brand->getDesignerAccessUsers()->contains($user));
        self::assertFalse($user->getDesignerAccessBrands()->contains($brand));
    }

    public function testCategoryMaintainsBothSidesOfDesignerAccessGrant(): void
    {
        $category = new Categories();
        $user = new User();

        $category->addDesignerAccessUser($user);

        self::assertTrue($category->getDesignerAccessUsers()->contains($user));
        self::assertTrue($user->getDesignerAccessCategories()->contains($category));

        $category->removeDesignerAccessUser($user);

        self::assertFalse($category->getDesignerAccessUsers()->contains($user));
        self::assertFalse($user->getDesignerAccessCategories()->contains($category));
    }
}
