<?php

namespace App\Controller\Api;

use App\Entity\Assets\Assets;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

#[Route('/api/v1')]
class AssetController extends AbstractController
{
    public function getAsset(Assets $asset): JsonResponse
    {
        $data = [
            'id' => $asset->getId(),
            'name' => $asset->getName(),
            'description' => $asset->getDescription(),
            'mime_type' => $asset->getMimeType(),
            'file_size' => $asset->getFileSize(),
            'created_at' => $asset->getCreatedAt(),
            'download_url' => $this->generateUrl('asset_download', ['id' => $asset->getId()], UrlGeneratorInterface::ABSOLUTE_URL),
            'thumbnail_url' => $this->generateUrl('asset_thumbnail_by_id', ['id' => $asset->getId()], UrlGeneratorInterface::ABSOLUTE_URL),
        ];

        return $this->json($data);
    }
}
