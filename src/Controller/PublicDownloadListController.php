<?php

namespace App\Controller;

use App\Entity\Assets\Assets;
use App\Entity\Downloads\Logs;
use App\Entity\Downloads\OneTimeLinks;
use App\Service\ImageProcessorService;
use App\Service\PermalinkImageCacheService;
use App\Service\ZipDownloadResponseFactory;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Doctrine\Attribute\MapEntity;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\Routing\Annotation\Route;
use function basename;
use function count;
use function is_array;
use function pathinfo;

class PublicDownloadListController extends AbstractController
{
    #[Route('/share/{token}', name: 'public_download_list')]
    public function index(
        #[MapEntity(mapping: ['token' => 'token'])]
        OneTimeLinks $oneTimeLink
    ): Response {
        $this->ensureOneTimeLinkIsAccessible($oneTimeLink);

        return $this->render('public_download_list/index.html.twig', [
            'oneTimeLink' => $oneTimeLink,
        ]);
    }

    #[Route('/share/{token}/zip', name: 'public_download_list_zip')]
    public function zip(
        #[MapEntity(mapping: ['token' => 'token'])]
        OneTimeLinks $oneTimeLink,
        EntityManagerInterface $entityManager,
        RequestStack $requestStack,
        ZipDownloadResponseFactory $zipDownloadResponseFactory
    ): Response {
        $this->ensureOneTimeLinkIsAccessible($oneTimeLink);

        $downloadList = $oneTimeLink->getDownloadList();
        $temporaryFiles = $oneTimeLink->getTemporaryFiles();
        $request = $requestStack->getCurrentRequest();

        // Determine the filename for the zip archive
        $zipFileName = 'shared_assets.zip';
        if ($downloadList && $downloadList->getName()) {
            $zipFileName = preg_replace('/[^a-zA-Z0-9\-\_]/', '', $downloadList->getName()) . '.zip';
        }

        if (!empty($temporaryFiles)) {
            if (count($temporaryFiles) === 1) {
                return $this->createTemporaryFileResponse($temporaryFiles[0]);
            }

            return $zipDownloadResponseFactory->create(
                'shared_files.zip',
                $this->buildTemporaryFileEntries($temporaryFiles)
            );
        }

        $downloadableAssets = [];
        $entries = [];

        if ($downloadList) {
            foreach ($downloadList->getAssets() as $asset) {
                $filePath = $asset->getFilePath();

                if (!is_readable($filePath)) {
                    continue;
                }

                $downloadableAssets[] = $asset;
                $entries[] = [
                    'archiveName' => basename($filePath),
                    'sourcePath' => $filePath,
                ];
            }
        }

        return $zipDownloadResponseFactory->create(
            $zipFileName,
            $entries,
            function () use ($downloadableAssets, $entityManager, $request, $oneTimeLink): void {
                $ipAddress = $request?->getClientIp() ?? 'unknown';

                foreach ($downloadableAssets as $asset) {
                    $log = new Logs();
                    $log->setAsset($asset);
                    $log->setIpAddress($ipAddress);
                    $log->setOneTimeLink($oneTimeLink);
                    $entityManager->persist($log);
                }

                $entityManager->flush();
            }
        );
    }

    #[Route('/share/{token}/file/{index}', name: 'public_download_list_file', requirements: ['index' => '\d+'])]
    public function temporaryFile(
        #[MapEntity(mapping: ['token' => 'token'])]
        OneTimeLinks $oneTimeLink,
        int $index
    ): BinaryFileResponse {
        $this->ensureOneTimeLinkIsAccessible($oneTimeLink);

        $temporaryFiles = $oneTimeLink->getTemporaryFiles() ?? [];
        $fileData = $temporaryFiles[$index] ?? null;

        if (!is_array($fileData)) {
            throw $this->createNotFoundException('Shared file not found.');
        }

        return $this->createTemporaryFileResponse($fileData);
    }

