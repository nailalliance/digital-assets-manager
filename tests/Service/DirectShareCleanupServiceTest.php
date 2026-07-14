<?php

namespace App\Tests\Service;

use App\Entity\Downloads\OneTimeLinks;
use App\Service\DirectShareCleanupService;
use App\Tus\Cache\PerUploadFileStore;
use PHPUnit\Framework\TestCase;

final class DirectShareCleanupServiceTest extends TestCase
{
    private string $directUploadsDir;

    protected function setUp(): void
    {
        $this->directUploadsDir = sys_get_temp_dir() . '/direct-share-cleanup-' . bin2hex(random_bytes(6));
        mkdir($this->directUploadsDir . '/.tus-cache', 0777, true);
    }

    protected function tearDown(): void
    {
        $this->removeDirectory($this->directUploadsDir);
    }

    public function testCleanupExpiredTusUploadsRemovesOnlyExpiredEntries(): void
    {
        $service = new DirectShareCleanupService($this->directUploadsDir);
        $cache = new PerUploadFileStore($this->directUploadsDir . '/.tus-cache');

        $expiredPath = $this->directUploadsDir . '/expired.bin';
        $activePath = $this->directUploadsDir . '/active.bin';
        file_put_contents($expiredPath, 'expired');
        file_put_contents($activePath, 'active');

        $cache->set('expired-upload', [
            'file_path' => $expiredPath,
            'expires_at' => (new \DateTimeImmutable('-2 hours', new \DateTimeZone('UTC')))->format(PerUploadFileStore::RFC_7231),
        ]);
        $cache->set('active-upload', [
            'file_path' => $activePath,
            'expires_at' => (new \DateTimeImmutable('+2 hours', new \DateTimeZone('UTC')))->format(PerUploadFileStore::RFC_7231),
        ]);

        $report = $service->cleanupExpiredTusUploads();

        self::assertSame([
            'expiredUploads' => 1,
            'deletedFiles' => 1,
            'deletedCacheEntries' => 1,
        ], $report);
        self::assertFileDoesNotExist($expiredPath);
        self::assertNull($cache->get('expired-upload', true));
        self::assertFileExists($activePath);
        self::assertNotNull($cache->get('active-upload', true));
    }

    public function testCleanupShareArtifactsRemovesTrackedAndInProgressTusArtifacts(): void
    {
        $service = new DirectShareCleanupService($this->directUploadsDir);
        $cache = new PerUploadFileStore($this->directUploadsDir . '/.tus-cache');

        $completedPath = $this->directUploadsDir . '/completed.bin';
        $partialPath = $this->directUploadsDir . '/partial.bin';
        file_put_contents($completedPath, 'complete');
        file_put_contents($partialPath, 'partial');

        $cache->set('completed-upload', [
            'file_path' => $completedPath,
            'metadata' => ['share_token' => 'share-token'],
            'expires_at' => (new \DateTimeImmutable('+2 hours', new \DateTimeZone('UTC')))->format(PerUploadFileStore::RFC_7231),
        ]);
        $cache->set('partial-upload', [
            'file_path' => $partialPath,
            'metadata' => ['share_token' => 'share-token'],
            'expires_at' => (new \DateTimeImmutable('+2 hours', new \DateTimeZone('UTC')))->format(PerUploadFileStore::RFC_7231),
        ]);

        $oneTimeLink = new OneTimeLinks();
        $oneTimeLink->setToken('share-token');
        $oneTimeLink->setTusUploadKey('completed-upload');
        $oneTimeLink->setTemporaryFiles([
            [
                'path' => $completedPath,
                'originalName' => 'completed.bin',
                'tusUploadKey' => 'completed-upload',
            ],
        ]);

        $report = $service->cleanupShareArtifacts($oneTimeLink);

        self::assertSame([
            'deletedFiles' => 2,
            'deletedCacheEntries' => 2,
        ], $report);
        self::assertFileDoesNotExist($completedPath);
        self::assertFileDoesNotExist($partialPath);
        self::assertNull($cache->get('completed-upload', true));
        self::assertNull($cache->get('partial-upload', true));
    }

    private function removeDirectory(string $directory): void
    {
        if (!is_dir($directory)) {
            return;
        }

        $items = scandir($directory);
        if ($items === false) {
            return;
        }

        foreach ($items as $item) {
            if ($item === '.' || $item === '..') {
                continue;
            }

            $path = $directory . '/' . $item;
            if (is_dir($path)) {
                $this->removeDirectory($path);
                continue;
            }

            @unlink($path);
        }

        @rmdir($directory);
    }
}
