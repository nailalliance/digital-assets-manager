<?php

namespace App\Tests\Controller;

use App\Controller\PublicDownloadListController;
use App\Entity\Assets\Assets;
use App\Entity\Downloads\Lists;
use App\Entity\Downloads\OneTimeLinks;
use App\Service\ImageProcessorService;
use App\Service\PermalinkImageCacheService;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Lock\LockFactory;
use Symfony\Component\Lock\Store\InMemoryStore;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

class PublicDownloadListControllerTest extends TestCase
{
    private Filesystem $filesystem;
    private string $tempDir;

    protected function setUp(): void
    {
        $this->filesystem = new Filesystem();
        $this->tempDir = sys_get_temp_dir() . '/public-download-list-controller-test-' . bin2hex(random_bytes(8));
        $this->filesystem->mkdir($this->tempDir);
    }

    protected function tearDown(): void
    {
        $this->filesystem->remove($this->tempDir);
    }

    public function testPublicImageGeneratesOnceAndReusesCacheAcrossTokens(): void
    {
        $asset = $this->createAsset(42, $this->createSourceFile('source-image'));
        $controller = new TestablePublicDownloadListController(false);
        $cacheImageProcessor = $this->createMock(ImageProcessorService::class);
        $cacheImageProcessor
            ->expects($this->once())
            ->method('exportFile')
            ->with($asset->getFilePath(), 1000, 1000, 25, 'jpg', false, null)
            ->willReturn('cached-public-image');
        $fallbackImageProcessor = $this->createMock(ImageProcessorService::class);
        $fallbackImageProcessor->expects($this->never())->method('exportFile');

        $cacheService = new PermalinkImageCacheService(
            new Filesystem(),
            $cacheImageProcessor,
            new LockFactory(new InMemoryStore()),
            $this->tempDir . '/cache',
            'v1'
        );

        $firstResponse = $controller->publicImage(
            $this->createShareLink('token-one', $asset, '+30 days'),
            $asset,
            $cacheService,
            $fallbackImageProcessor,
            1000,
            1000,
            25,
            false,
            null,
            'sample-name',
            'jpg'
        );

        $secondResponse = $controller->publicImage(
            $this->createShareLink('token-two', $asset, '+30 days'),
            $asset,
            $cacheService,
            $fallbackImageProcessor,
            1000,
            1000,
            25,
            false,
            null,
            'sample-name',
            'jpg'
        );

        $this->assertInstanceOf(BinaryFileResponse::class, $firstResponse);
        $this->assertInstanceOf(BinaryFileResponse::class, $secondResponse);
        $this->assertSame(
            $firstResponse->getFile()->getPathname(),
            $secondResponse->getFile()->getPathname()
        );
        $this->assertSame('cached-public-image', file_get_contents($firstResponse->getFile()->getPathname()));
        $this->assertSame('image/jpeg', $firstResponse->headers->get('Content-Type'));
        $cacheControl = (string) $firstResponse->headers->get('Cache-Control');
        $this->assertStringContainsString('private', $cacheControl);
        $this->assertStringContainsString('no-store', $cacheControl);
        $this->assertStringContainsString('max-age=0', $cacheControl);
        $this->assertStringContainsString('must-revalidate', $cacheControl);
        $this->assertStringContainsString('sample-name.jpg', (string) $firstResponse->headers->get('Content-Disposition'));
    }

    public function testPublicImageRejectsExpiredLinksBeforeUsingCache(): void
    {
        $asset = $this->createAsset(77, $this->createSourceFile('source-image'));
        $controller = new TestablePublicDownloadListController(false);
        $cacheImageProcessor = $this->createMock(ImageProcessorService::class);
        $cacheImageProcessor->expects($this->never())->method('exportFile');
        $fallbackImageProcessor = $this->createMock(ImageProcessorService::class);
        $fallbackImageProcessor->expects($this->never())->method('exportFile');
        $cacheService = new PermalinkImageCacheService(
            new Filesystem(),
            $cacheImageProcessor,
            new LockFactory(new InMemoryStore()),
            $this->tempDir . '/cache',
            'v1'
        );

        $this->createCachedVariantFile(77, 1200, 800, 0, 'png');

        $this->expectException(NotFoundHttpException::class);
        $this->expectExceptionMessage('This link has expired.');

        $controller->publicImage(
            $this->createShareLink('expired-token', $asset, '-1 day'),
            $asset,
            $cacheService,
            $fallbackImageProcessor,
            1200,
            800,
            0,
            false,
            null,
            'expired',
            'png'
        );
    }

