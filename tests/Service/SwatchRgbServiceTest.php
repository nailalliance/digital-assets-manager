<?php

namespace App\Tests\Service;

use App\Entity\Assets\Assets;
use App\Entity\Assets\Categories;
use App\Service\SwatchRgbService;
use PHPUnit\Framework\TestCase;
use Psr\Log\NullLogger;

class SwatchRgbServiceTest extends TestCase
{
    public function testItAveragesTheTwentyPixelSquareAtTheImageCenter(): void
    {
        if (!class_exists(\Imagick::class)) {
            $this->markTestSkipped('Imagick is required for this test.');
        }

        $path = tempnam(sys_get_temp_dir(), 'swatch-rgb-');
        self::assertIsString($path);

        $image = new \Imagick();
        $image->newImage(60, 60, new \ImagickPixel('rgb(240,240,240)'), 'png');
        $iterator = $image->getPixelIterator();

        foreach ($iterator as $y => $row) {
            foreach ($row as $x => $pixel) {
                if ($x >= 20 && $x < 40 && $y >= 20 && $y < 40) {
                    $pixel->setColor('rgb(12,34,56)');
                }
            }
            $iterator->syncIterator();
        }

        $image->writeImage($path);
        $image->clear();

        try {
            $asset = (new Assets())
                ->setFilePath($path)
                ->setMimeType('image/png')
                ->addCategory((new Categories())->setName('  sWaTcHeS  '));

            (new SwatchRgbService(new NullLogger()))->update($asset);

            self::assertSame('12,34,56', $asset->getRgb());
            self::assertSame('#0c2238', $asset->getHex());
        } finally {
            @unlink($path);
        }
    }

    public function testItRecognizesASwatchAncestorCategory(): void
    {
        $swatch = (new Categories())->setName('Swatch');
        $child = (new Categories())->setName('Product Color')->setCategories($swatch);
        $asset = (new Assets())
            ->setFilePath('/file/does/not/exist.png')
            ->setMimeType('image/png')
            ->addCategory($child)
            ->setRgb('1,2,3');

        (new SwatchRgbService(new NullLogger()))->update($asset);

        self::assertSame('1,2,3', $asset->getRgb());
    }

    public function testItClearsRgbWhenTheAssetLeavesTheSwatchCategory(): void
    {
        $asset = (new Assets())
            ->setFilePath('/file/does/not/exist.png')
            ->setMimeType('image/png')
            ->addCategory((new Categories())->setName('Photography'))
            ->setRgb('1,2,3');

        (new SwatchRgbService(new NullLogger()))->update($asset);

        self::assertNull($asset->getRgb());
        self::assertNull($asset->getHex());
    }

    public function testHexIsNullForAnInvalidStoredRgbValue(): void
    {
        self::assertNull((new Assets())->setRgb('256,0,0')->getHex());
        self::assertNull((new Assets())->setRgb('not-rgb')->getHex());
    }
}
