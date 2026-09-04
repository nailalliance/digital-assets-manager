<?php

namespace App\Service\Banner;

use App\Service\Banner\Exception\AssetSourceNotFoundException;
use App\Service\Banner\Exception\BannerInputException;
use App\Service\Banner\Exception\MissingClippingPathException;
use App\Service\Image\ClippingPathExtractor;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\Filesystem\Filesystem;

class ProductCutoutService
{
    private const MAX_FILE_BYTES = 52_428_800;
    private const MAX_SOURCE_PIXELS = 80_000_000;
    private const MAX_WORKING_DIMENSION = 1000;

    private readonly ?string $srgbProfile;
    private readonly ?string $cmykProfile;

    public function __construct(
        private readonly Filesystem $filesystem,
        private readonly ClippingPathExtractor $clippingPathExtractor,
        #[Autowire('%srgb_profile_path%')]
        string $srgbProfilePath,
        #[Autowire('%cmyk_profile_path%')]
        string $cmykProfilePath,
    ) {
        $this->srgbProfile = $filesystem->exists($srgbProfilePath) ? file_get_contents($srgbProfilePath) : null;
        $this->cmykProfile = $filesystem->exists($cmykProfilePath) ? file_get_contents($cmykProfilePath) : null;
    }

    public function extract(string $sourcePath, ?int $assetId = null): \Imagick
    {
        if (!$this->filesystem->exists($sourcePath) || !is_file($sourcePath) || !is_readable($sourcePath)) {
            throw new AssetSourceNotFoundException($assetId);
        }

        $fileSize = @filesize($sourcePath);
        if (!is_int($fileSize) || $fileSize < 1 || $fileSize > self::MAX_FILE_BYTES) {
            throw new BannerInputException($this->assetMessage($assetId, 'source file exceeds the 50 MB limit'));
        }

        $mimeType = mime_content_type($sourcePath);
        if ($mimeType !== 'image/jpeg') {
            throw new BannerInputException($this->assetMessage($assetId, 'must be a JPEG with an embedded clipping path'));
        }

        $probe = new \Imagick();

        try {
            $probe->pingImage($sourcePath);
            $width = $probe->getImageWidth();
            $height = $probe->getImageHeight();
        } catch (\ImagickException $exception) {
            throw new BannerInputException(
                $this->assetMessage($assetId, 'could not be decoded'),
                previous: $exception
            );
        } finally {
            $probe->clear();
        }

        if ($width < 1 || $height < 1 || $width * $height > self::MAX_SOURCE_PIXELS) {
            throw new BannerInputException($this->assetMessage($assetId, 'source dimensions exceed the rendering limit'));
        }

        $image = new \Imagick();

        try {
            $image->readImage($sourcePath);
            $image->setIteratorIndex(0);
            $pathResource = $this->clippingPathExtractor->largestPathResource($image);

            // The final banner needs at most 300px-high bottles. Keeping a
            // 1000px working cutout provides generous supersampling while the
            // clipping-path SVG is rasterized at a fraction of the source cost.
            if (
                $pathResource !== null
                && max($image->getImageWidth(), $image->getImageHeight()) > self::MAX_WORKING_DIMENSION
            ) {
                $image->thumbnailImage(
                    self::MAX_WORKING_DIMENSION,
                    self::MAX_WORKING_DIMENSION,
                    true,
                    false
                );
                $image->setImagePage(0, 0, 0, 0);
            }

            if (!$this->clippingPathExtractor->applyPrimary($image, $pathResource)) {
                throw new MissingClippingPathException($assetId);
            }

            $this->autoOrient($image);
            $this->convertToSrgb($image);
            $image->setImageBackgroundColor(new \ImagickPixel('transparent'));
            $image->trimImage(0);
            $image->setImagePage(0, 0, 0, 0);
            $image->stripImage();

            if ($image->getImageWidth() < 1 || $image->getImageHeight() < 1) {
                throw new BannerInputException($this->assetMessage($assetId, 'clipping path produced an empty cutout'));
            }

            return $image;
        } catch (BannerInputException $exception) {
            $image->clear();
            throw $exception;
        } catch (\ImagickException $exception) {
            $image->clear();
            throw new BannerInputException(
                $this->assetMessage($assetId, 'could not be prepared for composition'),
                previous: $exception
            );
        }
    }

    private function convertToSrgb(\Imagick $image): void
    {
        if ($image->getImageColorspace() === \Imagick::COLORSPACE_CMYK) {
            if ($this->cmykProfile !== null && $this->srgbProfile !== null) {
                $image->profileImage('icc', $this->cmykProfile);
                $image->profileImage('icc', $this->srgbProfile);
            } else {
                $image->transformImageColorspace(\Imagick::COLORSPACE_SRGB);
            }

            return;
        }

        if ($image->getImageColorspace() !== \Imagick::COLORSPACE_SRGB) {
            $image->transformImageColorspace(\Imagick::COLORSPACE_SRGB);
        }
    }

    private function autoOrient(\Imagick $image): void
    {
        if (method_exists($image, 'autoOrient')) {
            $image->autoOrient();

            return;
        }

        // Older Imagick releases expose the operation under this name.
        if (method_exists($image, 'autoOrientImage')) {
            $image->autoOrientImage();
        }
    }

    private function assetMessage(?int $assetId, string $message): string
    {
        return $assetId === null
            ? ucfirst($message) . '.'
            : sprintf('Asset %d %s.', $assetId, $message);
    }
}
