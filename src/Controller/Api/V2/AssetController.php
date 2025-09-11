<?php

namespace App\Controller\Api\V2;

use App\Entity\Assets\Assets;
use App\Message\ProcessAssetUpload;
use App\Service\SearchService;
use App\Service\UniqueFilePathGenerator;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Uid\Uuid;

#[Route('/api/v2/assets')]
class AssetController extends AbstractController
{
    #[Route('', name: 'api_v2_assets_search', methods: ['GET'])]
    public function search(Request $request, SearchService $searchService): JsonResponse
    {
        $query = $request->query->get('q', '');
        $page = $request->query->get('page', 1);
        $limit = $request->query->get('limit', 20);

        $filters = [
            'brand_ids' => $request->query->has('brands') ? explode(',', $request->query->get('brands')) : [],
            'category_ids' => $request->query->has('categories') ? explode(',', $request->query->get('categories')) : [],
            'collection_ids' => $request->query->has('collections') ? explode(',', $request->query->get('collections')) : [],
        ];

        $results = $searchService->search($query, $page, $limit, $filters);

        $data = [
            'items' => [],
            'totalItems' => $results['total'],
            'currentPage' => $page,
            'totalPages' => ceil($results['total'] / $limit),
            'limit' => $limit,
        ];

        /** @var Assets $asset */
        foreach ($results['hits'] as $asset) {
            $data['items'][] = [
                'id' => $asset->getId(),
                'name' => $asset->getName(),
                'mime_type' => $asset->getMimeType(),
                'thumbnail_url' => $asset->getThumbnailPath() ? $this->generateUrl('asset_thumbnail', ['filename' => basename($asset->getThumbnailPath())], UrlGeneratorInterface::ABSOLUTE_URL) : null,
            ];
        }

        return $this->json($data);
    }

    public function upload(
        Request $request,
        MessageBusInterface $bus,
        EntityManagerInterface $entityManager
    ): JsonResponse
    {
        $uploadedFile = $request->files->get('file');
        $name = $request->request->get('name');

        if (!$uploadedFile) {
            return $this->json(['error' => 'No file uploaded'], JsonResponse::HTTP_BAD_REQUEST);
        }

        if (empty($name)) {
            $name = pathinfo($uploadedFile->getClientOriginalName(), PATHINFO_FILENAME);
        }


        $filename = $uploadedFile->getClientOriginalName() . "." . $uploadedFile->getClientOriginalExtension();
        $filePath = UniqueFilePathGenerator::get($this->getParameter('upload_dir'), $filename);
        $uploadedFile->move(dirname($filePath), basename($filePath));
        $fileSize = filesize($filePath);
        $mimeType = $uploadedFile->getClientMimeType();

        $fileMetadata = [
            'metadata' => [
                'filename' => $filename,
                'filetype' => $mimeType,
            ],
            'file_path' => $filePath,
            'size' => $fileSize,
        ];

        $assetKey = Uuid::v4();

        $asset = new Assets();
        $asset->setName($name);
        $asset->setFilePath('');
        $asset->setMimeType('');
        $asset->setUploader($this->getUser());
        $asset->setTusUploadKey($assetKey);

        $entityManager->persist($asset);
        $entityManager->flush();

        $bus->dispatch(new ProcessAssetUpload(
            fileMetaData: $fileMetadata,
            uploadKey: $assetKey,
            userId: $this->getUser()->getId(),
            cacheItemKeyName: '',
            assetId: $asset->getId()
        ));

        return $this->json([
            'message' => 'File uploaded and is being processed.',
            'asset_id' => $asset->getId(),
        ], JsonResponse::HTTP_ACCEPTED);
    }
}
