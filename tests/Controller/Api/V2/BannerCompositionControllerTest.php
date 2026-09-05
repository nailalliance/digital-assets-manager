<?php

namespace App\Tests\Controller\Api\V2;

use App\Controller\Api\V2\BannerCompositionController;
use App\Entity\Assets\Assets;
use App\Entity\User;
use App\Repository\Assets\AssetsRepository;
use App\Service\Banner\BannerCacheEntry;
use App\Service\Banner\BannerCompositionCacheService;
use App\Service\Banner\BannerLayoutCatalog;
use PHPUnit\Framework\Attributes\DataProvider;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Symfony\Bundle\FrameworkBundle\Test\TestBrowserToken;
use Symfony\Component\HttpFoundation\Request;

final class BannerCompositionControllerTest extends KernelTestCase
{
    protected function tearDown(): void
    {
        if (self::$booted) {
            static::getContainer()->get('security.untracked_token_storage')->setToken(null);
        }

        parent::tearDown();
    }

    public function testRejectsDuplicateAssetIds(): void
    {
        $response = $this->controller()->create(
            $this->request(['asset_ids' => [4, 4], 'layout' => 'desktop']),
            $this->createMock(AssetsRepository::class),
            new BannerLayoutCatalog(),
            $this->createMock(BannerCompositionCacheService::class)
        );

        $this->assertSame(400, $response->getStatusCode());
        $this->assertStringContainsString('must not contain duplicates', (string) $response->getContent());
    }

    #[DataProvider('invalidOpenGraphPayloadProvider')]
    public function testRejectsInvalidOpenGraphPayloads(array $payload, string $expectedMessage): void
    {
        $response = $this->controller()->create(
            $this->request($payload),
            $this->createMock(AssetsRepository::class),
            new BannerLayoutCatalog(),
            $this->createMock(BannerCompositionCacheService::class)
        );

        $this->assertSame(400, $response->getStatusCode());
        $this->assertStringContainsString($expectedMessage, (string) $response->getContent());
    }

    /** @return iterable<string, array{0: array<string, mixed>, 1: string}> */
    public static function invalidOpenGraphPayloadProvider(): iterable
    {
        yield 'empty assets' => [
            ['asset_ids' => [], 'layout' => 'og', 'format' => 'webp', 'page_title' => 'Campaign'],
            'between 1 and 12',
        ];
        yield 'one asset' => [
            ['asset_ids' => [4], 'layout' => 'og', 'format' => 'webp', 'page_title' => 'Campaign'],
            'between 2 and 12',
        ];
        yield 'too many assets' => [
            ['asset_ids' => range(1, 13), 'layout' => 'og', 'format' => 'webp', 'page_title' => 'Campaign'],
            'between 1 and 12',
        ];
        yield 'non-integer asset' => [
            ['asset_ids' => [4, '5'], 'layout' => 'og', 'format' => 'webp', 'page_title' => 'Campaign'],
            'positive integer',
        ];
        yield 'duplicate asset' => [
            ['asset_ids' => [4, 4], 'layout' => 'og', 'format' => 'webp', 'page_title' => 'Campaign'],
            'must not contain duplicates',
        ];
        yield 'unknown layout' => [
            ['asset_ids' => [4, 5], 'layout' => 'social', 'format' => 'webp', 'page_title' => 'Campaign'],
            'desktop, mobile, or og',
        ];
        yield 'unsupported format' => [
            ['asset_ids' => [4, 5], 'layout' => 'og', 'format' => 'png', 'page_title' => 'Campaign'],
            'webp or jpg',
        ];
        yield 'missing page title' => [
            ['asset_ids' => [4, 5], 'layout' => 'og', 'format' => 'webp'],
            'page_title is required',
        ];
        yield 'empty page title' => [
            ['asset_ids' => [4, 5], 'layout' => 'og', 'format' => 'webp', 'page_title' => '   '],
            'page_title is required',
        ];
    }

    public function testReportsMissingAssetsBeforeRendering(): void
    {
        $repository = $this->createMock(AssetsRepository::class);
        $repository->method('findBy')->willReturn([]);
        $cache = $this->createMock(BannerCompositionCacheService::class);
        $cache->expects($this->never())->method('getOrCreate');

        $response = $this->controller()->create(
            $this->request(['asset_ids' => [91], 'layout' => 'mobile']),
            $repository,
            new BannerLayoutCatalog(),
            $cache
        );

        $this->assertSame(404, $response->getStatusCode());
        $this->assertStringContainsString('91', (string) $response->getContent());
    }

