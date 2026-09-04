<?php

namespace App\Tests\Service\Image;

use App\Service\Image\ClippingPathExtractor;
use PHPUnit\Framework\TestCase;

final class ClippingPathExtractorTest extends TestCase
{
    public function testPrimaryPathProducesTransparency(): void
    {
        if (!class_exists(\Imagick::class)) {
            $this->markTestSkipped('Imagick is required.');
        }

        $image = new \Imagick();
        $image->newImage(200, 300, new \ImagickPixel('#e81772'), 'jpeg');
        $image->setImageProperty(
            '8BIM:1999,2998:#0',
            '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="300" viewBox="0 0 200 300">'
            . '<path d="M 50 20 L 150 20 L 150 280 L 50 280 Z" fill="#000000"/>'
            . '</svg>'
        );

        try {
            $this->assertTrue((new ClippingPathExtractor())->applyPrimary($image));
            $outside = $image->getImagePixelColor(10, 10)->getColor(true);
            $inside = $image->getImagePixelColor(100, 100)->getColor(true);
            $this->assertLessThan(0.1, $outside['a']);
            $this->assertGreaterThan(0.9, $inside['a']);
        } finally {
            $image->clear();
        }
    }

    public function testPrimaryPathReturnsFalseWhenNoPathExists(): void
    {
        if (!class_exists(\Imagick::class)) {
            $this->markTestSkipped('Imagick is required.');
        }

        $image = new \Imagick();
        $image->newImage(20, 20, new \ImagickPixel('white'), 'jpeg');

        try {
            $this->assertFalse((new ClippingPathExtractor())->applyPrimary($image));
        } finally {
            $image->clear();
        }
    }

    public function testCapturedPathScalesOntoAWorkingSizeImage(): void
    {
        if (!class_exists(\Imagick::class)) {
            $this->markTestSkipped('Imagick is required.');
        }

        $extractor = new ClippingPathExtractor();
        $image = new \Imagick();
        $image->newImage(400, 600, new \ImagickPixel('#e81772'), 'jpeg');
        $image->setImageProperty(
            '8BIM:1999,2998:#0',
            '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600">'
            . '<path d="M 100 40 L 300 40 L 300 560 L 100 560 Z" fill="#000000"/>'
            . '</svg>'
        );
        $pathResource = $extractor->largestPathResource($image);
        $image->resizeImage(100, 150, \Imagick::FILTER_LANCZOS, 1.0, false);

        try {
            $this->assertNotNull($pathResource);
            $this->assertTrue($extractor->applyPrimary($image, $pathResource));
            $this->assertLessThan(0.1, $image->getImagePixelColor(5, 5)->getColor(true)['a']);
            $this->assertGreaterThan(0.9, $image->getImagePixelColor(50, 75)->getColor(true)['a']);
        } finally {
            $image->clear();
        }
    }
}
