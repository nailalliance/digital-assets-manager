<?php

namespace App\Service\Banner;

use App\Entity\Assets\Assets;
use App\Service\Banner\Exception\AssetSourceNotFoundException;
use App\Service\Banner\Exception\BannerInputException;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\Filesystem\Filesystem;

class BannerCompositionService
{
    public const RENDERER_VERSION = 'v8-color-reflection';

    public function __construct(
        private readonly Filesystem $filesystem,
        private readonly ProductCutoutService $productCutoutService,
        private readonly BannerLayoutCatalog $layoutCatalog,
        private readonly BannerPlacementEngine $placementEngine,
        private readonly LoggerInterface $logger,
        #[Autowire('%banner_background_path%')]
        private readonly string $backgroundPath,
    ) {
    }

    /**
     * @param list<Assets> $assets
     */
    public function render(array $assets, string $layoutName, string $format, int $seed): string
    {
        if (!class_exists(\Imagick::class)) {
            throw new \RuntimeException('Imagick is not installed.');
        }
        $this->applyResourceCeilings();
        if (!in_array($format, ['webp', 'jpg'], true)) {
            throw new BannerInputException('Format must be webp or jpg.');
        }

        $layout = $this->layoutCatalog->get($layoutName);
        $startedAt = microtime(true);
        $cutouts = [];
        $prepared = [];
        $canvas = null;

        try {
            $canvas = $this->createBackgroundCanvas($layout);

            foreach ($assets as $asset) {
                $sourcePath = $asset->getFilePath();
                if ($sourcePath === null || $sourcePath === '') {
                    throw new AssetSourceNotFoundException($asset->getId());
                }

                $cutouts[] = $this->productCutoutService->extract($sourcePath, $asset->getId());
            }

            $dimensions = array_map(
                static fn (\Imagick $image): array => [
                    'width' => $image->getImageWidth(),
                    'height' => $image->getImageHeight(),
                ],
                $cutouts
            );
            $placements = $this->placementEngine->calculate($dimensions, $layout, $seed);

            foreach ($placements as $placement) {
                $prepared[] = $this->preparePlacedBottle($cutouts[$placement->assetIndex], $placement, $layout);
            }

            foreach (array_keys($layout->surfaces) as $surfaceName) {
                $surfaceItems = array_values(array_filter(
                    $prepared,
                    static fn (array $item): bool => $item['placement']->surface === $surfaceName
                ));
                if ($surfaceItems === []) {
                    continue;
                }

                usort(
                    $surfaceItems,
                    static fn (array $a, array $b): int => $a['placement']->zIndex <=> $b['placement']->zIndex
                );
                $this->renderSurfaceLayer($canvas, $layout, $surfaceName, $surfaceItems);
            }

            $binary = $this->encode($canvas, $format);
            $this->logger->info('Banner composition rendered.', [
                'layout' => $layoutName,
                'format' => $format,
                'seed' => $seed,
                'assetCount' => count($assets),
                'outputBytes' => strlen($binary),
                'durationMs' => (int) round((microtime(true) - $startedAt) * 1000),
            ]);

            return $binary;
        } catch (BannerInputException $exception) {
            throw $exception;
        } catch (\ImagickException $exception) {
            $this->logger->error('Banner composition failed.', [
                'layout' => $layoutName,
                'format' => $format,
                'seed' => $seed,
                'assetCount' => count($assets),
                'exception' => $exception,
            ]);

            throw new \RuntimeException('Imagick could not render the banner.', previous: $exception);
        } finally {
            foreach ($prepared as $item) {
                $item['image']->clear();
            }
            foreach ($cutouts as $cutout) {
                $cutout->clear();
            }
            $canvas?->clear();
        }
    }

    /** @return array{path: string, size: int, mtime: int, renderer: string} */
    public function backgroundFingerprint(): array
    {
        $size = @filesize($this->backgroundPath);
        $mtime = @filemtime($this->backgroundPath);

        return [
            'path' => basename($this->backgroundPath),
            'size' => is_int($size) ? $size : 0,
            'mtime' => is_int($mtime) ? $mtime : 0,
            'renderer' => self::RENDERER_VERSION,
        ];
    }

