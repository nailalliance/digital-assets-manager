<?php

namespace App\Service\Banner;

final class BannerLayoutCatalog
{
    public const DESKTOP = 'desktop';
    public const MOBILE = 'mobile';

    public function get(string $name): BannerLayout
    {
        return match ($name) {
            self::DESKTOP => $this->desktop(),
            self::MOBILE => $this->mobile(),
            default => throw new \InvalidArgumentException('Layout must be desktop or mobile.'),
        };
    }

    public function supports(string $name): bool
    {
        return in_array($name, [self::DESKTOP, self::MOBILE], true);
    }

    private function desktop(): BannerLayout
    {
        return new BannerLayout(
            name: self::DESKTOP,
            width: 1920,
            height: 600,
            sourceCrop: null,
            compositionTop: 20,
            surfaces: [
                'upper' => [
                    'polygon' => [[0, 339], [977, 339], [977, 368], [0, 368]],
                    'stageLeft' => 28,
                    'stageRight' => 950,
                    'contactMin' => 362,
                    'contactMax' => 366,
                    'surfaceBottom' => 368,
                ],
                'main' => [
                    // Effects are intentionally clipped at x=1000. The right
                    // side beginning at x=1056 remains pristine for HTML text.
                    'polygon' => [[0, 468], [1000, 468], [1000, 522], [0, 522]],
                    'stageLeft' => 28,
                    'stageRight' => 980,
                    'contactMin' => 500,
                    'contactMax' => 512,
                    'surfaceBottom' => 522,
                ],
            ],
        );
    }

    private function mobile(): BannerLayout
    {
        return new BannerLayout(
            name: self::MOBILE,
            width: 1080,
            height: 1080,
            // Use the right-hand square so mobile retains the rainbow arch and
            // the uninterrupted primary stone surface.
            sourceCrop: ['x' => 2816, 'y' => 0, 'width' => 1088, 'height' => 1088],
            compositionTop: 540,
            surfaces: [
                'main' => [
                    'polygon' => [[0, 786], [1080, 786], [1080, 936], [0, 936]],
                    'stageLeft' => 24,
                    'stageRight' => 1056,
                    'contactMin' => 895,
                    'contactMax' => 920,
                    'surfaceBottom' => 936,
                ],
            ],
        );
    }
}
