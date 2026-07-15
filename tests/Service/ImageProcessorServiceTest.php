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
        $this->assertGreaterThan(0.9, $outsidePixel['r']);
        $this->assertGreaterThan(0.9, $outsidePixel['g']);
        $this->assertGreaterThan(0.9, $outsidePixel['b']);
        $this->assertGreaterThan(0.9, $insidePixel['a']);

        $draw->clear();
        $image->clear();
    }

    public function testApplyLargestClipPathPrefersTighterCandidateOverLooserShadowCandidate(): void
    {
        if (!class_exists(\Imagick::class)) {
            $this->markTestSkipped('Imagick is required for this test.');
        }

        $service = new ImageProcessorService(new Filesystem(), $this->createParameterBag());
        $image = new \Imagick();
        $image->newImage(240, 240, new \ImagickPixel('white'), 'png');

        $draw = new \ImagickDraw();
        $draw->setFillColor(new \ImagickPixel('rgb(255, 80, 120)'));
        $draw->rectangle(80, 30, 160, 210);
        $image->drawImage($draw);

        $shadow = new \Imagick();
        $shadow->newImage(240, 240, new \ImagickPixel('transparent'), 'png');
        $shadowDraw = new \ImagickDraw();
        $shadowDraw->setFillColor(new \ImagickPixel('rgba(0, 0, 0, 0.45)'));
        $shadowDraw->ellipse(58, 212, 35, 12, 0, 360);
        $shadow->drawImage($shadowDraw);
        $shadow->gaussianBlurImage(0, 8);
        $image->compositeImage($shadow, \Imagick::COMPOSITE_MULTIPLY, 0, 0);

        $image->setImageProperty(
            '8BIM:1999,2998:#0',
            '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240"><path d="M 18 30 L 160 30 L 160 230 L 18 230 Z" fill="#000000"/></svg>'
        );
        $image->setImageProperty(
            '8BIM:1999,2998:#1',
            '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240"><path d="M 80 30 L 160 30 L 160 210 L 80 210 Z" fill="#000000"/></svg>'
        );

        $method = new \ReflectionMethod(ImageProcessorService::class, 'applyLargestClipPathIfAvailable');
        $method->setAccessible(true);
        $method->invoke($service, $image);

        $shadowPixel = $image->getImagePixelColor(35, 212)->getColor(true);
        $contentPixel = $image->getImagePixelColor(120, 120)->getColor(true);

        $this->assertLessThan(0.1, $shadowPixel['a']);
        $this->assertGreaterThan(0.9, $contentPixel['a']);

        $shadowDraw->clear();
        $shadow->clear();
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