    public function testPublicImageRejectsAssetsOutsideTheShareBeforeUsingCache(): void
    {
        $asset = $this->createAsset(88, $this->createSourceFile('source-image'));
        $controller = new TestablePublicDownloadListController(true);
        $cacheImageProcessor = $this->createMock(ImageProcessorService::class);
        $cacheImageProcessor->expects($this->never())->method('exportFile');
        $fallbackImageProcessor = $this->createMock(ImageProcessorService::class);
        $fallbackImageProcessor->expects($this->never())->method('exportFile');
        $cacheService = new PermalinkImageCacheService(
            new Filesystem(),
            $cacheImageProcessor,
            new LockFactory(new InMemoryStore()),
            $this->tempDir . '/cache',
            'v1'
        );

        $shareLink = new OneTimeLinks();
        $shareLink->setToken('token-without-asset');
        $shareLink->setExpirationDate(new \DateTimeImmutable('+30 days', new \DateTimeZone('UTC')));
        $shareLink->setDownloadList(new Lists());

        $this->createCachedVariantFile(88, 900, 900, 10, 'webp');

        $this->expectException(AccessDeniedException::class);
        $this->expectExceptionMessage('This asset is not part of this share link.');

        $controller->publicImage(
            $shareLink,
            $asset,
            $cacheService,
            $fallbackImageProcessor,
            900,
            900,
            10,
            false,
            null,
            'unauthorized',
            'webp'
        );
    }

    public function testPublicImageFallsBackToDirectGenerationWhenCacheWriteFails(): void
    {
        $asset = $this->createAsset(99, $this->createSourceFile('source-image'));
        $controller = new TestablePublicDownloadListController(false);
        $blockingPath = $this->tempDir . '/cache-blocker';
        file_put_contents($blockingPath, 'not-a-directory');

        $cacheImageProcessor = $this->createMock(ImageProcessorService::class);
        $cacheImageProcessor->expects($this->never())->method('exportFile');

        $fallbackImageProcessor = $this->createMock(ImageProcessorService::class);
        $fallbackImageProcessor
            ->expects($this->once())
            ->method('exportFile')
            ->with($asset->getFilePath(), 1500, 1500, 100, 'webp', false, null)
            ->willReturn('fallback-image-binary');

        $cacheService = new PermalinkImageCacheService(
            new Filesystem(),
            $cacheImageProcessor,
            new LockFactory(new InMemoryStore()),
            $blockingPath,
            'v1'
        );

        $response = $controller->publicImage(
            $this->createShareLink('token-fallback', $asset, '+30 days'),
            $asset,
            $cacheService,
            $fallbackImageProcessor,
            1500,
            1500,
            100,
            false,
            null,
            '22399-GEL-WIRELESS-Sanding-Bits-CeramicLargeBarrelBitRoundTop',
            'webp'
        );

        $this->assertSame('fallback-image-binary', $response->getContent());
        $this->assertSame('image/webp', $response->headers->get('Content-Type'));
        $this->assertStringContainsString(
            '22399-GEL-WIRELESS-Sanding-Bits-CeramicLargeBarrelBitRoundTop.webp',
            (string) $response->headers->get('Content-Disposition')
        );
    }

    public function testPublicImageUsesLargestClipPathVariantWhenRequested(): void
    {
        $asset = $this->createAsset(123, $this->createSourceFile('source-image'));
        $controller = new TestablePublicDownloadListController(false);
        $cacheImageProcessor = $this->createMock(ImageProcessorService::class);
        $cacheImageProcessor
            ->expects($this->once())
            ->method('exportFile')
            ->with($asset->getFilePath(), 1100, 900, 30, 'png', true, null)
            ->willReturn('largest-clip-path-image');
        $fallbackImageProcessor = $this->createMock(ImageProcessorService::class);
        $fallbackImageProcessor->expects($this->never())->method('exportFile');

        $cacheService = new PermalinkImageCacheService(
            new Filesystem(),
            $cacheImageProcessor,
            new LockFactory(new InMemoryStore()),
            $this->tempDir . '/cache',
            'v1'
        );

        $response = $controller->publicImage(
            $this->createShareLink('token-clip-path', $asset, '+30 days'),
            $asset,
            $cacheService,
            $fallbackImageProcessor,
            1100,
            900,
            30,
            true,
            null,
            'clipped',
            'png'
        );

        $this->assertInstanceOf(BinaryFileResponse::class, $response);
        $this->assertStringEndsWith(
            '/123/1100x900-p30-lcpv7-v1.png',
            $response->getFile()->getPathname()
        );
        $this->assertSame('largest-clip-path-image', file_get_contents($response->getFile()->getPathname()));
        $this->assertSame('image/png', $response->headers->get('Content-Type'));
    }

