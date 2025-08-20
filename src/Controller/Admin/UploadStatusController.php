<?php

namespace App\Controller\Admin;

use App\Repository\Assets\AssetsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

final class UploadStatusController extends AbstractController
{
    #[Route('/admin/upload/status/{uploadKey}', name: 'app_upload_status_check')]
    public function index(
        string $uploadKey,
        AssetsRepository $assetsRepository,
        UrlGeneratorInterface $urlGenerator,
    ): JsonResponse
    {
        $asset = $assetsRepository->findOneBy(['tusUploadKey' => $uploadKey]);

        if (!empty($asset)) {
            return $this->json([
                'status' => 'complete',
                'assetId' => $asset->getId(),
                'editUrl' => $urlGenerator->generate('admin_asset_edit', ['id' => $asset->getId()])
            ]);
        }

        return $this->json([
            'status' => 'processing',
        ], 202);
    }
}
