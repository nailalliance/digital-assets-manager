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

    #[Route('/share/{token}/image/{assetId}/debug-clip-paths/{width}x{height}/{padding}/{filename}.{extension}', name: 'public_image_debug_clip_paths_padded', requirements: ['assetId' => '\d+', 'width' => '\d+', 'height' => '\d+', 'padding' => '\d+', 'extension' => 'jpg|png|webp'], defaults: ['useLargestClipPath' => false, 'clipPathIndex' => null, 'debugClipPaths' => true])]
    #[Route('/share/{token}/image/{assetId}/debug-clip-paths/{width}x{height}/{filename}.{extension}', name: 'public_image_debug_clip_paths', requirements: ['assetId' => '\d+', 'width' => '\d+', 'height' => '\d+', 'extension' => 'jpg|png|webp'], defaults: ['padding' => 0, 'useLargestClipPath' => false, 'clipPathIndex' => null, 'debugClipPaths' => true])]
    #[Route('/share/{token}/image/{assetId}/use-clip-path/{pathIndex}/{width}x{height}/{padding}/{filename}.{extension}', name: 'public_image_clip_path_index_padded', requirements: ['assetId' => '\d+', 'pathIndex' => '\d+', 'width' => '\d+', 'height' => '\d+', 'padding' => '\d+', 'extension' => 'jpg|png|webp'], defaults: ['useLargestClipPath' => true])]
    #[Route('/share/{token}/image/{assetId}/use-clip-path/{pathIndex}/{width}x{height}/{filename}.{extension}', name: 'public_image_clip_path_index', requirements: ['assetId' => '\d+', 'pathIndex' => '\d+', 'width' => '\d+', 'height' => '\d+', 'extension' => 'jpg|png|webp'], defaults: ['padding' => 0, 'useLargestClipPath' => true])]
    #[Route('/share/{token}/image/{assetId}/use-largest-clip-path/{width}x{height}/{padding}/{filename}.{extension}', name: 'public_image_largest_clip_path_padded', requirements: ['assetId' => '\d+', 'width' => '\d+', 'height' => '\d+', 'padding' => '\d+', 'extension' => 'jpg|png|webp'], defaults: ['useLargestClipPath' => true, 'clipPathIndex' => null])]
    #[Route('/share/{token}/image/{assetId}/use-largest-clip-path/{width}x{height}/{filename}.{extension}', name: 'public_image_largest_clip_path', requirements: ['assetId' => '\d+', 'width' => '\d+', 'height' => '\d+', 'extension' => 'jpg|png|webp'], defaults: ['padding' => 0, 'useLargestClipPath' => true, 'clipPathIndex' => null])]
    #[Route('/share/{token}/image/{assetId}/{width}x{height}/{padding}/{filename}.{extension}', name: 'public_image_padded', requirements: ['assetId' => '\d+', 'width' => '\d+', 'height' => '\d+', 'padding' => '\d+', 'extension' => 'jpg|png|webp'], defaults: ['useLargestClipPath' => false, 'clipPathIndex' => null])]
    #[Route('/share/{token}/image/{assetId}/{width}x{height}/{filename}.{extension}', name: 'public_image', requirements: ['assetId' => '\d+', 'width' => '\d+', 'height' => '\d+', 'extension' => 'jpg|png|webp'], defaults: ['padding' => 0, 'useLargestClipPath' => false, 'clipPathIndex' => null])]
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
        ?int $clipPathIndex,
        string $filename,
        string $extension,
        bool $debugClipPaths = false
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

        if ($debugClipPaths) {
            return $this->createClipPathDebugSheetResponse(
                $asset,
                $imageProcessor,
                $width,
                $height,
                $padding,
                $filename,
                $extension
            );
        }

        try {
            $cachedImagePath = $permalinkImageCache->getOrCreate($asset, $width, $height, $padding, $extension, $useLargestClipPath, $clipPathIndex);
            $response = new BinaryFileResponse($cachedImagePath);
        } catch (\InvalidArgumentException) {
            throw $this->createNotFoundException('Could not process image.');
        } catch (\RuntimeException) {
            $imageBinary = $imageProcessor->exportFile($sourcePath, $width, $height, $padding, $extension, $useLargestClipPath, $clipPathIndex);

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

    private function createClipPathDebugSheetResponse(
        Assets $asset,
        ImageProcessorService $imageProcessor,
        int $width,
        int $height,
        int $padding,
        string $filename,
        string $extension
    ): Response {
        if (!class_exists(\Imagick::class)) {
            throw $this->createNotFoundException('Imagick is not available.');
        }

        $sourcePath = $asset->getFilePath();
        if ($sourcePath === null || $sourcePath === '' || !file_exists($sourcePath)) {
            throw $this->createNotFoundException('Source file not found.');
        }

        $debugSource = $this->loadClipPathDebugSource($sourcePath);
        if ($debugSource === null || $debugSource['clipPaths'] === []) {
            throw $this->createNotFoundException('No clip paths found on this image.');
        }

        $variants = [];
        $largestClipPathIndex = $this->findLargestClipPathIndex($debugSource['clipPaths']);

        if ($largestClipPathIndex !== null) {
            $variants[] = [
                'label' => 'largest',
                'svgPathData' => $debugSource['clipPaths'][$largestClipPathIndex],
            ];
        }

        foreach ($debugSource['clipPaths'] as $clipPathIndex => $svgPathData) {
            $variants[] = [
                'label' => '#' . $clipPathIndex,
                'svgPathData' => $svgPathData,
            ];
        }

        $baseTile = $this->createClipPathDebugBaseTile($sourcePath, $width, $height, $padding);
        $baseTileBlob = $baseTile->getImageBlob();
        $baseTile->clear();

        $tiles = [];

        try {
            foreach ($variants as $variant) {
                $tile = new \Imagick();
                $tile->readImageBlob($baseTileBlob);
                $tile->setImageFormat('png');

                $overlay = $this->createClipPathDebugOverlayTile(
                    $variant['svgPathData'],
                    $debugSource['width'],
                    $debugSource['height'],
                    $width,
                    $height,
                    $padding
                );

                if ($overlay instanceof \Imagick) {
                    $tile->compositeImage($overlay, \Imagick::COMPOSITE_OVER, 0, 0);
                    $overlay->clear();
                }

                $tiles[] = [
                    'label' => $variant['label'],
                    'image' => $tile,
                ];
            }

            if ($tiles === []) {
                throw $this->createNotFoundException('Could not render clip path previews.');
            }

            $sheet = $this->buildClipPathDebugSheet($tiles, $width, $height, $extension);
            $binary = $sheet->getImageBlob();

            $response = new Response($binary);
            $disposition = $response->headers->makeDisposition(
                ResponseHeaderBag::DISPOSITION_INLINE,
                $filename . '-clip-path-debug.' . $extension
            );
            $response->headers->set('Content-Disposition', $disposition);
            $response->headers->set('Content-Type', $this->resolveImageContentType($extension));
            $response->headers->set('Cache-Control', 'private, no-store, max-age=0, must-revalidate');
            $response->headers->set('X-Clip-Path-Indices', implode(',', array_keys($debugSource['clipPaths'])));

            $sheet->clear();

            return $response;
        } finally {
            foreach ($tiles as $tileData) {
                if (($tileData['image'] ?? null) instanceof \Imagick) {
                    $tileData['image']->clear();
                }
            }
        }
    }

    /**
     * @return array{width: int, height: int, clipPaths: array<int, string>}|null
     */
    private function loadClipPathDebugSource(string $sourcePath): ?array
    {
        $image = new \Imagick();

        try {
            $image->readImage($sourcePath);

            $clipPaths = [];
            for ($i = 0; $i <= 15; $i++) {
                $svgPathData = $image->getImageProperty("8BIM:1999,2998:#{$i}");
                if ($svgPathData) {
                    $clipPaths[$i] = $svgPathData;
                }
            }

            return [
                'width' => $image->getImageWidth(),
                'height' => $image->getImageHeight(),
                'clipPaths' => $clipPaths,
            ];
        } catch (\ImagickException) {
            return null;
        } finally {
            $image->clear();
        }
    }

    /**
     * @param array<int, string> $clipPaths
     */
    private function findLargestClipPathIndex(array $clipPaths): ?int
    {
        $largestBoundingBoxArea = 0.0;
        $bestClipPathIndex = null;

        foreach ($clipPaths as $clipPathIndex => $svgPathData) {
            $boundingBoxArea = $this->estimateClipPathBoundingBoxArea($svgPathData);
            if ($boundingBoxArea === null || $boundingBoxArea <= $largestBoundingBoxArea) {
                continue;
            }

            $largestBoundingBoxArea = $boundingBoxArea;
            $bestClipPathIndex = $clipPathIndex;
        }

        return $bestClipPathIndex;
    }

    private function createClipPathDebugBaseTile(string $sourcePath, int $targetWidth, int $targetHeight, int $padding): \Imagick
    {
        $image = new \Imagick();
        $image->readImage($sourcePath);

        if ($image->getImageColorspace() === \Imagick::COLORSPACE_CMYK) {
            $image->transformImageColorspace(\Imagick::COLORSPACE_SRGB);
        }

        $image->thumbnailImage($targetWidth - ($padding * 2), $targetHeight - ($padding * 2), true, true);

        $canvas = new \Imagick();
        $canvas->newImage($targetWidth, $targetHeight, new \ImagickPixel('white'), 'png');

        $x = (int) (($targetWidth - $image->getImageWidth()) / 2);
        $y = (int) (($targetHeight - $image->getImageHeight()) / 2);
        $canvas->compositeImage($image, \Imagick::COMPOSITE_OVER, $x, $y);
        $canvas->setImageFormat('png');

        $image->clear();

        return $canvas;
    }

    private function createClipPathDebugOverlayTile(
        string $svgPathData,
        int $sourceWidth,
        int $sourceHeight,
        int $targetWidth,
        int $targetHeight,
        int $padding
    ): ?\Imagick {
        $overlaySvg = $this->buildClipPathOverlaySvg($svgPathData, $sourceWidth, $sourceHeight);
        if ($overlaySvg === null) {
            return null;
        }

        $overlay = new \Imagick();

        try {
            $overlay->setBackgroundColor(new \ImagickPixel('transparent'));
            $overlay->readImageBlob($overlaySvg);
            $overlay->setImageFormat('png');

            if ($overlay->getImageWidth() !== $sourceWidth || $overlay->getImageHeight() !== $sourceHeight) {
                $overlay->scaleImage($sourceWidth, $sourceHeight);
            }

            $overlay->thumbnailImage($targetWidth - ($padding * 2), $targetHeight - ($padding * 2), true, true);

            $canvas = new \Imagick();
            $canvas->newImage($targetWidth, $targetHeight, new \ImagickPixel('transparent'), 'png');

            $x = (int) (($targetWidth - $overlay->getImageWidth()) / 2);
            $y = (int) (($targetHeight - $overlay->getImageHeight()) / 2);
            $canvas->compositeImage($overlay, \Imagick::COMPOSITE_OVER, $x, $y);
            $canvas->setImageFormat('png');

            return $canvas;
        } catch (\ImagickException) {
            return null;
        } finally {
            $overlay->clear();
        }
    }

    private function buildClipPathOverlaySvg(string $svgPathData, int $imageWidth, int $imageHeight): ?string
    {
        $document = new \DOMDocument();
        if (@$document->loadXML($svgPathData) === false) {
            return $this->buildClipPathOverlaySvgFromPathDataStrings(
                $this->extractClipPathPathDataStrings($svgPathData),
                $imageWidth,
                $imageHeight
            );
        }

        $svg = $document->documentElement;
        if (!$svg instanceof \DOMElement) {
            return null;
        }

        $svg->setAttribute('width', (string) $imageWidth);
        $svg->setAttribute('height', (string) $imageHeight);
        if (!$svg->hasAttribute('viewBox')) {
            $svg->setAttribute('viewBox', sprintf('0 0 %d %d', $imageWidth, $imageHeight));
        }

        $strokeWidth = $this->resolveClipPathDebugStrokeWidth($imageWidth, $imageHeight);
        $xpath = new \DOMXPath($document);
        /** @var \DOMNodeList<\DOMElement> $elements */
        $elements = $xpath->query('//*');
        if ($elements === false) {
            return null;
        }

        foreach ($elements as $element) {
            $tagName = strtolower($element->localName);

            if ($tagName === 'svg' || $tagName === 'g') {
                continue;
            }

            if ($tagName !== 'path') {
                $element->parentNode?->removeChild($element);
                continue;
            }

            $element->setAttribute('fill', '#00ff00');
            $element->setAttribute('fill-opacity', '0.14');
            $element->setAttribute('stroke', '#00ff00');
            $element->setAttribute('stroke-opacity', '0.95');
            $element->setAttribute('stroke-width', $strokeWidth);
            $element->setAttribute('stroke-linejoin', 'round');
            $element->setAttribute('stroke-linecap', 'round');
            $element->setAttribute(
                'style',
                sprintf(
                    'fill:#00ff00;fill-opacity:0.14;stroke:#00ff00;stroke-opacity:0.95;stroke-width:%s;stroke-linejoin:round;stroke-linecap:round',
                    $strokeWidth
                )
            );
        }

        return $document->saveXML();
    }

    /**
     * @param list<string> $pathDataStrings
     */
    private function buildClipPathOverlaySvgFromPathDataStrings(array $pathDataStrings, int $imageWidth, int $imageHeight): ?string
    {
        if ($pathDataStrings === []) {
            return null;
        }

        $document = new \DOMDocument('1.0', 'UTF-8');
        $svg = $document->createElement('svg');
        $svg->setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        $svg->setAttribute('width', (string) $imageWidth);
        $svg->setAttribute('height', (string) $imageHeight);
        $svg->setAttribute('viewBox', sprintf('0 0 %d %d', $imageWidth, $imageHeight));
        $document->appendChild($svg);

        $strokeWidth = $this->resolveClipPathDebugStrokeWidth($imageWidth, $imageHeight);
        foreach ($pathDataStrings as $pathData) {
            $path = $document->createElement('path');
            $path->setAttribute('d', $pathData);
            $path->setAttribute('fill', '#00ff00');
            $path->setAttribute('fill-opacity', '0.14');
            $path->setAttribute('stroke', '#00ff00');
            $path->setAttribute('stroke-opacity', '0.95');
            $path->setAttribute('stroke-width', $strokeWidth);
            $path->setAttribute('stroke-linejoin', 'round');
            $path->setAttribute('stroke-linecap', 'round');
            $svg->appendChild($path);
        }

        return $document->saveXML();
    }

    /**
     * @return list<string>
     */
    private function extractClipPathPathDataStrings(string $svgPathData): array
    {
        if (!preg_match_all('/<path[^>]*\sd="([^"]+)"/i', $svgPathData, $matches)) {
            return [];
        }

        return array_values(array_filter($matches[1] ?? [], static fn (string $pathData): bool => $pathData !== ''));
    }

    private function resolveClipPathDebugStrokeWidth(int $imageWidth, int $imageHeight): string
    {
        return (string) max(8, (int) round(max($imageWidth, $imageHeight) / 120));
    }

    private function estimateClipPathBoundingBoxArea(string $svgPathData): ?float
    {
        $bounds = $this->extractClipPathBounds($svgPathData);

        return $bounds['area'] ?? null;
    }

    /**
     * @return array{width: float, height: float, area: float}|null
     */
    private function extractClipPathBounds(string $pathData): ?array
    {
        if (preg_match('/d="([^"]+)"/', $pathData, $matches)) {
            $pathData = $matches[1];
        }

        preg_match_all('/[-+]?[0-9]*\.?[0-9]+/', $pathData, $coords);
        $numbers = $coords[0] ?? [];

        if (count($numbers) < 4) {
            return null;
        }

        $minX = $maxX = (float) $numbers[0];
        $minY = $maxY = (float) $numbers[1];
        $count = count($numbers);

        for ($i = 0; $i < $count; $i += 2) {
            if (!isset($numbers[$i + 1])) {
                break;
            }

            $x = (float) $numbers[$i];
            $y = (float) $numbers[$i + 1];

            if ($x < $minX) {
                $minX = $x;
            }

            if ($x > $maxX) {
                $maxX = $x;
            }

            if ($y < $minY) {
                $minY = $y;
            }

            if ($y > $maxY) {
                $maxY = $y;
            }
        }

        $width = max(0.0, $maxX - $minX);
        $height = max(0.0, $maxY - $minY);

        return [
            'width' => $width,
            'height' => $height,
            'area' => $width * $height,
        ];
    }

    /**
     * @param array<int, array{label: string, image: \Imagick}> $tiles
     */
    private function buildClipPathDebugSheet(array $tiles, int $tileWidth, int $tileHeight, string $extension): \Imagick
    {
        $columns = min(3, count($tiles));
        $rows = (int) ceil(count($tiles) / $columns);
        $gutter = 24;
        $labelHeight = 42;
        $cellHeight = $tileHeight + $labelHeight;
        $sheetWidth = ($columns * $tileWidth) + (($columns + 1) * $gutter);
        $sheetHeight = ($rows * $cellHeight) + (($rows + 1) * $gutter);

        $sheet = new \Imagick();
        $sheet->newImage($sheetWidth, $sheetHeight, new \ImagickPixel('#1d1d1d'), 'png');

        $draw = new \ImagickDraw();
        $draw->setFillColor(new \ImagickPixel('#ffffff'));
        $draw->setFont('Helvetica');
        $draw->setFontSize(22);

        foreach ($tiles as $offset => $tileData) {
            $column = $offset % $columns;
            $row = intdiv($offset, $columns);
            $x = $gutter + ($column * ($tileWidth + $gutter));
            $y = $gutter + ($row * ($cellHeight + $gutter));

            $sheet->compositeImage($tileData['image'], \Imagick::COMPOSITE_OVER, $x, $y + $labelHeight);
            $sheet->annotateImage($draw, $x, $y + 28, 0, $tileData['label']);
        }

        $sheet->setImageFormat($extension);

        if ($extension === 'jpg') {
            $sheet->setImageCompressionQuality(82);
        }

        $draw->clear();

        return $sheet;
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