    public function testPublicImageUsesSpecificClipPathIndexWhenRequested(): void
    {
        $asset = $this->createAsset(124, $this->createSourceFile('source-image'));
        $controller = new TestablePublicDownloadListController(false);
        $cacheImageProcessor = $this->createMock(ImageProcessorService::class);
        $cacheImageProcessor
            ->expects($this->once())
            ->method('exportFile')
            ->with($asset->getFilePath(), 1000, 1000, 20, 'jpg', true, 3)
            ->willReturn('indexed-clip-path-image');
        $fallbackImageProcessor = $this->createMock(ImageProcessorService::class);
        $fallbackImageProcessor->expects($this->never())->method('exportFile');

        $cacheService = new PermalinkImageCacheService(
            new Filesystem(),
            $cacheImageProcessor,
            new LockFactory(new InMemoryStore()),
            $this->tempDir . '/cache',
            'v1'
        );

        $response = $controller->publicImage(
            $this->createShareLink('token-clip-path-index', $asset, '+30 days'),
            $asset,
            $cacheService,
            $fallbackImageProcessor,
            1000,
            1000,
            20,
            true,
            3,
            'clipped-indexed',
            'jpg'
        );

        $this->assertInstanceOf(BinaryFileResponse::class, $response);
        $this->assertStringEndsWith(
            '/124/1000x1000-p20-cp3-lcpv7-v1.jpg',
            $response->getFile()->getPathname()
        );
    }

    public function testPublicImageDebugClipPathsRejectsImagesWithoutClipPaths(): void
    {
        if (!class_exists(\Imagick::class)) {
            $this->markTestSkipped('Imagick is required for this test.');
        }

        $image = new \Imagick();
        $image->newImage(20, 20, new \ImagickPixel('white'), 'png');
        $sourcePath = $this->tempDir . '/no-clip-paths.png';
        $image->writeImage($sourcePath);
        $image->clear();

        $asset = $this->createAsset(125, $sourcePath);
        $controller = new TestablePublicDownloadListController(false);
        $cacheImageProcessor = $this->createMock(ImageProcessorService::class);
        $cacheImageProcessor->expects($this->never())->method('exportFile');
        $fallbackImageProcessor = $this->createMock(ImageProcessorService::class);
        $fallbackImageProcessor->expects($this->never())->method('exportFile');
        $cacheService = new PermalinkImageCacheService(
            new Filesystem(),
            $cacheImageProcessor,
            new LockFactory(new InMemoryStore()),
            $this->tempDir . '/cache',
            'v1'
        );

        $this->expectException(NotFoundHttpException::class);
        $this->expectExceptionMessage('No clip paths found on this image.');

        $controller->publicImage(
            $this->createShareLink('token-debug-clip-paths', $asset, '+30 days'),
            $asset,
            $cacheService,
            $fallbackImageProcessor,
            600,
            600,
            0,
            false,
            null,
            'debug',
            'png',
            true
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

    private function createShareLink(string $token, Assets $asset, string $expiration): OneTimeLinks
    {
        $list = new Lists();
        $list->addAsset($asset);

        $oneTimeLink = new OneTimeLinks();
        $oneTimeLink->setToken($token);
        $oneTimeLink->setDownloadList($list);
        $oneTimeLink->setExpirationDate(new \DateTimeImmutable($expiration, new \DateTimeZone('UTC')));

        return $oneTimeLink;
    }

    private function createSourceFile(string $contents): string
    {
        $path = $this->tempDir . '/source-' . bin2hex(random_bytes(8));
        file_put_contents($path, $contents);

        return $path;
    }

    private function createCachedVariantFile(int $assetId, int $width, int $height, int $padding, string $format): string
    {
        $path = sprintf(
            '%s/cache/%d/%dx%d-p%d-v1.%s',
            $this->tempDir,
            $assetId,
            $width,
            $height,
            $padding,
            $format
        );

        $this->filesystem->mkdir(\dirname($path));
        file_put_contents($path, 'existing-cache');

        return $path;
    }
}

final class TestablePublicDownloadListController extends PublicDownloadListController
{
    public function __construct(private readonly bool $isGrantedResult)
    {
    }

    protected function isGranted(mixed $attribute, mixed $subject = null): bool
    {
        return $this->isGrantedResult;
    }
}
