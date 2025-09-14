<?php

namespace App\Service;

use App\Entity\Assets\Assets;
use App\Entity\Assets\AssetStatusEnum;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Meilisearch\Bundle\SearchService as MiliSearchService;
use Symfony\Bundle\SecurityBundle\Security;

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
     * @return array{ids: int[], hits:Assets[], total: int}
     */
    public function search(string $query, int $limit, int $offset): array
    {
        if (empty($query)) {
            return ['ids' => [], 'hits' => [], 'total' => 0];
        }

        $filters = [
            'status=' . AssetStatusEnum::ACTIVE->value,
        ];

        $searchParams = [
            'limit' => $limit,
            'offset' => $offset,
        ];

        /** @var User $user */
        $user = $this->security->getUser();

        if ($user && !$this->security->isGranted('ROLE_FTP_DESIGNER'))
        {
            $allowedBrandIds = $user->getRestrictedBrands()->map(fn ($brand) => $brand->getId())->toArray();

            $filters[] = 'embargodate >= ' . time();

            if (empty($allowedBrandIds)) {
                $filters[] = 'parent_brand_ids = 0';
            } else {
                $filters[] = 'parent_brand_ids IN [' . implode(',', $allowedBrandIds) . ']';
            }
        }

        // Brands
        $filters[] = "brandForSearch.status = true";

        // Categories
        $filters[] = "categoriesForSearch.status = true";

        // Collections
        $filters[] = "collectionsForSearch.status = true";

        $searchParams['filter'] = join(' AND ' , $filters);

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
}
