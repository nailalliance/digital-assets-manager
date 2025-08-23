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
     * @return Assets[] An array of Asset entities.
     */
    public function search(string $query): array
    {
        if (empty($query)) {
            return [];
        }

        // Pass the EntityManager as the first argument.
        $searchResults = $this->meilisearch->search(
            $this->entityManager,
            Assets::class,
            $query
        );

        // $assetIds = array_map(fn($hit) => $hit['id'], $searchResults);
        $assetIds = [];
        foreach($searchResults as $result) {
            $assetIds[] = $result->getId();
        }

        if (empty($assetIds)) {
            return [];
        }

        return $this->assetsRepository->findBy(['id' => $assetIds]);
    }
}
