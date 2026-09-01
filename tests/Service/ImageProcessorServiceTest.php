<?php

namespace App\Tests\Service;

use App\Service\ImageProcessorService;
use PHPUnit\Framework\TestCase;
use Psr\Log\NullLogger;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Filesystem\Filesystem;

class ImageProcessorServiceTest extends TestCase
{
    public function testApplyLargestClipPathUsesOriginalSvgBlobShape(): void
    {
        if (!class_exists(\Imagick::class)) {
            $this->markTestSkipped('Imagick is required for this test.');
        }

        $service = $this->createService();
        $image = new \Imagick();
        $image->newImage(200, 200, new \ImagickPixel('white'), 'png');

        $draw = new \ImagickDraw();
        $draw->setFillColor(new \ImagickPixel('red'));
        $draw->rectangle(40, 40, 160, 160);
        $image->drawImage($draw);

        $image->setImageProperty(
            '8BIM:1999,2998:#0',
            '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="#000000"/><path d="M 50 50 L 150 50 L 150 150 L 50 150 Z" style="fill:#000000;stroke:none"/></svg>'
        );

        $method = new \ReflectionMethod(ImageProcessorService::class, 'applyLargestClipPathIfAvailable');
        $method->setAccessible(true);
        $method->invoke($service, $image);

        $outsidePixel = $image->getImagePixelColor(10, 10)->getColor(true);
        $insidePixel = $image->getImagePixelColor(100, 100)->getColor(true);

        $this->assertLessThan(0.1, $outsidePixel['a']);
        $this->assertGreaterThan(0.9, $outsidePixel['r']);
        $this->assertGreaterThan(0.9, $outsidePixel['g']);
        $this->assertGreaterThan(0.9, $outsidePixel['b']);
        $this->assertGreaterThan(0.9, $insidePixel['a']);

        $draw->clear();
        $image->clear();
    }

    public function testApplyLargestClipPathUsesLargestPathResource(): void
    {
        if (!class_exists(\Imagick::class)) {
            $this->markTestSkipped('Imagick is required for this test.');
        }

        $service = $this->createService();
        $image = new \Imagick();
        $image->newImage(240, 240, new \ImagickPixel('white'), 'png');

        $draw = new \ImagickDraw();
        $draw->setFillColor(new \ImagickPixel('rgb(255, 80, 120)'));
        $draw->rectangle(30, 30, 210, 210);
        $image->drawImage($draw);

        $image->setImageProperty(
            '8BIM:1999,2998:#0',
            '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240"><path d="M 70 40 L 170 40 L 170 200 L 70 200 Z" style="fill:#000000;stroke:none"/></svg>'
        );
        $image->setImageProperty(
            '8BIM:1999,2998:#1',
            '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240"><path d="M 30 30 L 210 30 L 210 210 L 30 210 Z" style="fill:#000000;stroke:none"/></svg>'
        );

        $method = new \ReflectionMethod(ImageProcessorService::class, 'applyLargestClipPathIfAvailable');
        $method->setAccessible(true);
        $method->invoke($service, $image);

        $largestOnlyPixel = $image->getImagePixelColor(45, 120)->getColor(true);
        $outsidePixel = $image->getImagePixelColor(10, 10)->getColor(true);

        $this->assertGreaterThan(0.9, $largestOnlyPixel['a']);
        $this->assertLessThan(0.1, $outsidePixel['a']);

        $draw->clear();
        $image->clear();
    }

    public function testApplyLargestClipPathUsesSpecificIndexWhenProvided(): void
    {
        if (!class_exists(\Imagick::class)) {
            $this->markTestSkipped('Imagick is required for this test.');
        }

        $service = $this->createService();
        $image = new \Imagick();
        $image->newImage(240, 240, new \ImagickPixel('white'), 'png');

        $draw = new \ImagickDraw();
        $draw->setFillColor(new \ImagickPixel('rgb(255, 80, 120)'));
        $draw->rectangle(30, 30, 210, 210);
        $image->drawImage($draw);

        $image->setImageProperty(
            '8BIM:1999,2998:#0',
            '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240"><path d="M 30 30 L 210 30 L 210 210 L 30 210 Z" style="fill:#000000;stroke:none"/></svg>'
        );
        $image->setImageProperty(
            '8BIM:1999,2998:#3',
            '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240"><path d="M 70 40 L 170 40 L 170 200 L 70 200 Z" style="fill:#000000;stroke:none"/></svg>'
        );

        $method = new \ReflectionMethod(ImageProcessorService::class, 'applyLargestClipPathIfAvailable');
        $method->setAccessible(true);
        $method->invoke($service, $image, 3);

        $forcedIndexOutsidePixel = $image->getImagePixelColor(45, 120)->getColor(true);
        $forcedIndexInsidePixel = $image->getImagePixelColor(120, 120)->getColor(true);

        $this->assertLessThan(0.1, $forcedIndexOutsidePixel['a']);
        $this->assertGreaterThan(0.9, $forcedIndexInsidePixel['a']);

        $draw->clear();
        $image->clear();
    }

