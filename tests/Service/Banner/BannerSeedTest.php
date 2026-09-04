<?php

namespace App\Tests\Service\Banner;

use App\Service\Banner\BannerSeed;
use PHPUnit\Framework\TestCase;

final class BannerSeedTest extends TestCase
{
    public function testExplicitSeedIsPreserved(): void
    {
        $this->assertSame(4932, BannerSeed::resolve([1, 2], 'desktop', 4932));
    }

    public function testDerivedSeedIsStableAndSensitiveToOrderAndLayout(): void
    {
        $seed = BannerSeed::resolve([1, 2, 3], 'desktop', null);

        $this->assertSame($seed, BannerSeed::resolve([1, 2, 3], 'desktop', null));
        $this->assertNotSame($seed, BannerSeed::resolve([3, 2, 1], 'desktop', null));
        $this->assertNotSame($seed, BannerSeed::resolve([1, 2, 3], 'mobile', null));
    }
}
