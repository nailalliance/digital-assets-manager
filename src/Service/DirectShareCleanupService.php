<?php

namespace App\Service;

use App\Entity\Downloads\OneTimeLinks;
use App\Tus\Cache\PerUploadFileStore;
use Carbon\Carbon;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

final class DirectShareCleanupService
{
    private readonly string $cacheDir;
    private readonly string $normalizedDirectUploadsDir;

    public function __construct(
        #[Autowire('%direct_uploads_dir%')]
        private readonly string $directUploadsDir,
    ) {
        $this->cacheDir = rtrim($this->directUploadsDir, DIRECTORY_SEPARATOR) . '/.tus-cache';
        $this->normalizedDirectUploadsDir = rtrim(str_replace('\\', '/', $this->directUploadsDir), '/');
    }

    /**
     * @return array{expiredUploads: int, deletedFiles: int, deletedCacheEntries: int}
     */
    public function cleanupExpiredTusUploads(bool $dryRun = false): array
    {
        $cache = $this->createCacheStore();
        $expiredUploads = 0;
        $deletedFiles = 0;
        $deletedCacheEntries = 0;

        foreach ($cache->keys() as $key) {
            $meta = $cache->get($key, true);
            if (!is_array($meta) || !$this->isExpiredTusMeta($meta)) {
                continue;
            }

            $expiredUploads++;

            $filePath = $meta['file_path'] ?? null;
            if (is_string($filePath) && $this->deleteFileIfPresent($filePath, $dryRun)) {
                $deletedFiles++;
            }

            if ($this->deleteCacheKeyIfPresent($cache, $key, $dryRun)) {
                $deletedCacheEntries++;
            }
        }

        return [
            'expiredUploads' => $expiredUploads,
            'deletedFiles' => $deletedFiles,
            'deletedCacheEntries' => $deletedCacheEntries,
        ];
    }

    /**
     * @return array{deletedFiles: int, deletedCacheEntries: int}
     */
    public function cleanupShareArtifacts(OneTimeLinks $oneTimeLink, bool $dryRun = false): array
    {
        $cache = $this->createCacheStore();
        $filePaths = [];
        $cacheKeys = [];

        foreach ($oneTimeLink->getTemporaryFiles() ?? [] as $temporaryFile) {
            if (!is_array($temporaryFile)) {
                continue;
            }

            $filePath = $temporaryFile['path'] ?? null;
            if (is_string($filePath) && $filePath !== '') {
                $filePaths[$filePath] = true;
            }

            $uploadKey = $temporaryFile['tusUploadKey'] ?? null;
            if (is_string($uploadKey) && $uploadKey !== '') {
                $cacheKeys[$uploadKey] = true;
            }
        }

        $primaryUploadKey = $oneTimeLink->getTusUploadKey();
        if (is_string($primaryUploadKey) && $primaryUploadKey !== '') {
            $cacheKeys[$primaryUploadKey] = true;
        }

        foreach (array_keys($cacheKeys) as $cacheKey) {
            $meta = $cache->get($cacheKey, true);
            if (!is_array($meta)) {
                continue;
            }

            $filePath = $meta['file_path'] ?? null;
            if (is_string($filePath) && $filePath !== '') {
                $filePaths[$filePath] = true;
            }
        }

        $shareToken = $oneTimeLink->getToken();
        if (is_string($shareToken) && $shareToken !== '') {
            foreach ($cache->keys() as $cacheKey) {
                $meta = $cache->get($cacheKey, true);
                if (!is_array($meta) || ($meta['metadata']['share_token'] ?? null) !== $shareToken) {
                    continue;
                }

                $cacheKeys[$cacheKey] = true;

                $filePath = $meta['file_path'] ?? null;
                if (is_string($filePath) && $filePath !== '') {
                    $filePaths[$filePath] = true;
                }
            }
        }

        $deletedFiles = 0;
        foreach (array_keys($filePaths) as $filePath) {
            if ($this->deleteFileIfPresent($filePath, $dryRun)) {
                $deletedFiles++;
            }
        }

        $deletedCacheEntries = 0;
        foreach (array_keys($cacheKeys) as $cacheKey) {
            if ($this->deleteCacheKeyIfPresent($cache, $cacheKey, $dryRun)) {
                $deletedCacheEntries++;
            }
        }

        return [
            'deletedFiles' => $deletedFiles,
            'deletedCacheEntries' => $deletedCacheEntries,
        ];
    }

    private function createCacheStore(): PerUploadFileStore
    {
        return new PerUploadFileStore($this->cacheDir);
    }

    /**
     * @param array<string, mixed> $meta
     */
    private function isExpiredTusMeta(array $meta): bool
    {
        if (!isset($meta['expires_at']) || !is_string($meta['expires_at']) || $meta['expires_at'] === '') {
            return true;
        }

        try {
            return Carbon::createFromFormat(PerUploadFileStore::RFC_7231, $meta['expires_at'])->lte(Carbon::now());
        } catch (\Throwable) {
            return true;
        }
    }

    private function deleteFileIfPresent(string $filePath, bool $dryRun): bool
    {
        if (!$this->isWithinDirectUploadsDir($filePath) || !is_file($filePath)) {
            return false;
        }

        if ($dryRun) {
            return true;
        }

        return @unlink($filePath);
    }

    private function deleteCacheKeyIfPresent(PerUploadFileStore $cache, string $cacheKey, bool $dryRun): bool
    {
        if (!is_array($cache->get($cacheKey, true))) {
            return false;
        }

        if ($dryRun) {
            return true;
        }

        return $cache->delete($cacheKey);
    }

    private function isWithinDirectUploadsDir(string $filePath): bool
    {
        $normalizedPath = str_replace('\\', '/', $filePath);

        return $normalizedPath === $this->normalizedDirectUploadsDir
            || str_starts_with($normalizedPath, $this->normalizedDirectUploadsDir . '/');
    }
}