    private function createBackgroundCanvas(BannerLayout $layout): \Imagick
    {
        if (!$this->filesystem->exists($this->backgroundPath) || !is_readable($this->backgroundPath)) {
            throw new \RuntimeException('The configured banner background is unavailable.');
        }

        $background = new \Imagick();
        $background->readImage($this->backgroundPath);
        $background->setIteratorIndex(0);
        $this->autoOrient($background);

        if ($layout->sourceCrop !== null) {
            $crop = $layout->sourceCrop;
            if (
                $background->getImageWidth() < $crop['x'] + $crop['width']
                || $background->getImageHeight() < $crop['y'] + $crop['height']
            ) {
                $background->clear();
                throw new \RuntimeException('The banner background is smaller than the configured mobile crop.');
            }

            $background->cropImage($crop['width'], $crop['height'], $crop['x'], $crop['y']);
            $background->setImagePage(0, 0, 0, 0);
        }

        $background->cropThumbnailImage($layout->width, $layout->height);
        $background->setImagePage(0, 0, 0, 0);
        $background->setImageColorspace(\Imagick::COLORSPACE_SRGB);

        return $background;
    }

    /**
     * @return array{image: \Imagick, placement: BannerPlacement, x: int, y: int}
     */
    private function preparePlacedBottle(
        \Imagick $source,
        BannerPlacement $placement,
        BannerLayout $layout
    ): array {
        $image = clone $source;
        $targetWidth = max(1, (int) round(
            $placement->targetHeight * $source->getImageWidth() / $source->getImageHeight()
        ));
        $image->resizeImage($targetWidth, $placement->targetHeight, \Imagick::FILTER_LANCZOS, 1.0, false);
        $image->setImageBackgroundColor(new \ImagickPixel('transparent'));
        $image->trimImage(0);
        $image->setImagePage(0, 0, 0, 0);

        $surface = $layout->surface($placement->surface);
        $maximumWidth = $surface['stageRight'] - $surface['stageLeft'];
        $maximumHeight = $placement->contactY - $layout->compositionTop;
        if ($image->getImageWidth() > $maximumWidth || $image->getImageHeight() > $maximumHeight) {
            $image->thumbnailImage($maximumWidth, $maximumHeight, true, true);
            $image->setImagePage(0, 0, 0, 0);
        }

        $x = (int) round($placement->centerX - $image->getImageWidth() / 2);
        $x = max($surface['stageLeft'], min($surface['stageRight'] - $image->getImageWidth(), $x));
        $y = max($layout->compositionTop, $placement->contactY - $image->getImageHeight());

        return ['image' => $image, 'placement' => $placement, 'x' => $x, 'y' => $y];
    }

    /**
     * @param list<array{image: \Imagick, placement: BannerPlacement, x: int, y: int}> $items
     */
    private function renderSurfaceLayer(
        \Imagick $canvas,
        BannerLayout $layout,
        string $surfaceName,
        array $items
    ): void {
        $reflectionLayer = $this->transparentCanvas($layout);
        $glareLayer = $this->transparentCanvas($layout);
        $shadowLayer = $this->transparentCanvas($layout);
        $surface = $layout->surface($surfaceName);
        $surfaceTop = min(array_column($surface['polygon'], 1));

        try {
            foreach ($items as $item) {
                $reflection = $this->createReflection(
                    $item['image'],
                    max(0, $surface['surfaceBottom'] - $item['placement']->contactY)
                );
                if ($reflection !== null) {
                    $reflectionLayer->compositeImage(
                        $reflection,
                        \Imagick::COMPOSITE_OVER,
                        $item['x'],
                        $item['placement']->contactY
                    );
                    $reflection->clear();
                }

                $this->addSurfaceGlare($glareLayer, $item, $surface['surfaceBottom']);
                $this->addCastShadow($shadowLayer, $item, $surfaceTop);
                $this->addContactShadow($shadowLayer, $item);
            }

            $mask = $this->createSurfaceMask($layout, $surface['polygon']);
            try {
                $reflectionLayer->compositeImage($mask, \Imagick::COMPOSITE_DSTIN, 0, 0);
                $glareLayer->compositeImage($mask, \Imagick::COMPOSITE_DSTIN, 0, 0);
                $shadowLayer->compositeImage($mask, \Imagick::COMPOSITE_DSTIN, 0, 0);
            } finally {
                $mask->clear();
            }

            $canvas->compositeImage($glareLayer, \Imagick::COMPOSITE_OVER, 0, 0);
            $canvas->compositeImage($reflectionLayer, \Imagick::COMPOSITE_OVER, 0, 0);
            $canvas->compositeImage($shadowLayer, \Imagick::COMPOSITE_OVER, 0, 0);

            foreach ($items as $item) {
                $canvas->compositeImage($item['image'], \Imagick::COMPOSITE_OVER, $item['x'], $item['y']);
            }
        } finally {
            $reflectionLayer->clear();
            $glareLayer->clear();
            $shadowLayer->clear();
        }
    }

