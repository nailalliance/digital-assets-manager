<?php

namespace App\Service;

use App\Entity\Assets\Assets;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\Filesystem\Exception\IOExceptionInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Lock\LockFactory;

final class PermalinkImageCacheService
{
    private const LARGEST_CLIP_PATH_CACHE_TOKEN = 'lcpv5';

    private readonly string $permalinkCacheDir;

    public function __construct(
        private readonly Filesystem $filesystem,
        private readonly ImageProcessorService $imageProcessor,
        private readonly LockFactory $lockFactory,
        #[Autowire('%permalink_cache_dir%')]
        string $permalinkCacheDir,
        #[Autowire('%permalink_cache_version%')]
        private readonly string $cacheVersion,
    ) {
        $this->permalinkCacheDir = rtrim($permalinkCacheDir, '/');
    }

    public function getOrCreate(Assets $asset, int $width, int $height, int $padding, string $format, bool $useLargestClipPath = false): string
    {
        $this->assertValidVariant($width, $height, $padding, $format);

        $assetId = $asset->getId();
        if ($assetId === null) {
            throw new \InvalidArgumentException('Asset must be persisted before generating a cached permalink image.');
        }

        $sourcePath = $asset->getFilePath();
        if ($sourcePath === null || $sourcePath === '' || !$this->filesystem->exists($sourcePath)) {
            throw new \RuntimeException('Source file not found.');
        }

        $cachePath = $this->buildCachePath($assetId, $width, $height, $padding, $format, $useLargestClipPath);
        if ($this->isUsableCacheFile($cachePath)) {
            return $cachePath;
        }

        $cacheDir = \dirname($cachePath);
        try {
            $this->filesystem->mkdir($cacheDir);
        } catch (IOExceptionInterface $exception) {
            throw new \RuntimeException('Could not prepare cached permalink image directory.', previous: $exception);
        }

        $lock = $this->lockFactory->createLock($this->buildLockKey($assetId, $width, $height, $padding, $format, $useLargestClipPath));
        $lock->acquire(true);

        $tempPath = null;

        try {
            if ($this->isUsableCacheFile($cachePath)) {
                return $cachePath;
            }

            $imageBinary = $this->imageProcessor->exportFile($sourcePath, $width, $height, $padding, $format, $useLargestClipPath);

            if ($imageBinary === null || $imageBinary === '') {
                throw new \RuntimeException('Could not process image.');
            }

            $tempPath = sprintf('%s/.tmp-%s.%s', $cacheDir, bin2hex(random_bytes(16)), $format);
            $this->filesystem->dumpFile($tempPath, $imageBinary);

            if (!$this->isUsableCacheFile($tempPath)) {
                throw new \RuntimeException('Generated cache file is invalid.');
            }

            $this->filesystem->rename($tempPath, $cachePath, true);

            return $cachePath;
        } catch (IOExceptionInterface $exception) {
            throw new \RuntimeException('Could not write cached permalink image.', previous: $exception);
        } finally {
            if ($tempPath !== null && $this->filesystem->exists($tempPath)) {
                $this->filesystem->remove($tempPath);
            }

            $lock->release();
        }
    }

    private function buildCachePath(int $assetId, int $width, int $height, int $padding, string $format, bool $useLargestClipPath): string
    {
        $clipPathSegment = $useLargestClipPath ? '-' . self::LARGEST_CLIP_PATH_CACHE_TOKEN : '';

        return sprintf(
            '%s/%d/%dx%d-p%d%s-%s.%s',
            $this->permalinkCacheDir,
            $assetId,
            $width,
            $height,
            $padding,
            $clipPathSegment,
            $this->cacheVersion,
            $format
        );
    }

    private function buildLockKey(int $assetId, int $width, int $height, int $padding, string $format, bool $useLargestClipPath): string
    {
        return sprintf(
            'permalink-image:%d:%dx%d:%d:%s:%s:%s',
            $assetId,
            $width,
            $height,
            $padding,
            $format,
            $useLargestClipPath ? self::LARGEST_CLIP_PATH_CACHE_TOKEN : 'standard',
            $this->cacheVersion
        );
    }

    private function assertValidVariant(int $width, int $height, int $padding, string $format): void
    {
        if ($width < 1 || $width > 5000) {
            throw new \InvalidArgumentException('Width must be between 1 and 5000 pixels.');
        }

        if ($height < 1 || $height > 5000) {
            throw new \InvalidArgumentException('Height must be between 1 and 5000 pixels.');
        }

        if ($padding < 0 || $padding > 1000) {
            throw new \InvalidArgumentException('Padding must be between 0 and 1000 pixels.');
        }

        if (!\in_array($format, ['jpg', 'png', 'webp'], true)) {
            throw new \InvalidArgumentException('Format must be one of: jpg, png, webp.');
        }
    }

    private function isUsableCacheFile(string $path): bool
    {
        if (!is_file($path) || !is_readable($path)) {
            return false;
        }

        $size = @filesize($path);

        return is_int($size) && $size > 0;
    }
}
