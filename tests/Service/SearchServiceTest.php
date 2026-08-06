<?php

namespace App\Tests\Service;

use App\Entity\Assets\Brands;
use App\Entity\Assets\Categories;
use App\Entity\User;
use App\Service\SearchService;
use Doctrine\ORM\EntityManagerInterface;
use Meilisearch\Bundle\SearchService as MeilisearchSearchService;
use PHPUnit\Framework\TestCase;
use Symfony\Bundle\SecurityBundle\Security;

class SearchServiceTest extends TestCase
{
    public function testRegularUserSearchCombinesNormalAndDesignerTaxonomyAccess(): void
    {
        $regularBrand = $this->brandWithId(3);
        $designerBrand = $this->brandWithId(4);
        $designerCategory = $this->categoryWithId(8);

        $user = (new User())
            ->addRestrictedBrand($regularBrand)
            ->addDesignerAccessBrand($designerBrand)
            ->addDesignerAccessCategory($designerCategory);

        $meilisearch = $this->createMock(MeilisearchSearchService::class);
        $meilisearch->expects(self::once())
            ->method('search')
            ->with(
                self::anything(),
                self::anything(),
                'polish',
                self::callback(function (array $params): bool {
                    $filter = $params['filter'];

                    self::assertStringContainsString('status=active AND brand_access_ids IN [3]', $filter);
                    self::assertStringContainsString('status=designer', $filter);
                    self::assertStringContainsString('brand_access_ids IN [4]', $filter);
                    self::assertStringContainsString('category_access_ids IN [8]', $filter);

                    return true;
                })
            )
            ->willReturn([]);

        $security = $this->createMock(Security::class);
        $security->method('getUser')->willReturn($user);
        $security->method('isGranted')->willReturn(false);

        $service = new SearchService(
            $meilisearch,
            $this->createMock(EntityManagerInterface::class),
            $security,
        );

        self::assertSame(
            ['ids' => [], 'hits' => [], 'total' => 0],
            $service->search('polish', 50, 0)
        );
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