    private function createReflection(\Imagick $bottle, int $maximumHeight): ?\Imagick
    {
        if ($maximumHeight < 1) {
            return null;
        }

        $reflection = clone $bottle;
        $reflection->flipImage();
        $reflectionHeight = max(1, min($maximumHeight, (int) round($bottle->getImageHeight() * 0.16)));
        $reflection->resizeImage(
            $bottle->getImageWidth(),
            $reflectionHeight,
            \Imagick::FILTER_LANCZOS,
            1.0,
            false
        );
        $reflection->setImagePage(0, 0, 0, 0);

        $fade = new \Imagick();
        try {
            $fade->newPseudoImage(
                $reflection->getImageWidth(),
                $reflection->getImageHeight(),
                'gradient:rgba(255,255,255,0.28)-rgba(255,255,255,0)'
            );
            $reflection->compositeImage($fade, \Imagick::COMPOSITE_DSTIN, 0, 0);
        } finally {
            $fade->clear();
        }

        // Keep enough bottle color and structure to read as a reflection, not
        // as the neutral gray blob produced by a broad contact shadow.
        $reflection->gaussianBlurImage(0, 1.2);

        return $reflection;
    }

    /** @param array{image: \Imagick, placement: BannerPlacement, x: int, y: int} $item */
    private function addSurfaceGlare(\Imagick $layer, array $item, int $surfaceBottom): void
    {
        $availableDepth = max(1, $surfaceBottom - $item['placement']->contactY);
        $bottleWidth = $item['image']->getImageWidth();
        $glareDepth = max(1, min($availableDepth, (int) round($bottleWidth * 0.18)));
        $glareWidth = max(12, (int) round($bottleWidth * 0.68));
        $blurMargin = 12;
        $glare = $this->transparentCanvasDimensions(
            $glareWidth + $blurMargin * 2,
            $glareDepth + $blurMargin * 2
        );
        $draw = new \ImagickDraw();

        try {
            // A faint specular wedge travels from the bottle base toward the
            // viewer. The shared surface mask clips it before the ledge edge.
            $draw->setFillColor(new \ImagickPixel('rgba(255,255,255,0.05)'));
            $draw->polygon([
                ['x' => $blurMargin + $glareWidth * 0.36, 'y' => $blurMargin],
                ['x' => $blurMargin + $glareWidth * 0.64, 'y' => $blurMargin],
                ['x' => $blurMargin + $glareWidth * 0.92, 'y' => $blurMargin + $glareDepth],
                ['x' => $blurMargin + $glareWidth * 0.08, 'y' => $blurMargin + $glareDepth],
            ]);
            $glare->drawImage($draw);
            $glare->gaussianBlurImage(0, 4.0);
            $layer->compositeImage(
                $glare,
                \Imagick::COMPOSITE_OVER,
                (int) round($item['placement']->centerX - $glareWidth / 2) - $blurMargin,
                $item['placement']->contactY - $blurMargin
            );
        } finally {
            $draw->clear();
            $glare->clear();
        }
    }

    /** @param array{image: \Imagick, placement: BannerPlacement, x: int, y: int} $item */
    private function addCastShadow(\Imagick $layer, array $item, int $surfaceTop): void
    {
        $bottleWidth = $item['image']->getImageWidth();
        $availableDepth = max(1, $item['placement']->contactY - $surfaceTop);
        $projectionLength = max(14, (int) round($bottleWidth * 0.70));
        $projectionDepth = max(2, min($availableDepth - 1, (int) round($bottleWidth * 0.22)));
        $blurMargin = 16;
        $shadowWidth = $bottleWidth + $projectionLength + $blurMargin * 2;
        $shadowHeight = $projectionDepth + $blurMargin * 2;
        $shadow = $this->transparentCanvasDimensions($shadowWidth, $shadowHeight);
        $draw = new \ImagickDraw();

        try {
            // Front-left illumination sends this tapered footprint away from
            // the viewer: upward and slightly right across the stone plane.
            $draw->setFillColor(new \ImagickPixel('rgba(43,55,63,0.24)'));
            $draw->polygon([
                [
                    'x' => $blurMargin + $bottleWidth * 0.12,
                    'y' => $blurMargin + $projectionDepth,
                ],
                [
                    'x' => $blurMargin + $bottleWidth * 0.88,
                    'y' => $blurMargin + $projectionDepth,
                ],
                [
                    'x' => $blurMargin + $bottleWidth * 0.76 + $projectionLength,
                    'y' => $blurMargin,
                ],
                [
                    'x' => $blurMargin + $bottleWidth * 0.28 + $projectionLength * 0.62,
                    'y' => $blurMargin + $projectionDepth * 0.28,
                ],
            ]);
            $shadow->drawImage($draw);
            $shadow->gaussianBlurImage(0, 5.5);
            $layer->compositeImage(
                $shadow,
                \Imagick::COMPOSITE_OVER,
                $item['x'] - $blurMargin,
                $item['placement']->contactY - $projectionDepth - $blurMargin
            );
        } finally {
            $draw->clear();
            $shadow->clear();
        }
    }

