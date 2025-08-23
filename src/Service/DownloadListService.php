<?php

namespace App\Service;

use App\Entity\Assets\Assets;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\RequestStack;

class DownloadListService
{
    public function __construct(
        private readonly RequestStack $requestStack,
        private readonly EntityManagerInterface $entityManager
    ) {
        // The session is no longer fetched in the constructor
    }

    /**
     * Adds an asset to the download list in the session.
     */
    public function add(int $assetId): void
    {
        $session = $this->requestStack->getSession();
        $downloadList = $session->get('download_list', []);

        if (!isset($downloadList[$assetId])) {
            $downloadList[$assetId] = true;
        }

        $session->set('download_list', $downloadList);
    }

    /**
     * Removes an asset from the download list.
     */
    public function remove(int $assetId): void
    {
        $session = $this->requestStack->getSession();
        $downloadList = $session->get('download_list', []);
        unset($downloadList[$assetId]);
        $session->set('download_list', $downloadList);
    }

    /**
     * Clears all items from the download list.
     */
    public function clear(): void
    {
        $this->requestStack->getSession()->remove('download_list');
    }

    /**
     * Gets the full Asset entities for all items in the list.
     *
     * @return Assets[]
     */
    public function getAssets(): array
    {
        $session = $this->requestStack->getSession();
        $downloadList = $session->get('download_list', []);
        $assetIds = array_keys($downloadList);

        if (empty($assetIds)) {
            return [];
        }

        return $this->entityManager->getRepository(Assets::class)->findBy(['id' => $assetIds]);
    }

    /**
     * Gets the count of items in the list.
     */
    public function getCount(): int
    {
        return count($this->requestStack->getSession()->get('download_list', []));
    }
}
