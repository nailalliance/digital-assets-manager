<?php

namespace App\Tests\Entity;

use App\Entity\Assets\Assets;
use App\Entity\Assets\Brands;
use App\Entity\Assets\Categories;
use PHPUnit\Framework\TestCase;

class AssetsSearchAccessIdsTest extends TestCase
{
    public function testSearchAccessIdsIncludeDirectTaxonomiesAndAllAncestors(): void
    {
        $rootBrand = $this->brandWithId(3);
        $childBrand = $this->brandWithId(4)->setBrands($rootBrand);
        $leafBrand = $this->brandWithId(5)->setBrands($childBrand);

        $rootCategory = $this->categoryWithId(8);
        $leafCategory = $this->categoryWithId(9)->setCategories($rootCategory);

        $asset = (new Assets())
            ->addBrand($leafBrand)
            ->addCategory($leafCategory);

        self::assertSame([5, 4, 3], $asset->getBrandAccessIds());
        self::assertSame([9, 8], $asset->getCategoryAccessIds());
    }

    private function brandWithId(int $id): Brands
    {
        $brand = new Brands();
        (new \ReflectionProperty($brand, 'id'))->setValue($brand, $id);

        return $brand;
    }

    private function categoryWithId(int $id): Categories
    {
        $category = new Categories();
        (new \ReflectionProperty($category, 'id'))->setValue($category, $id);

        return $category;
    }
}