    /**
     * Securely serves a thumbnail for a public download list.
     */
    #[Route('/share/{token}/thumbnail/{asset_id}', name: 'public_asset_thumbnail')]
    public function publicThumbnail(
        #[MapEntity(mapping: ['token' => 'token'])]
        OneTimeLinks $oneTimeLink,
        #[MapEntity(id: 'asset_id')]
        Assets $asset
    ): BinaryFileResponse {
        // 1. Check if the main link has expired
        if ($oneTimeLink->getExpirationDate() < new \DateTimeImmutable('now', new \DateTimeZone('UTC'))) {
            throw $this->createNotFoundException('This link has expired.');
        }

        // 2. CRITICAL SECURITY CHECK: Ensure the requested asset is actually in this share list
        $downloadList = $oneTimeLink->getDownloadList();
        if (!$downloadList || !$downloadList->getAssets()->contains($asset)) {
            throw $this->createAccessDeniedException();
        }

        // 3. Check if the thumbnail file exists
        $thumbnailPath = $asset->getThumbnailPath();
        if (!$thumbnailPath || !file_exists($thumbnailPath)) {
            throw $this->createNotFoundException('Thumbnail not found.');
        }

        // 4. Securely serve the file
        return new BinaryFileResponse($thumbnailPath);
    }

    #[Route('/share/{token}/image/{assetId}/use-largest-clip-path/{width}x{height}/{padding}/{filename}.{extension}', name: 'public_image_largest_clip_path_padded', requirements: ['assetId' => '\d+', 'width' => '\d+', 'height' => '\d+', 'padding' => '\d+', 'extension' => 'jpg|png|webp'], defaults: ['useLargestClipPath' => true])]
    #[Route('/share/{token}/image/{assetId}/use-largest-clip-path/{width}x{height}/{filename}.{extension}', name: 'public_image_largest_clip_path', requirements: ['assetId' => '\d+', 'width' => '\d+', 'height' => '\d+', 'extension' => 'jpg|png|webp'], defaults: ['padding' => 0, 'useLargestClipPath' => true])]
    #[Route('/share/{token}/image/{assetId}/{width}x{height}/{padding}/{filename}.{extension}', name: 'public_image_padded', requirements: ['assetId' => '\d+', 'width' => '\d+', 'height' => '\d+', 'padding' => '\d+', 'extension' => 'jpg|png|webp'], defaults: ['useLargestClipPath' => false])]
    #[Route('/share/{token}/image/{assetId}/{width}x{height}/{filename}.{extension}', name: 'public_image', requirements: ['assetId' => '\d+', 'width' => '\d+', 'height' => '\d+', 'extension' => 'jpg|png|webp'], defaults: ['padding' => 0, 'useLargestClipPath' => false])]
    public function publicImage(
        #[MapEntity(mapping: ['token' => 'token'])]
        OneTimeLinks $oneTimeLink,
        #[MapEntity(id: 'assetId')]
        Assets $asset,
        PermalinkImageCacheService $permalinkImageCache,
        ImageProcessorService $imageProcessor,
        int $width,
        int $height,
        int $padding,
        bool $useLargestClipPath,
        string $filename,
        string $extension
    ): Response {
        if (!$this->isGranted('IS_AUTHENTICATED_FULLY')) {
            if ($oneTimeLink->getExpirationDate() < new \DateTimeImmutable('now', new \DateTimeZone('UTC'))) {
                throw $this->createNotFoundException('This link has expired.');
            }
        }

        // CRITICAL SECURITY CHECK: Ensure the asset from the URL is actually in this share list
        $downloadList = $oneTimeLink->getDownloadList();
        $temporaryFiles = $oneTimeLink->getTemporaryFiles();
        $isAuthorized = false;

        if ($downloadList && $downloadList->getAssets()->contains($asset)) {
            $isAuthorized = true;
        } elseif (!empty($temporaryFiles)) {
            // This check is more complex for temporary files as they aren't entities.
            // A more robust implementation might store asset IDs even for temp files.
            // For now, we'll assume the asset ID lookup is for permanent assets.
        }

        if (!$isAuthorized) {
            throw $this->createAccessDeniedException('This asset is not part of this share link.');
        }

        $sourcePath = $asset->getFilePath();

        if (!$sourcePath || !file_exists($sourcePath)) {
            throw $this->createNotFoundException('Source file not found.');
        }

        try {
            $cachedImagePath = $permalinkImageCache->getOrCreate($asset, $width, $height, $padding, $extension, $useLargestClipPath);
            $response = new BinaryFileResponse($cachedImagePath);
        } catch (\InvalidArgumentException) {
            throw $this->createNotFoundException('Could not process image.');
        } catch (\RuntimeException) {
            $imageBinary = $imageProcessor->exportFile($sourcePath, $width, $height, $padding, $extension, $useLargestClipPath);

            if ($imageBinary === null || $imageBinary === '') {
                throw $this->createNotFoundException('Could not process image.');
            }

            $response = new Response($imageBinary);
        }
        $disposition = $response->headers->makeDisposition(
            ResponseHeaderBag::DISPOSITION_INLINE,
            $filename . '.' . $extension
        );
        $response->headers->set('Content-Disposition', $disposition);
        $response->headers->set('Content-Type', $this->resolveImageContentType($extension));
        $response->headers->set('Cache-Control', 'private, no-store, max-age=0, must-revalidate');

        return $response;
    }

