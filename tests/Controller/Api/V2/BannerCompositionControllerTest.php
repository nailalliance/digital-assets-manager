<?php

namespace App\Tests\Controller\Api\V2;

use App\Controller\Api\V2\BannerCompositionController;
use App\Entity\Assets\Assets;
use App\Entity\User;
use App\Repository\Assets\AssetsRepository;
use App\Service\Banner\BannerCacheEntry;
use App\Service\Banner\BannerCompositionCacheService;
use App\Service\Banner\BannerLayoutCatalog;
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
