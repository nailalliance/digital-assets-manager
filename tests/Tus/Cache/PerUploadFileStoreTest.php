<?php

namespace App\Tests\Tus\Cache;

use App\Tus\Cache\PerUploadFileStore;
use PHPUnit\Framework\TestCase;

final class PerUploadFileStoreTest extends TestCase
{
    private string $cacheDir;

    protected function setUp(): void
    {
        $this->cacheDir = sys_get_temp_dir() . '/per-upload-file-store-' . bin2hex(random_bytes(8));
    }

    protected function tearDown(): void
    {
        if (!is_dir($this->cacheDir)) {
            return;
        }

        $files = scandir($this->cacheDir);
        if ($files !== false) {
            foreach ($files as $file) {
                if ($file === '.' || $file === '..') {
                    continue;
                }

                @unlink($this->cacheDir . '/' . $file);
            }
        }

        @rmdir($this->cacheDir);
    }

    public function testItPreservesExistingMetadataWhenUpdatingOffset(): void
    {
        $store = new PerUploadFileStore($this->cacheDir);
        $expiresAt = gmdate('D, d M Y H:i:s \G\M\T', time() + 3600);

        $store->set('upload-1', [
            'name' => 'demo.bin',
            'offset' => 0,
            'size' => 1024,
            'expires_at' => $expiresAt,
        ]);

        $store->set('upload-1', ['offset' => 512]);

        self::assertSame([
            'offset' => 512,
            'name' => 'demo.bin',
            'size' => 1024,
            'expires_at' => $expiresAt,
        ], $store->get('upload-1'));
    }
}
