<?php

namespace App\Tests\Service\Banner;

use App\Service\Banner\Exception\BannerInputException;
use App\Service\Banner\Exception\MissingClippingPathException;
use App\Service\Banner\ProductCutoutService;
use App\Service\Image\ClippingPathExtractor;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Filesystem\Filesystem;

final class ProductCutoutServiceTest extends TestCase
{
    private Filesystem $filesystem;
    private string $temporaryDirectory;

    protected function setUp(): void
    {
        $this->filesystem = new Filesystem();
        $this->temporaryDirectory = sys_get_temp_dir() . '/product-cutout-test-' . bin2hex(random_bytes(8));
        $this->filesystem->mkdir($this->temporaryDirectory);
    }

    protected function tearDown(): void
    {
        $this->filesystem->remove($this->temporaryDirectory);
    }

    public function testRejectsNonJpegSources(): void
    {
        $path = $this->temporaryDirectory . '/product.txt';
        $this->filesystem->dumpFile($path, 'not an image');

        $this->expectException(BannerInputException::class);
        $this->expectExceptionMessage('must be a JPEG');
        $this->service()->extract($path, 44);
    }

    public function testRejectsJpegWithoutAClippingPath(): void
    {
        if (!class_exists(\Imagick::class)) {
            $this->markTestSkipped('Imagick is required.');
        }

        $path = $this->temporaryDirectory . '/product.jpg';
        $image = new \Imagick();
        $image->newImage(100, 200, new \ImagickPixel('white'), 'jpeg');
        $image->writeImage($path);
        $image->clear();

        $this->expectException(MissingClippingPathException::class);
        $this->expectExceptionMessage('Asset 45');
        $this->service()->extract($path, 45);
    }

    private function service(): ProductCutoutService
    {
        $projectDirectory = dirname(__DIR__, 3);

        return new ProductCutoutService(
            $this->filesystem,
            new ClippingPathExtractor(),
            $projectDirectory . '/config/color-icc/rgb/AdobeRGB1998.icc',
            $projectDirectory . '/config/color-icc/cmyk/USWebCoatedSWOP.icc'
        );
    }
}
