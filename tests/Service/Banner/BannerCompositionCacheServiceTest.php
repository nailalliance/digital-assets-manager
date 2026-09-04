<?php

namespace App\Tests\Service\Banner;

use App\Entity\Assets\Assets;
use App\Service\Banner\BannerCompositionCacheService;
use App\Service\Banner\BannerCompositionService;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Lock\LockFactory;
use Symfony\Component\Lock\Store\InMemoryStore;

final class BannerCompositionCacheServiceTest extends TestCase
{
    private Filesystem $filesystem;
    private string $temporaryDirectory;

    protected function setUp(): void
    {
        $this->filesystem = new Filesystem();
        $this->temporaryDirectory = sys_get_temp_dir() . '/banner-cache-test-' . bin2hex(random_bytes(8));
        $this->filesystem->mkdir($this->temporaryDirectory);
    }

    protected function tearDown(): void
    {
        $this->filesystem->remove($this->temporaryDirectory);
    }

    public function testIdenticalRequestReusesTheCachedRender(): void
    {
        $asset = $this->asset(73);
        $renderer = $this->createMock(BannerCompositionService::class);
        $renderer->method('backgroundFingerprint')->willReturn([
            'path' => 'surface.jpg',
            'size' => 100,
            'mtime' => 200,
            'renderer' => 'v1',
        ]);
        $renderer
            ->expects($this->once())
            ->method('render')
            ->with([$asset], 'desktop', 'webp', 99)
            ->willReturn('rendered-webp');

        $cache = new BannerCompositionCacheService(
            $this->filesystem,
            $renderer,
            new LockFactory(new InMemoryStore()),
            $this->temporaryDirectory
        );

        $first = $cache->getOrCreate([$asset], 'desktop', 'webp', 99);
        $second = $cache->getOrCreate([$asset], 'desktop', 'webp', 99);

        $this->assertFalse($first->cacheHit);
        $this->assertTrue($second->cacheHit);
        $this->assertSame($first->path, $second->path);
        $this->assertSame($first->etag, $second->etag);
        $this->assertSame('rendered-webp', file_get_contents($first->path));
    }

    public function testSeedChangesTheCacheKey(): void
    {
        $asset = $this->asset(84);
        $renderer = $this->createMock(BannerCompositionService::class);
        $renderer->method('backgroundFingerprint')->willReturn([
            'path' => 'surface.jpg',
            'size' => 100,
            'mtime' => 200,
            'renderer' => 'v1',
        ]);
        $renderer->method('render')->willReturn('rendered-webp');

        $cache = new BannerCompositionCacheService(
            $this->filesystem,
            $renderer,
            new LockFactory(new InMemoryStore()),
            $this->temporaryDirectory
        );

        $first = $cache->getOrCreate([$asset], 'desktop', 'webp', 1);
        $second = $cache->getOrCreate([$asset], 'desktop', 'webp', 2);

        $this->assertNotSame($first->path, $second->path);
        $this->assertNotSame($first->etag, $second->etag);
    }

    private function asset(int $id): Assets
    {
        $path = $this->temporaryDirectory . '/source-' . $id . '.jpg';
        $this->filesystem->dumpFile($path, 'source');
        $asset = new Assets();
        $asset->setFilePath($path);
        $reflection = new \ReflectionProperty($asset, 'id');
        $reflection->setValue($asset, $id);

        return $asset;
    }
}
