<?php

namespace App\Tests\Service;

use App\Entity\Assets\Assets;
use App\Service\ImageProcessorService;
use App\Service\PermalinkImageCacheService;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Lock\LockFactory;
use Symfony\Component\Lock\Store\InMemoryStore;

class PermalinkImageCacheServiceTest extends TestCase
{
    private Filesystem $filesystem;
    private string $tempDir;

    protected function setUp(): void
    {
        $this->filesystem = new Filesystem();
        $this->tempDir = sys_get_temp_dir() . '/permalink-cache-test-' . bin2hex(random_bytes(8));
        $this->filesystem->mkdir($this->tempDir);
    }

    protected function tearDown(): void
    {
        $this->filesystem->remove($this->tempDir);
    }

    public function testGetOrCreateGeneratesAndReusesCachedVariant(): void
    {
        $asset = $this->createAsset(123, $this->createSourceFile('source-image'));
        $imageProcessor = $this->createMock(ImageProcessorService::class);
        $imageProcessor
            ->expects($this->once())
            ->method('exportFile')
            ->with($asset->getFilePath(), 1200, 900, 40, 'jpg')
            ->willReturn('cached-image-binary');

        $service = $this->createService($imageProcessor);

        $firstPath = $service->getOrCreate($asset, 1200, 900, 40, 'jpg');
        $secondPath = $service->getOrCreate($asset, 1200, 900, 40, 'jpg');

        $this->assertSame($firstPath, $secondPath);
        $this->assertFileExists($firstPath);
        $this->assertSame('cached-image-binary', file_get_contents($firstPath));
    }

    public function testGetOrCreateCreatesSeparateFilesForDifferentVariants(): void
    {
        $asset = $this->createAsset(456, $this->createSourceFile('source-image'));
        $imageProcessor = $this->createMock(ImageProcessorService::class);
        $imageProcessor
            ->expects($this->exactly(3))
            ->method('exportFile')
            ->willReturnOnConsecutiveCalls('variant-one', 'variant-two', 'variant-three');

        $service = $this->createService($imageProcessor);

        $widthVariant = $service->getOrCreate($asset, 1000, 1000, 0, 'jpg');
        $paddingVariant = $service->getOrCreate($asset, 1000, 1000, 20, 'jpg');
        $formatVariant = $service->getOrCreate($asset, 1000, 1000, 0, 'webp');

        $this->assertNotSame($widthVariant, $paddingVariant);
        $this->assertNotSame($widthVariant, $formatVariant);
        $this->assertStringEndsWith('/456/1000x1000-p0-v1.jpg', $widthVariant);
        $this->assertStringEndsWith('/456/1000x1000-p20-v1.jpg', $paddingVariant);
        $this->assertStringEndsWith('/456/1000x1000-p0-v1.webp', $formatVariant);
    }

    public function testGetOrCreateRegeneratesZeroByteCacheFiles(): void
    {
        $asset = $this->createAsset(789, $this->createSourceFile('source-image'));
        $imageProcessor = $this->createMock(ImageProcessorService::class);
        $imageProcessor
            ->expects($this->once())
            ->method('exportFile')
            ->willReturn('regenerated-binary');

        $service = $this->createService($imageProcessor);
        $cachePath = $this->expectedCachePath(789, 800, 600, 0, 'png');
        $this->filesystem->mkdir(\dirname($cachePath));
        touch($cachePath);

        $resultPath = $service->getOrCreate($asset, 800, 600, 0, 'png');

        $this->assertSame($cachePath, $resultPath);
        $this->assertSame('regenerated-binary', file_get_contents($cachePath));
    }

    public function testGetOrCreateRegeneratesUnreadableCacheFiles(): void
    {
        $asset = $this->createAsset(987, $this->createSourceFile('source-image'));
        $imageProcessor = $this->createMock(ImageProcessorService::class);
        $imageProcessor
            ->expects($this->once())
            ->method('exportFile')
            ->willReturn('regenerated-binary');

        $service = $this->createService($imageProcessor);
        $cachePath = $this->expectedCachePath(987, 640, 640, 10, 'webp');
        $this->filesystem->mkdir(\dirname($cachePath));
        file_put_contents($cachePath, 'stale-binary');
        chmod($cachePath, 0000);

        try {
            $resultPath = $service->getOrCreate($asset, 640, 640, 10, 'webp');
        } finally {
            chmod($cachePath, 0644);
        }

        $this->assertSame($cachePath, $resultPath);
        $this->assertSame('regenerated-binary', file_get_contents($cachePath));
    }

    public function testGetOrCreateLeavesNoPartialFilesWhenGenerationFails(): void
    {
        $asset = $this->createAsset(654, $this->createSourceFile('source-image'));
        $imageProcessor = $this->createMock(ImageProcessorService::class);
        $imageProcessor
            ->expects($this->once())
            ->method('exportFile')
            ->willReturn(null);

        $service = $this->createService($imageProcessor);
        $cacheDir = $this->tempDir . '/654';
        $cachePath = $this->expectedCachePath(654, 500, 500, 5, 'jpg');

        $this->expectException(\RuntimeException::class);
        $this->expectExceptionMessage('Could not process image.');

        try {
            $service->getOrCreate($asset, 500, 500, 5, 'jpg');
        } finally {
            $this->assertFileDoesNotExist($cachePath);

            if (is_dir($cacheDir)) {
                $entries = array_values(array_diff(scandir($cacheDir) ?: [], ['.', '..']));
                $this->assertSame([], $entries);
            }
        }
    }

    public function testGetOrCreateRejectsInvalidVariants(): void
    {
        $asset = $this->createAsset(321, $this->createSourceFile('source-image'));
        $imageProcessor = $this->createMock(ImageProcessorService::class);
        $imageProcessor->expects($this->never())->method('exportFile');

        $service = $this->createService($imageProcessor);

        $this->expectException(\InvalidArgumentException::class);
        $service->getOrCreate($asset, 0, 100, 0, 'jpg');
    }

    private function createService(ImageProcessorService $imageProcessor): PermalinkImageCacheService
    {
        return new PermalinkImageCacheService(
            new Filesystem(),
            $imageProcessor,
            new LockFactory(new InMemoryStore()),
            $this->tempDir,
            'v1'
        );
    }

    private function createAsset(int $id, string $sourcePath): Assets
    {
        $asset = new Assets();
        $asset->setFilePath($sourcePath);

        $reflectionProperty = new \ReflectionProperty($asset, 'id');
        $reflectionProperty->setValue($asset, $id);

        return $asset;
    }

    private function createSourceFile(string $contents): string
    {
        $path = $this->tempDir . '/source-' . bin2hex(random_bytes(8));
        file_put_contents($path, $contents);

        return $path;
    }

    private function expectedCachePath(int $assetId, int $width, int $height, int $padding, string $format): string
    {
        return sprintf('%s/%d/%dx%d-p%d-v1.%s', $this->tempDir, $assetId, $width, $height, $padding, $format);
    }
}
