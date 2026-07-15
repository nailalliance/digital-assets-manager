<?php

namespace App\Tests\Service;

use App\Service\ImageProcessorService;
use PHPUnit\Framework\TestCase;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Filesystem\Filesystem;

class ImageProcessorServiceTest extends TestCase
{
    public function testApplyLargestClipPathUsesOnlyTheSelectedPathShape(): void
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
            '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="#000000"/><path d="M 50 50 L 150 50 L 150 150 L 50 150 Z" fill="#000000"/></svg>'
        );

        $method = new \ReflectionMethod(ImageProcessorService::class, 'applyLargestClipPathIfAvailable');
        $method->setAccessible(true);
        $method->invoke($service, $image);

        $outsidePixel = $image->getImagePixelColor(10, 10)->getColor(true);
        $insidePixel = $image->getImagePixelColor(100, 100)->getColor(true);

        $this->assertLessThan(0.1, $outsidePixel['a']);
        $this->assertGreaterThan(0.9, $insidePixel['a']);

        $draw->clear();
        $image->clear();
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
