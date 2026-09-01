<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class ShareControllerRoutingTest extends KernelTestCase
{
    public function testCropInsideMiddleRoutesEnableCenterCropping(): void
    {
        self::bootKernel();
        $router = self::getContainer()->get('router');

        $route = $router->match('/share/share-token/image/42/crop-inside-middle/300x300/example.jpg');

        $this->assertSame('public_image_crop_inside_middle', $route['_route']);
        $this->assertTrue($route['cropInsideMiddle']);
        $this->assertSame(0, $route['padding']);

        $paddedRoute = $router->match('/share/share-token/image/42/crop-inside-middle/300x300/20/example.jpg');

        $this->assertSame('public_image_crop_inside_middle_padded', $paddedRoute['_route']);
        $this->assertTrue($paddedRoute['cropInsideMiddle']);
        $this->assertSame('20', $paddedRoute['padding']);

        $clippedRoute = $router->match('/share/share-token/image/42/use-clip-path/largest/crop-inside-middle/300x300/example.jpg');

        $this->assertSame('public_image_largest_clip_path_crop_inside_middle', $clippedRoute['_route']);
        $this->assertTrue($clippedRoute['useLargestClipPath']);
        $this->assertTrue($clippedRoute['cropInsideMiddle']);
    }
}
