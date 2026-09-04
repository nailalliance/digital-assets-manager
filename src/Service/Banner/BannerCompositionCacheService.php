<?php

namespace App\Service\Banner;

use App\Entity\Assets\Assets;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\Filesystem\Exception\IOExceptionInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Lock\LockFactory;

class BannerCompositionCacheService
{
    private readonly string $cacheDirectory;

    public function __construct(
        private readonly Filesystem $filesystem,
        private readonly BannerCompositionService $compositionService,
        private readonly LockFactory $lockFactory,
        #[Autowire('%banner_cache_dir%')]
        string $cacheDirectory,
    ) {
        $this->cacheDirectory = rtrim($cacheDirectory, '/');
    }

    /**
     * @param list<Assets> $assets
     */
    public function getOrCreate(
        array $assets,
        string $layout,
        string $format,
        int $seed
    ): BannerCacheEntry {
        $fingerprint = $this->fingerprint($assets, $layout, $format, $seed);
        $etag = hash('sha256', json_encode($fingerprint, JSON_THROW_ON_ERROR));
        $cachePath = sprintf('%s/%s/%s.%s', $this->cacheDirectory, substr($etag, 0, 2), $etag, $format);

        if ($this->isUsableFile($cachePath)) {
            return new BannerCacheEntry($cachePath, $etag, $seed, true);
        }

        $cacheFolder = dirname($cachePath);
        try {
            $this->filesystem->mkdir($cacheFolder);
        } catch (IOExceptionInterface $exception) {
            throw new \RuntimeException('Could not prepare the banner cache directory.', previous: $exception);
        }

        $lock = $this->lockFactory->createLock('banner-composition:' . $etag);
        $lock->acquire(true);
        $temporaryPath = null;

        try {
            if ($this->isUsableFile($cachePath)) {
                return new BannerCacheEntry($cachePath, $etag, $seed, true);
            }

            $binary = $this->compositionService->render($assets, $layout, $format, $seed);
            if ($binary === '') {
                throw new \RuntimeException('Banner rendering returned an empty image.');
            }

            $temporaryPath = sprintf('%s/.tmp-%s.%s', $cacheFolder, bin2hex(random_bytes(16)), $format);
            $this->filesystem->dumpFile($temporaryPath, $binary);
            if (!$this->isUsableFile($temporaryPath)) {
                throw new \RuntimeException('The generated banner cache file is invalid.');
            }

            $this->filesystem->rename($temporaryPath, $cachePath, true);

            return new BannerCacheEntry($cachePath, $etag, $seed, false);
        } catch (IOExceptionInterface $exception) {
            throw new \RuntimeException('Could not write the banner cache file.', previous: $exception);
        } finally {
            if ($temporaryPath !== null && $this->filesystem->exists($temporaryPath)) {
                $this->filesystem->remove($temporaryPath);
            }
            $lock->release();
        }
    }

    /**
     * @param list<Assets> $assets
     * @return array<string, mixed>
     */
    private function fingerprint(array $assets, string $layout, string $format, int $seed): array
    {
        $assetFingerprints = [];

        foreach ($assets as $asset) {
            $path = $asset->getFilePath();
            $size = is_string($path) ? @filesize($path) : false;
            $mtime = is_string($path) ? @filemtime($path) : false;
            $assetFingerprints[] = [
                'id' => $asset->getId(),
                'size' => is_int($size) ? $size : 0,
                'mtime' => is_int($mtime) ? $mtime : 0,
            ];
        }

        return [
            'assets' => $assetFingerprints,
            'layout' => $layout,
            'format' => $format,
            'seed' => $seed,
            'background' => $this->compositionService->backgroundFingerprint(),
        ];
    }

    private function isUsableFile(string $path): bool
    {
        if (!is_file($path) || !is_readable($path)) {
            return false;
        }

        $size = @filesize($path);

        return is_int($size) && $size > 0;
    }
}
