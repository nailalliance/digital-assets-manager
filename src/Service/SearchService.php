<?php

namespace App\Service;

use App\Entity\Assets\Assets;
use App\Repository\Assets\AssetsRepository;
use Doctrine\ORM\EntityManagerInterface;
use Meilisearch\Bundle\SearchService as MiliSearchService;
use Symfony\Bundle\SecurityBundle\Security;

class SearchService
{
    public function __construct(
        private readonly MiliSearchService $meilisearch,
        private readonly AssetsRepository $assetsRepository,
        private readonly EntityManagerInterface $entityManager
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

        // 1. Get the raw search results from Meilisearch
        $searchResults = $this->meilisearch->search(
            $this->entityManager,
            Assets::class,
            $query,
            [
                'limit' => $limit,
                'offset' => $offset,
            ]
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
