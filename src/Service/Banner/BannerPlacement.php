<?php

namespace App\Service\Banner;

final readonly class BannerPlacement
{
    public function __construct(
        public int $assetIndex,
        public string $surface,
        public int $targetHeight,
        public float $rotationDegrees,
        public int $centerX,
        public int $contactY,
        public int $rotatedWidth,
        public int $rotatedHeight,
        public int $zIndex,
    ) {
    }
}
