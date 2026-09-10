<?php

namespace App\Service;

use App\Entity\Assets\Assets;
use App\Entity\Assets\Categories;
use Psr\Log\LoggerInterface;

class SwatchRgbService
{
    private const CATEGORY_NAMES = ['swatch', 'swatches'];
    private const SAMPLE_SIZE = 20;

    public function __construct(private readonly LoggerInterface $logger)
    {
    }

    public function update(Assets $asset, bool $force = false): void
    {
        if (!$this->isSwatch($asset)) {
            $asset->setRgb(null);

            return;
        }

        if (!$force && $asset->getRgb() !== null) {
            return;
        }

        $filePath = $asset->getFilePath();
        $mimeType = $asset->getMimeType();

        if (
            !is_string($filePath)
            || $filePath === ''
            || !is_string($mimeType)
            || !str_starts_with($mimeType, 'image/')
        ) {
            $asset->setRgb(null);

            return;
        }

        $asset->setRgb($this->extractFromFile($filePath));
    }

    public function extractFromFile(string $filePath): ?string
    {
        if (!class_exists(\Imagick::class) || !is_file($filePath)) {
            return null;
        }

        $image = new \Imagick();

        try {
            $image->readImage($filePath);
            $image->setIteratorIndex(0);
            $image->transformImageColorspace(\Imagick::COLORSPACE_SRGB);

            $width = $image->getImageWidth();
            $height = $image->getImageHeight();
            if ($width < 1 || $height < 1) {
                return null;
            }

            $sampleWidth = min(self::SAMPLE_SIZE, $width);
            $sampleHeight = min(self::SAMPLE_SIZE, $height);
            $sampleX = (int) (($width / 2) - ($sampleWidth / 2));
            $sampleY = (int) (($height / 2) - ($sampleHeight / 2));

            $pixels = $image->exportImagePixels(
                $sampleX,
                $sampleY,
                $sampleWidth,
                $sampleHeight,
                'RGB',
                \Imagick::PIXEL_CHAR,
            );

            if (!is_array($pixels) || count($pixels) < 3) {
                return null;
            }

            $red = 0;
            $green = 0;
            $blue = 0;
            $pixelCount = intdiv(count($pixels), 3);

            for ($index = 0; $index < $pixelCount * 3; $index += 3) {
                $red += $pixels[$index];
                $green += $pixels[$index + 1];
                $blue += $pixels[$index + 2];
            }

            return sprintf(
                '%d,%d,%d',
                round($red / $pixelCount),
                round($green / $pixelCount),
                round($blue / $pixelCount),
            );
        } catch (\ImagickException $exception) {
            $this->logger->warning('Could not extract the center RGB value from a swatch asset.', [
                'file_path' => $filePath,
                'exception' => $exception,
            ]);

            return null;
        } finally {
            $image->clear();
        }
    }

    private function isSwatch(Assets $asset): bool
    {
        foreach ($asset->getCategories() as $category) {
            if (!$category instanceof Categories) {
                continue;
            }

            $visited = [];
            $current = $category;

            while ($current !== null) {
                $objectId = spl_object_id($current);
                if (isset($visited[$objectId])) {
                    break;
                }

                $visited[$objectId] = true;
                if (in_array(strtolower(trim((string) $current->getName())), self::CATEGORY_NAMES, true)) {
                    return true;
                }

                $current = $current->getCategories();
            }
        }

        return false;
    }
}