    public function testReturnsInlineImageWithSeedCacheAndEtagHeaders(): void
    {
        $this->authenticateAdministrator();
        $this->assertTrue(static::getContainer()->get('security.authorization_checker')->isGranted('ROLE_FTP_ADMIN'));
        $asset = $this->asset(61);
        $this->assertTrue(static::getContainer()->get('security.authorization_checker')->isGranted('ASSET_VIEW', $asset));
        $repository = $this->createMock(AssetsRepository::class);
        $repository->method('findBy')->willReturn([$asset]);
        $path = tempnam(sys_get_temp_dir(), 'banner-controller-test-');
        file_put_contents($path, 'webp-binary');

        try {
            $cache = $this->createMock(BannerCompositionCacheService::class);
            $cache
                ->expects($this->once())
                ->method('getOrCreate')
                ->with([$asset], 'desktop', 'webp', 123)
                ->willReturn(new BannerCacheEntry($path, str_repeat('a', 64), 123, false));

            $response = $this->controller()->create(
                $this->request([
                    'asset_ids' => [61],
                    'layout' => 'desktop',
                    'format' => 'webp',
                    'seed' => 123,
                ]),
                $repository,
                new BannerLayoutCatalog(),
                $cache
            );

            $this->assertSame(200, $response->getStatusCode());
            $this->assertSame('image/webp', $response->headers->get('Content-Type'));
            $this->assertSame('123', $response->headers->get('X-Banner-Seed'));
            $this->assertSame('MISS', $response->headers->get('X-Banner-Cache'));
            $this->assertSame('"' . str_repeat('a', 64) . '"', $response->headers->get('ETag'));
            $this->assertStringStartsWith('inline;', (string) $response->headers->get('Content-Disposition'));
        } finally {
            @unlink($path);
        }
    }

    public function testOpenGraphRequestPreservesAssetOrderAndReturnsWebpResponse(): void
    {
        $this->authenticateAdministrator();
        $first = $this->asset(50062);
        $second = $this->asset(70018);
        $repository = $this->createMock(AssetsRepository::class);
        // Doctrine does not guarantee IN-query order; the controller must map
        // records back to the exact request order before invoking the renderer.
        $repository->method('findBy')->willReturn([$second, $first]);
        $path = tempnam(sys_get_temp_dir(), 'banner-controller-og-test-');
        file_put_contents($path, 'RIFF0000WEBP');

        try {
            $cache = $this->createMock(BannerCompositionCacheService::class);
            $cache
                ->expects($this->once())
                ->method('getOrCreate')
                ->with([$first, $second], 'og', 'webp', $this->isInt(), 'Your Color Plus Edit')
                ->willReturn(new BannerCacheEntry($path, str_repeat('b', 64), 456, false));

            $response = $this->controller()->create(
                $this->request([
                    'asset_ids' => [50062, 70018],
                    'layout' => 'og',
                    'format' => 'webp',
                    'page_title' => 'Your Color Plus Edit',
                ]),
                $repository,
                new BannerLayoutCatalog(),
                $cache
            );

            $this->assertSame(200, $response->getStatusCode());
            $this->assertSame('image/webp', $response->headers->get('Content-Type'));
            $this->assertStringContainsString(
                'filename=banner-og.webp',
                (string) $response->headers->get('Content-Disposition')
            );
        } finally {
            @unlink($path);
        }
    }

    private function controller(): BannerCompositionController
    {
        if (!self::$booted) {
            self::bootKernel();
        }
        $controller = new BannerCompositionController();
        $controller->setContainer(static::getContainer());

        return $controller;
    }

    /** @param array<string, mixed> $payload */
    private function request(array $payload): Request
    {
        return Request::create(
            '/api/v2/banner-compositions',
            'POST',
            server: ['CONTENT_TYPE' => 'application/json'],
            content: json_encode($payload, JSON_THROW_ON_ERROR)
        );
    }

    private function asset(int $id): Assets
    {
        $asset = new Assets();
        $asset->setFilePath('/tmp/product.jpg');
        $reflection = new \ReflectionProperty($asset, 'id');
        $reflection->setValue($asset, $id);

        return $asset;
    }

    private function authenticateAdministrator(): void
    {
        self::bootKernel();
        $user = (new User())
            ->setId(1)
            ->setMyNailAllianceId(1)
            ->setUsername('banner-api-test')
            ->setName('Banner API Test')
            ->setRoles(['ROLE_FTP_ADMIN']);

        static::getContainer()->get('security.untracked_token_storage')->setToken(
            new TestBrowserToken($user->getRoles(), $user, 'main')
        );
    }
}
