<?php

namespace App\Tests\Service\Banner;

use App\Entity\Assets\Assets;
use App\Service\Banner\BannerCompositionService;
use App\Service\Banner\BannerLayoutCatalog;
use App\Service\Banner\BannerPlacementEngine;
use App\Service\Banner\ProductCutoutService;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;
use Psr\Log\NullLogger;
use Symfony\Component\Filesystem\Filesystem;

final class BannerCompositionServiceTest extends TestCase
{
    private string $backgroundPath;

    protected function setUp(): void
    {
        if (!class_exists(\Imagick::class) || \Imagick::queryFormats('WEBP') === []) {
            $this->markTestSkipped('Imagick with WebP support is required.');
        }

        $this->backgroundPath = dirname(__DIR__, 3)
            . '/assets/images/banner-composition/rainbow-stone-surface.jpg';
    }

    #[DataProvider('layoutProvider')]
    public function testRendersExpectedDimensionsAndPreservesTextArea(string $layoutName): void
    {
        $prototype = $this->productImage();
        $extractor = $this->createMock(ProductCutoutService::class);
        $extractor
            ->expects($this->exactly(3))
            ->method('extract')
            ->willReturnCallback(static fn (): \Imagick => clone $prototype);

        $service = new BannerCompositionService(
            new Filesystem(),
            $extractor,
            new BannerLayoutCatalog(),
            new BannerPlacementEngine(),
            new NullLogger(),
            $this->backgroundPath
        );

        $output = new \Imagick();
        $background = null;

        try {
            $output->readImageBlob($service->render($this->assets(3), $layoutName, 'webp', 7755));
            $layout = (new BannerLayoutCatalog())->get($layoutName);
            $this->assertSame($layout->width, $output->getImageWidth());
            $this->assertSame($layout->height, $output->getImageHeight());

            $background = $this->preparedBackground($layoutName);
            $samplePoints = $layoutName === BannerLayoutCatalog::DESKTOP
                ? [[1300, 100], [1600, 300], [1850, 550]]
                : [[100, 100], [540, 300], [980, 500]];

            foreach ($samplePoints as [$x, $y]) {
                $this->assertPixelsApproximatelyEqual($background, $output, $x, $y);
            }
        } finally {
            $prototype->clear();
            $background?->clear();
            $output->clear();
        }
    }

    public static function layoutProvider(): iterable
    {
        yield 'desktop' => [BannerLayoutCatalog::DESKTOP];
        yield 'mobile' => [BannerLayoutCatalog::MOBILE];
    }

    public function testReflectionIsCompressedAndFadesAwayFromTheContactPoint(): void
    {
        $service = (new \ReflectionClass(BannerCompositionService::class))->newInstanceWithoutConstructor();
        $method = new \ReflectionMethod(BannerCompositionService::class, 'createReflection');
        $method->setAccessible(true);
        $bottle = new \Imagick();
        $bottle->newImage(60, 200, new \ImagickPixel('rgba(255,0,0,1)'), 'png');
        $reflection = null;

        try {
            $reflection = $method->invoke($service, $bottle, 30);
            $this->assertInstanceOf(\Imagick::class, $reflection);
            $this->assertSame(24, $reflection->getImageHeight());
            $nearContact = $reflection->getImagePixelColor(30, 0)->getColor(true)['a'];
            $farFromContact = $reflection->getImagePixelColor(30, 23)->getColor(true)['a'];
            $this->assertGreaterThan($farFromContact, $nearContact);
            $this->assertLessThanOrEqual(0.20, $nearContact);
            $this->assertLessThan(0.02, $farFromContact);
        } finally {
            $reflection?->clear();
            $bottle->clear();
        }
    }

    public function testJpegEncoderProducesAnOpaqueJpeg(): void
    {
        $service = (new \ReflectionClass(BannerCompositionService::class))->newInstanceWithoutConstructor();
        $method = new \ReflectionMethod(BannerCompositionService::class, 'encode');
        $method->setAccessible(true);
        $canvas = new \Imagick();
        $canvas->newImage(40, 30, new \ImagickPixel('#d7dde0'), 'png');
        $decoded = new \Imagick();

        try {
            $decoded->readImageBlob($method->invoke($service, $canvas, 'jpg'));
            $this->assertSame('JPEG', $decoded->getImageFormat());
            $this->assertSame(40, $decoded->getImageWidth());
            $this->assertSame(30, $decoded->getImageHeight());
        } finally {
            $decoded->clear();
            $canvas->clear();
        }
    }

    private function productImage(): \Imagick
    {
        $image = new \Imagick();
        $image->newImage(120, 320, new \ImagickPixel('transparent'), 'png');
        $draw = new \ImagickDraw();

        try {
            $draw->setFillColor(new \ImagickPixel('#f20a72'));
            $draw->roundRectangle(18, 90, 102, 315, 16, 16);
            $draw->setFillColor(new \ImagickPixel('#f4f2ec'));
            $draw->roundRectangle(32, 4, 88, 115, 8, 8);
            $image->drawImage($draw);
        } finally {
            $draw->clear();
        }

        return $image;
    }

    /** @return list<Assets> */
    private function assets(int $count): array
    {
        $assets = [];

        for ($id = 1; $id <= $count; ++$id) {
            $asset = new Assets();
            $asset->setFilePath('/not-read-because-extractor-is-mocked-' . $id . '.jpg');
            $reflection = new \ReflectionProperty($asset, 'id');
            $reflection->setValue($asset, $id);
            $assets[] = $asset;
        }

        return $assets;
    }

    private function preparedBackground(string $layoutName): \Imagick
    {
        $layout = (new BannerLayoutCatalog())->get($layoutName);
        $image = new \Imagick($this->backgroundPath);

        if ($layout->sourceCrop !== null) {
            $crop = $layout->sourceCrop;
            $image->cropImage($crop['width'], $crop['height'], $crop['x'], $crop['y']);
            $image->setImagePage(0, 0, 0, 0);
        }

        $image->cropThumbnailImage($layout->width, $layout->height);

        return $image;
    }

    private function assertPixelsApproximatelyEqual(\Imagick $expected, \Imagick $actual, int $x, int $y): void
    {
        $expectedColor = $expected->getImagePixelColor($x, $y)->getColor(true);
        $actualColor = $actual->getImagePixelColor($x, $y)->getColor(true);

        foreach (['r', 'g', 'b'] as $channel) {
            $this->assertEqualsWithDelta($expectedColor[$channel], $actualColor[$channel], 0.04);
        }
    }
}
