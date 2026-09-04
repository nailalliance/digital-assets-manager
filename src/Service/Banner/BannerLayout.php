<?php

namespace App\Service\Banner;

final readonly class BannerLayout
{
    /**
     * @param array{x: int, y: int, width: int, height: int}|null $sourceCrop
     * @param array<string, array{
     *     polygon: list<array{0: int, 1: int}>,
     *     stageLeft: int,
     *     stageRight: int,
     *     contactMin: int,
     *     contactMax: int,
     *     surfaceBottom: int
     * }> $surfaces
     */
    public function __construct(
        public string $name,
        public int $width,
        public int $height,
        public ?array $sourceCrop,
        public int $compositionTop,
        public array $surfaces,
    ) {
    }

    /**
     * @return array{
     *     polygon: list<array{0: int, 1: int}>,
     *     stageLeft: int,
     *     stageRight: int,
     *     contactMin: int,
     *     contactMax: int,
     *     surfaceBottom: int
     * }
     */
    public function surface(string $name): array
    {
        return $this->surfaces[$name] ?? throw new \InvalidArgumentException(sprintf(
            'Surface "%s" is not defined for the %s layout.',
            $name,
            $this->name
        ));
    }

    public function baseBottleHeight(int $assetCount): int
    {
        if ($this->name === BannerLayoutCatalog::MOBILE) {
            return match (true) {
                $assetCount <= 4 => 290,
                $assetCount <= 8 => 245,
                default => 225,
            };
        }

        return match (true) {
            $assetCount <= 4 => 300,
            $assetCount <= 8 => 250,
            default => 210,
        };
    }
}