    /** @param array{image: \Imagick, placement: BannerPlacement, x: int, y: int} $item */
    private function addContactShadow(\Imagick $layer, array $item): void
    {
        $radiusX = max(5.0, $item['image']->getImageWidth() * 0.20);
        $radiusY = max(1.0, min(2.5, $item['image']->getImageWidth() * 0.012));
        $blurMargin = 7;
        $contactWidth = (int) ceil($radiusX * 2) + $blurMargin * 2;
        $contactHeight = (int) ceil($radiusY * 2) + $blurMargin * 2;
        $contact = $this->transparentCanvasDimensions($contactWidth, $contactHeight);
        $draw = new \ImagickDraw();

        try {
            // Only a thin ambient-occlusion line remains at the physical
            // contact point. The visible foreground effect is the reflection.
            $draw->setFillColor(new \ImagickPixel('rgba(27,38,45,0.14)'));
            $draw->ellipse(
                $contactWidth / 2,
                $contactHeight / 2,
                $radiusX,
                $radiusY,
                0,
                360
            );
            $contact->drawImage($draw);
            $contact->gaussianBlurImage(0, 1.4);
            $layer->compositeImage(
                $contact,
                \Imagick::COMPOSITE_OVER,
                (int) round($item['placement']->centerX - $contactWidth / 2),
                (int) round($item['placement']->contactY - 1 - $contactHeight / 2)
            );
        } finally {
            $draw->clear();
            $contact->clear();
        }
    }

    /** @param list<array{0: int, 1: int}> $polygon */
    private function createSurfaceMask(BannerLayout $layout, array $polygon): \Imagick
    {
        $mask = $this->transparentCanvas($layout);
        $draw = new \ImagickDraw();

        try {
            $draw->setFillColor(new \ImagickPixel('white'));
            $draw->polygon(array_map(
                static fn (array $point): array => ['x' => $point[0], 'y' => $point[1]],
                $polygon
            ));
            $mask->drawImage($draw);
        } finally {
            $draw->clear();
        }

        return $mask;
    }

    private function transparentCanvas(BannerLayout $layout): \Imagick
    {
        return $this->transparentCanvasDimensions($layout->width, $layout->height);
    }

    private function transparentCanvasDimensions(int $width, int $height): \Imagick
    {
        $image = new \Imagick();
        $image->newImage($width, $height, new \ImagickPixel('transparent'), 'png');
        $image->setImageAlphaChannel(\Imagick::ALPHACHANNEL_SET);

        return $image;
    }

    private function encode(\Imagick $canvas, string $format): string
    {
        $canvas->stripImage();

        if ($format === 'webp') {
            $canvas->setImageFormat('webp');
            $canvas->setImageCompressionQuality(87);
            $canvas->setOption('webp:method', '6');
            $canvas->setOption('webp:alpha-quality', '90');
        } else {
            $canvas->setImageFormat('jpeg');
            $canvas->setImageCompressionQuality(88);
            $canvas->setInterlaceScheme(\Imagick::INTERLACE_JPEG);
            $canvas->setOption('jpeg:fancy-upsampling', 'off');
        }

        return $canvas->getImageBlob();
    }

    private function autoOrient(\Imagick $image): void
    {
        if (method_exists($image, 'autoOrient')) {
            $image->autoOrient();

            return;
        }

        if (method_exists($image, 'autoOrientImage')) {
            $image->autoOrientImage();
        }
    }

    private function applyResourceCeilings(): void
    {
        foreach ([
            \Imagick::RESOURCETYPE_MEMORY => 536_870_912,
            \Imagick::RESOURCETYPE_MAP => 1_073_741_824,
            \Imagick::RESOURCETYPE_DISK => 2_147_483_648,
            \Imagick::RESOURCETYPE_THREAD => 2,
        ] as $resource => $ceiling) {
            $currentLimit = \Imagick::getResourceLimit($resource);
            if ($currentLimit === 0 || $currentLimit > $ceiling) {
                \Imagick::setResourceLimit($resource, $ceiling);
            }
        }
    }
}
