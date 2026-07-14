<?php

namespace App\Service;

use App\Entity\Assets\Assets;
use App\Security\Voter\AssetVoter;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Bundle\SecurityBundle\Security;

class DownloadListService
{
    public function __construct(
        private readonly RequestStack $requestStack,
        private readonly EntityManagerInterface $entityManager,
        private readonly Security $security,
    ) {
        // The session is no longer fetched in the constructor
    }

    /**
     * Adds an asset to the download list in the session.
     */
    public function add(int $assetId): bool
    {
        $asset = $this->entityManager->getRepository(Assets::class)->find($assetId);

        if (!$asset instanceof Assets || !$this->security->isGranted(AssetVoter::VIEW, $asset)) {
            return false;
        }

        $session = $this->requestStack->getSession();
        $downloadList = $session->get('download_list', []);

        if (!isset($downloadList[$assetId])) {
            $downloadList[$assetId] = true;
        }

        $session->set('download_list', $downloadList);

        return true;
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
        return $this->getAccessibleAssets();
    }

    /**
     * Gets the count of items in the list.
     */
    public function getCount(): int
    {
        return count($this->getAccessibleAssets());
    }

    /**
     * @return Assets[]
     */
    private function getAccessibleAssets(): array
    {
        $session = $this->requestStack->getSession();
        $downloadList = $session->get('download_list', []);
        $assetIds = array_keys($downloadList);

        if (empty($assetIds)) {
            return [];
        }

        $assets = $this->entityManager->getRepository(Assets::class)->findBy(['id' => $assetIds]);
        $accessibleAssets = [];
        $accessibleAssetIds = [];

        foreach ($assets as $asset) {
            if (!$this->security->isGranted(AssetVoter::VIEW, $asset)) {
                continue;
            }

            $accessibleAssets[] = $asset;
            $accessibleAssetIds[$asset->getId()] = true;
        }

        if ($accessibleAssetIds !== $downloadList) {
            $session->set('download_list', $accessibleAssetIds);
        }

        return $accessibleAssets;
    }
}