    private function resolveImageContentType(string $extension): string
    {
        return match ($extension) {
            'jpg' => 'image/jpeg',
            'png' => 'image/png',
            'webp' => 'image/webp',
            default => 'application/octet-stream',
        };
    }

    private function ensureOneTimeLinkIsAccessible(OneTimeLinks $oneTimeLink): void
    {
        if (!$this->isGranted('IS_AUTHENTICATED_FULLY')) {
            if ($oneTimeLink->getExpirationDate() < new \DateTimeImmutable('now', new \DateTimeZone('UTC'))) {
                throw $this->createNotFoundException('This link has expired.');
            }
        }

        if (!is_null($oneTimeLink->getDownloadList()) && !$oneTimeLink->getDownloadList()->getStatus()) {
            throw $this->createNotFoundException('This link has expired.');
        }
    }

    /**
     * @param array<string, mixed> $fileData
     */
    private function createTemporaryFileResponse(array $fileData): BinaryFileResponse
    {
        $filePath = $fileData['path'] ?? null;

        if (!is_string($filePath) || !is_readable($filePath)) {
            throw $this->createNotFoundException('Shared file not found.');
        }

        $downloadName = basename((string) ($fileData['originalName'] ?? $filePath));
        $response = new BinaryFileResponse($filePath);
        $response->setContentDisposition(ResponseHeaderBag::DISPOSITION_ATTACHMENT, $downloadName);

        if (isset($fileData['mimeType']) && is_string($fileData['mimeType']) && $fileData['mimeType'] !== '') {
            $response->headers->set('Content-Type', $fileData['mimeType']);
        }

        return $response;
    }

    /**
     * @param array<int, array<string, mixed>> $temporaryFiles
     * @return list<array{archiveName: string, sourcePath: string}>
     */
    private function buildTemporaryFileEntries(array $temporaryFiles): array
    {
        $entries = [];
        $usedNames = [];

        foreach ($temporaryFiles as $temporaryFile) {
            if (!is_array($temporaryFile)) {
                continue;
            }

            $filePath = $temporaryFile['path'] ?? null;
            if (!is_string($filePath) || !is_readable($filePath)) {
                throw $this->createNotFoundException('Shared file not found.');
            }

            $preferredName = basename((string) ($temporaryFile['originalName'] ?? $filePath));
            $entries[] = [
                'archiveName' => $this->createUniqueArchiveName($preferredName, $usedNames),
                'sourcePath' => $filePath,
            ];
        }

        return $entries;
    }

    /**
     * @param array<string, bool> $usedNames
     */
    private function createUniqueArchiveName(string $preferredName, array &$usedNames): string
    {
        $candidate = $preferredName !== '' ? $preferredName : 'shared-file';
        $extension = pathinfo($candidate, PATHINFO_EXTENSION);
        $filename = $extension !== '' ? substr($candidate, 0, -(strlen($extension) + 1)) : $candidate;
        $suffix = 2;

        while (isset($usedNames[$candidate])) {
            $candidate = $extension !== ''
                ? sprintf('%s (%d).%s', $filename, $suffix, $extension)
                : sprintf('%s (%d)', $filename, $suffix);
            $suffix++;
        }

        $usedNames[$candidate] = true;

        return $candidate;
    }
}