    public function testApplyLargestClipPathIgnoresStrokeOnlyBoundsPaths(): void
    {
        if (!class_exists(\Imagick::class)) {
            $this->markTestSkipped('Imagick is required for this test.');
        }

        $service = $this->createService();
        $image = new \Imagick();
        $image->newImage(240, 240, new \ImagickPixel('white'), 'png');

        $draw = new \ImagickDraw();
        $draw->setFillColor(new \ImagickPixel('rgb(255, 80, 120)'));
        $draw->rectangle(30, 30, 210, 210);
        $image->drawImage($draw);

        $image->setImageProperty(
            '8BIM:1999,2998:#0',
            '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">'
            . '<path d="M 30 30 L 210 30 L 210 210 L 30 210 Z" style="fill:#000000;stroke:none"/>'
            . '<path d="M 0 0 L 239 0 L 239 239 L 0 239 Z" style="fill:none;stroke:#000000;stroke-width:1"/>'
            . '</svg>'
        );

        $method = new \ReflectionMethod(ImageProcessorService::class, 'applyLargestClipPathIfAvailable');
        $method->setAccessible(true);
        $method->invoke($service, $image);

        $outsidePixel = $image->getImagePixelColor(10, 10)->getColor(true);
        $insidePixel = $image->getImagePixelColor(120, 120)->getColor(true);

        $this->assertLessThan(0.1, $outsidePixel['a']);
        $this->assertGreaterThan(0.9, $insidePixel['a']);

        $draw->clear();
        $image->clear();
    }

    public function testClippedExportUsesWhiteCanvasBackground(): void
    {
        $service = $this->createService();
        $method = new \ReflectionMethod(ImageProcessorService::class, 'resolveCanvasBackgroundColor');
        $method->setAccessible(true);

        $this->assertSame('white', $method->invoke($service, null, true));
        $this->assertSame('white', $method->invoke($service, null, false));
        $this->assertSame('white', $method->invoke($service, 'legend', true));
    }

    public function testCropInsideMiddleCenterCropsLandscapeAndPortraitImages(): void
    {
        if (!class_exists(\Imagick::class)) {
            $this->markTestSkipped('Imagick is required for this test.');
        }

        $service = $this->createService();

        foreach ([[90, 60], [60, 90]] as [$sourceWidth, $sourceHeight]) {
            $sourcePath = $this->createQuadrantImage($sourceWidth, $sourceHeight);

            try {
                $insideBinary = $service->exportFile($sourcePath, 30, 30, 0, 'png');
                $croppedBinary = $service->exportFile($sourcePath, 30, 30, 0, 'png', false, null, true);

                $this->assertNotNull($insideBinary);
                $this->assertNotNull($croppedBinary);

                $inside = new \Imagick();
                $inside->readImageBlob($insideBinary);
                $cropped = new \Imagick();
                $cropped->readImageBlob($croppedBinary);

                $this->assertSame(30, $cropped->getImageWidth());
                $this->assertSame(30, $cropped->getImageHeight());

                if ($sourceWidth > $sourceHeight) {
                    $this->assertPixelIsWhite($inside, 15, 1);
                    $this->assertPixelIsMostly($cropped, 10, 5, 'red');
                    $this->assertPixelIsMostly($cropped, 20, 5, 'blue');
                } else {
                    $this->assertPixelIsWhite($inside, 1, 15);
                    $this->assertPixelIsMostly($cropped, 5, 10, 'red');
                    $this->assertPixelIsMostly($cropped, 5, 20, 'green');
                }

                $inside->clear();
                $cropped->clear();
            } finally {
                @unlink($sourcePath);
            }
        }
    }

    private function createService(): ImageProcessorService
    {
        return new ImageProcessorService(new Filesystem(), new NullLogger(), $this->createParameterBag());
    }

    private function createQuadrantImage(int $width, int $height): string
    {
        $image = new \Imagick();
        $image->newImage($width, $height, new \ImagickPixel('white'), 'png');
        $draw = new \ImagickDraw();
        $halfWidth = intdiv($width, 2);
        $halfHeight = intdiv($height, 2);

        foreach ([
            ['red', 0, 0, $halfWidth, $halfHeight],
            ['blue', $halfWidth, 0, $width, $halfHeight],
            ['lime', 0, $halfHeight, $halfWidth, $height],
            ['yellow', $halfWidth, $halfHeight, $width, $height],
        ] as [$color, $x1, $y1, $x2, $y2]) {
            $draw->setFillColor(new \ImagickPixel($color));
            $draw->rectangle($x1, $y1, $x2, $y2);
        }

        $image->drawImage($draw);
        $sourcePath = tempnam(sys_get_temp_dir(), 'crop-inside-middle-');
        $image->writeImage($sourcePath);
        $draw->clear();
        $image->clear();

        return $sourcePath;
    }

    private function assertPixelIsWhite(\Imagick $image, int $x, int $y): void
    {
        $color = $image->getImagePixelColor($x, $y)->getColor(true);

        $this->assertGreaterThan(0.9, $color['r']);
        $this->assertGreaterThan(0.9, $color['g']);
        $this->assertGreaterThan(0.9, $color['b']);
    }

    private function assertPixelIsMostly(\Imagick $image, int $x, int $y, string $expectedColor): void
    {
        $color = $image->getImagePixelColor($x, $y)->getColor(true);
        $channels = [
            'red' => ['r', 'g', 'b'],
            'green' => ['g', 'r', 'b'],
            'blue' => ['b', 'r', 'g'],
        ];
        [$dominant, $otherOne, $otherTwo] = $channels[$expectedColor];

        $this->assertGreaterThan(0.7, $color[$dominant]);
        $this->assertLessThan(0.3, $color[$otherOne]);
        $this->assertLessThan(0.3, $color[$otherTwo]);
    }

    private function createParameterBag(): ParameterBagInterface
    {
        $parameterBag = $this->createMock(ParameterBagInterface::class);
        $missingProfile = sys_get_temp_dir() . '/missing-icc-profile-' . bin2hex(random_bytes(4)) . '.icc';

        $parameterBag
            ->method('get')
            ->willReturnMap([
                ['srgb_profile_path', $missingProfile],
                ['cmyk_profile_path', $missingProfile],
                ['kernel.project_dir', dirname(__DIR__, 2)],
            ]);

        return $parameterBag;
    }
}
