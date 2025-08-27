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
     * Performs a search against the Meilisearch index and returns hydrated Doctrine entities.
     *
     * @param string $query The user's search term.
     * @return array{hits: Assets[], total: int} An array of Asset entities.
     */
    public function search(string $query, int $limit, int $offset): array
    {
        if (empty($query)) {
            return ['hits' => [], 'total' => 0];
        }

        // Pass the EntityManager as the first argument.
        $assets = $this->meilisearch->search(
            $this->entityManager,
            Assets::class,
            $query,
            [
                'limit' => $limit,
                'offset' => $offset,
            ]
        );

        // $assetIds = array_map(fn($hit) => $hit['id'], $searchResults['hits']);
        // $assetIds = [];
        // foreach($searchResults as $result) {
        //     $assetIds[] = $result->getId();
        // }

        if (empty($assets)) {
            return ['hits' => [], 'total' => 0];
        }

        // $assets = $this->assetsRepository->findBy(['id' => $assetIds]);

        // $orderedAssets = array_replace(array_flip($assetIds), $assets);

        return [
            'hits' => array_values($assets),
            'total' => count($assets),
        ];
    }
}
