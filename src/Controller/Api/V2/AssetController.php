<?php

namespace App\Controller\Api\V2;

use App\Entity\Assets\Assets;
use App\Entity\Downloads\Lists;
use App\Entity\Downloads\OneTimeLinks;
use App\Message\ProcessAssetUpload;
use App\Repository\Assets\AssetsRepository;
use App\Repository\Downloads\ListsRepository;
use App\Service\SearchService;
use App\Service\UniqueFilePathGenerator;
use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Uid\Uuid;
use function json_encode;
use function var_dump;

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

    #[Route('/public-urls', name: 'api_v2_assets_public_urls', methods: ['POST'])]
    public function generatePublicUrls(
        Request $request,
        AssetsRepository $assetsRepository,
        ListsRepository $listsRepository,
        EntityManagerInterface $entityManager
    ): JsonResponse
    {
        $user = $this->getUser();

        if (!$user) {
            return $this->json(['error' => 'Authentication required'], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $payload = $request->toArray();
        $assetIds = $payload['asset_ids'] ?? [];
        $width = intval($payload['width'] ?? 1000);
        $height = intval($payload['height'] ?? 1000);
        $padding = intval($payload['padding'] ?? 0);
        $format = $payload['format'] ?? 'jpg';

        if (empty($assetIds) || !is_array($assetIds)) {
            return $this->json(['error' => 'Invalid asset IDs'], JsonResponse::HTTP_BAD_REQUEST);
        }

        if (!in_array($format, ['jpg', 'png', 'webp'])) {
            return $this->json(['error' => 'Invalid format. Must be jpg, png, or webp'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $monthStr = (new DateTimeImmutable())->format('Y-m');
        $listName = "API_MONTHLY_SHARE_{$monthStr}";

        $downloadList = $listsRepository->findOneBy(['name' => $listName]);
        $oneTimeLink = null;

        if (!$downloadList) {
            $downloadList = new Lists();
            $downloadList->setName($listName)->setCreator($user);

            $oneTimeLink = new OneTimeLinks();
            $oneTimeLink->setToken(Uuid::v4()->toBase32());
            $oneTimeLink->setDownloadList($downloadList);
            $oneTimeLink->setExpirationDate(new \DateTimeImmutable('2100-01-01', new \DateTimeZone('UTC')));

            $entityManager->persist($downloadList);
            $entityManager->persist($oneTimeLink);
        } else {
            $oneTimeLink = $downloadList->getOneTimeLinks()->first();
        }

        $assets = $assetsRepository->findBy(['id' => $assetIds]);
        $urls = [];

        foreach ($assets as $asset) {
            if (!$downloadList->getAssets()->contains($asset)) {
                $downloadList->addAsset($asset);
            }

            $itemCodes = $asset->getItemCodes()->map(fn($itemCode) => $itemCode->getCode())->toArray();
            $filenameBase = !empty($itemCodes) ? implode('_', $itemCodes) . '_' . $asset->getName() : $asset->getName();
            $safeFilename = preg_replace('/[^a-zA-Z0-9_\-]/', '_', $filenameBase);

            $urls[$asset->getId()] = $this->generateUrl('public_image_padded', [
                'token' => $oneTimeLink->getToken(),
                'assetId' => $asset->getId(),
                'width' => $width,
                'height' => $height,
                'padding' => $padding,
                'filename' => $safeFilename,
                'extension' => $format,
            ], UrlGeneratorInterface::ABSOLUTE_URL);
        }

        $entityManager->flush();

        return $this->json(['urls' => $urls]);
    }
}
