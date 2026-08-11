<?php

namespace App\Service;

use App\Entity\Assets\Assets;
use App\Entity\Assets\AssetStatusEnum;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Meilisearch\Bundle\SearchService as MiliSearchService;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpKernel\Log\Logger;

class SearchService
{
    public function __construct(
        private readonly MiliSearchService $meilisearch,
        private readonly EntityManagerInterface $entityManager,
        private readonly Security $security
    ) {
    }

    /**
     * Performs a search against Meilisearch and returns the raw results.
     *
     * @param string $query The user's search term.
     * @param int $limit
     * @param int $offset
     * @param AssetStatusEnum[] $status
     * @return array{ids: int[], hits:Assets[], total: int}
     */
    public function search(
        string $query,
        int $limit,
        int $offset,
        ?array $brandIds = null,
        ?array $categoryIds = null,
        ?array $collectionIds = null,
        ?array $mimeTypes = null,
        ?array $status = [],
    ): array
    {
        if (empty($query)) {
            return ['ids' => [], 'hits' => [], 'total' => 0];
        }

        $filters = [];

        $searchParams = [
            'limit' => $limit,
            'offset' => $offset,
        ];

        /** @var User $user */
        $user = $this->security->getUser();

        if ($user && !$this->security->isGranted('ROLE_FTP_DESIGNER')) {
            $visibility = [];
            $regularBrandIds = $user->getRestrictedBrands()->map(fn ($brand) => $brand->getId())->toArray();
            $designerBrandIds = $user->getDesignerAccessBrands()->map(fn ($brand) => $brand->getId())->toArray();
            $designerCategoryIds = $user->getDesignerAccessCategories()->map(fn ($category) => $category->getId())->toArray();

            if ($regularBrandIds !== []) {
                $visibility[] = sprintf(
                    '(status=%s AND %s)',
                    AssetStatusEnum::ACTIVE->value,
                    $this->brandAccessFilter($regularBrandIds)
                );
            }

            $designerTaxonomies = [];
            if ($designerBrandIds !== []) {
                $designerTaxonomies[] = $this->brandAccessFilter($designerBrandIds);
            }
            if ($designerCategoryIds !== []) {
                $designerTaxonomies[] = $this->categoryAccessFilter($designerCategoryIds);
            }
            if ($designerTaxonomies !== []) {
                $visibility[] = sprintf(
                    '(status=%s AND (%s))',
                    AssetStatusEnum::DESIGNER->value,
                    implode(' OR ', $designerTaxonomies)
                );
            }

            $filters[] = $visibility === []
                ? '(status=active AND brand_access_ids = 0)'
                : '(' . implode(' OR ', $visibility) . ')';
        } else {
            $statuses = [AssetStatusEnum::ACTIVE->value];

            if ($this->security->isGranted('ROLE_FTP_DESIGNER')) {
                $statuses[] = AssetStatusEnum::DESIGNER->value;
            }

            foreach ($status ?? [] as $requestedStatus) {
                $statuses[] = $requestedStatus->value;
            }

            $statuses = array_unique($statuses);
            $filters[] = '(' . implode(' OR ', array_map(
                fn (string $visibleStatus) => 'status=' . $visibleStatus,
                $statuses
            )) . ')';
        }

        // Brands
        $filters[] = "brandForSearch.status = true";

        // Categories
        $filters[] = "categoriesForSearch.status = true";

        // Collections
        // $filters[] = "collectionsForSearch.status = true";

        if (!empty($brandIds)) {
            $filters[] = "brandForSearch.id IN [" . implode(',', $brandIds) . ']';
        }

        if (!empty($categoryIds)) {
            $filters[] = "categoriesForSearch.id IN [" . implode(',', $categoryIds) . ']';
        }

        if (!empty($collectionIds)) {
            $filters[] = "collectionsForSearch.id IN [" . implode(',', $collectionIds) . ']';
        }

        if (!empty($mimeTypes)) {
            $filters[] = 'mimeType IN ["' . implode('","', $mimeTypes) . '"]';
        }

        $searchParams['filter'] = join(' AND ' , $filters);

        (new Logger())->info("filterValues: ".  print_r($searchParams, true));

        // 1. Get the raw search results from Meilisearch
        $searchResults = $this->meilisearch->search(
            $this->entityManager,
            Assets::class,
            $query,
            $searchParams
        );

        // 2. Extract only the IDs from the results
        $assetIds = array_map(fn($hit) => $hit->getId(), $searchResults ?? []);

        return [
            'ids' => $assetIds,
            'hits' => $searchResults ?? [],
            'total' => count($searchResults) ?? 0,
        ];
    }

    /**
     * Match the complete access field and the legacy fields retained on documents
     * that were indexed before brand_access_ids was introduced.
     *
     * The direct and immediate-parent checks are strictly narrower fallbacks. A
     * complete index rebuild remains necessary for deeper brand hierarchies.
     *
     * @param int[] $brandIds
     */
    private function brandAccessFilter(array $brandIds): string
    {
        $ids = implode(',', $brandIds);

        return sprintf(
            '(brand_access_ids IN [%1$s] OR parent_brand_ids IN [%1$s] OR brandForSearch.id IN [%1$s])',
            $ids
        );
    }

    /**
     * Match direct categories while legacy documents are being rebuilt with the
     * complete category ancestry field.
     *
     * @param int[] $categoryIds
     */
    private function categoryAccessFilter(array $categoryIds): string
    {
        $ids = implode(',', $categoryIds);

        return sprintf(
            '(category_access_ids IN [%1$s] OR categoriesForSearch.id IN [%1$s])',
            $ids
        );
    }
}
