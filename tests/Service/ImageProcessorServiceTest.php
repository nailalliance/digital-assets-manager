<?php

namespace App\Tests\Service;

use App\Service\ImageProcessorService;
use PHPUnit\Framework\TestCase;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Filesystem\Filesystem;

class ImageProcessorServiceTest extends TestCase
{
    public function testApplyLargestClipPathUsesOriginalSvgBlobShape(): void
    {
        if (!class_exists(\Imagick::class)) {
            $this->markTestSkipped('Imagick is required for this test.');
        }

        $service = new ImageProcessorService(new Filesystem(), $this->createParameterBag());
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
        $this->assertLessThan(0.1, $outsidePixel['g']);
        $this->assertLessThan(0.1, $outsidePixel['b']);
        $this->assertGreaterThan(0.9, $insidePixel['a']);

        $draw->clear();
        $image->clear();
    }

    public function testApplyLargestClipPathUsesLargestPathResource(): void
    {
        if (!class_exists(\Imagick::class)) {
            $this->markTestSkipped('Imagick is required for this test.');
        }

        $service = new ImageProcessorService(new Filesystem(), $this->createParameterBag());
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

        $service = new ImageProcessorService(new Filesystem(), $this->createParameterBag());
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

        $service = new ImageProcessorService(new Filesystem(), $this->createParameterBag());
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

    public function testClippedExportUsesRedCanvasBackground(): void
    {
        $service = new ImageProcessorService(new Filesystem(), $this->createParameterBag());
        $method = new \ReflectionMethod(ImageProcessorService::class, 'resolveCanvasBackgroundColor');
        $method->setAccessible(true);

        $this->assertSame('red', $method->invoke($service, null, true));
        $this->assertSame('white', $method->invoke($service, null, false));
        $this->assertSame('white', $method->invoke($service, 'legend', true));
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
            ]);

        return $parameterBag;
    }
}
