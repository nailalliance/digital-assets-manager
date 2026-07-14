<?php

namespace App\Tus\Cache;

use Carbon\Carbon;
use TusPhp\Cache\AbstractCache;

final class PerUploadFileStore extends AbstractCache
{
    public function __construct(
        private readonly string $cacheDir
    ) {
        $this->ensureCacheDirExists();
    }

    public function get(string $key, bool $withExpired = false)
    {
        $path = $this->getPath($key);
        if (!is_file($path)) {
            return null;
        }

        $contents = $this->readFile($path);
        if (!is_array($contents) || $contents === []) {
            return null;
        }

        if ($withExpired || $this->isValid($contents)) {
            return $contents;
        }

        return null;
    }

    public function set(string $key, $value)
    {
        $path = $this->getPath($key);
        $this->ensureCacheDirExists();

        return $this->withLock($path, LOCK_EX, 'c+b', function ($handle) use ($value) {
            $existing = $this->decodeStream($handle);

            if (!empty($existing) && is_array($value)) {
                $value = $value + $existing;
            }

            rewind($handle);
            ftruncate($handle, 0);

            return fwrite($handle, json_encode($value));
        });
    }

    public function delete(string $key): bool
    {
        $path = $this->getPath($key);

        return !file_exists($path) || unlink($path);
    }

    public function keys(): array
    {
        if (!is_dir($this->cacheDir)) {
            return [];
        }

        $keys = [];
        $files = scandir($this->cacheDir);
        if ($files === false) {
            return [];
        }

        foreach ($files as $file) {
            if (!str_ends_with($file, '.json')) {
                continue;
            }

            $key = $this->decodeKey(substr($file, 0, -5));
            if ($key !== null) {
                $keys[] = $key;
            }
        }

        return $keys;
    }

    private function ensureCacheDirExists(): void
    {
        if (is_dir($this->cacheDir)) {
            return;
        }

        if (!@mkdir($this->cacheDir, 0775, true) && !is_dir($this->cacheDir)) {
            throw new \RuntimeException(sprintf('Unable to create Tus cache directory: %s', $this->cacheDir));
        }
    }

    private function readFile(string $path): array|null
    {
        return $this->withLock($path, LOCK_SH, 'rb', function ($handle) {
            return $this->decodeStream($handle);
        });
    }

    private function decodeStream($handle): array
    {
        rewind($handle);
        $contents = stream_get_contents($handle);
        if ($contents === false || $contents === '') {
            return [];
        }

        $decoded = json_decode($contents, true);

        return is_array($decoded) ? $decoded : [];
    }

    private function withLock(string $path, int $lockType, string $mode, callable $callback)
    {
        $handle = @fopen($path, $mode);
        if ($handle === false) {
            throw new \RuntimeException(sprintf('Unable to open Tus cache file: %s', $path));
        }

        try {
            if (!flock($handle, $lockType)) {
                throw new \RuntimeException(sprintf('Unable to lock Tus cache file: %s', $path));
            }

            return $callback($handle);
        } finally {
            flock($handle, LOCK_UN);
            fclose($handle);
        }
    }

    private function isValid(array $meta): bool
    {
        if (empty($meta['expires_at'])) {
            return false;
        }

        try {
            $expiresAt = Carbon::createFromFormat(self::RFC_7231, $meta['expires_at']);
        } catch (\Throwable) {
            return false;
        }

        return Carbon::now()->lt($expiresAt);
    }

    private function getPath(string $key): string
    {
        $this->ensureCacheDirExists();

        return rtrim($this->cacheDir, DIRECTORY_SEPARATOR)
            . DIRECTORY_SEPARATOR
            . $this->encodeKey($this->getActualCacheKey($key))
            . '.json';
    }

    private function getActualCacheKey(string $key): string
    {
        $prefix = $this->getPrefix();

        if (!str_starts_with($key, $prefix)) {
            $key = $prefix . $key;
        }

        return $key;
    }

    private function encodeKey(string $key): string
    {
        return rtrim(strtr(base64_encode($key), '+/', '-_'), '=');
    }

    private function decodeKey(string $encodedKey): ?string
    {
        $decoded = base64_decode(
            strtr($encodedKey, '-_', '+/') . str_repeat('=', (4 - strlen($encodedKey) % 4) % 4),
            true
        );

        return $decoded === false ? null : $decoded;
    }
}
