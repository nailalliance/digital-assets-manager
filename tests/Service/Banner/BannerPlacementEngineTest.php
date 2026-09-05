<?php

namespace App\Tests\Service\Banner;

use App\Service\Banner\BannerLayoutCatalog;
use App\Service\Banner\BannerPlacement;
use App\Service\Banner\BannerPlacementEngine;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;

final class BannerPlacementEngineTest extends TestCase
{
    private BannerLayoutCatalog $layouts;
    private BannerPlacementEngine $engine;

    protected function setUp(): void
    {
        $this->layouts = new BannerLayoutCatalog();
        $this->engine = new BannerPlacementEngine();
    }

    public function testPlacementIsDeterministicForTheSameSeed(): void
    {
        $dimensions = $this->dimensions(12);
        $layout = $this->layouts->get(BannerLayoutCatalog::MOBILE);

        $first = $this->engine->calculate($dimensions, $layout, 9182);
        $second = $this->engine->calculate($dimensions, $layout, 9182);

        $this->assertEquals($first, $second);
        $this->assertNotEquals($first, $this->engine->calculate($dimensions, $layout, 9183));
    }

    #[DataProvider('layoutAndCountProvider')]
    public function testInputAssetOrderIsPreservedFromLeftToRight(string $layoutName, int $count): void
    {
        $layout = $this->layouts->get($layoutName);
        $placements = $this->engine->calculate($this->dimensions($count), $layout, 6917);
        usort($placements, static fn (BannerPlacement $a, BannerPlacement $b): int => $a->centerX <=> $b->centerX);

        $this->assertSame(
            range(0, $count - 1),
            array_map(static fn (BannerPlacement $placement): int => $placement->assetIndex, $placements)
        );
    }

    #[DataProvider('layoutAndCountProvider')]
    public function testEveryUprightBottleRemainsInsideItsStagingBounds(string $layoutName, int $count): void
    {
        $layout = $this->layouts->get($layoutName);
        $placements = $this->engine->calculate($this->dimensions($count), $layout, 12345 + $count);

        $this->assertCount($count, $placements);
        $this->assertSame(range(0, $count - 1), $this->sortedAssetIndices($placements));

        foreach ($placements as $placement) {
            $surface = $layout->surface($placement->surface);
            $left = $placement->centerX - $placement->rotatedWidth / 2;
            $right = $placement->centerX + $placement->rotatedWidth / 2;
            $top = $placement->contactY - $placement->rotatedHeight;

            $this->assertGreaterThanOrEqual($surface['stageLeft'] - 1, $left);
            $this->assertLessThanOrEqual($surface['stageRight'] + 1, $right);
            $this->assertGreaterThanOrEqual($layout->compositionTop - 1, $top);
            $this->assertGreaterThanOrEqual($surface['contactMin'], $placement->contactY);
            $this->assertLessThanOrEqual($surface['contactMax'], $placement->contactY);
            $this->assertSame(0.0, $placement->rotationDegrees);
        }
    }

    #[DataProvider('layoutAndCountProvider')]
    public function testBottlesOnTheSamePlatformNeverOverlap(string $layoutName, int $count): void
    {
        $layout = $this->layouts->get($layoutName);
        $placements = $this->engine->calculate($this->dimensions($count), $layout, 4402);
        $this->assertCount($count, $placements);

        foreach (['upper', 'main'] as $surfaceName) {
            $sameLevel = array_values(array_filter(
                $placements,
                static fn (BannerPlacement $placement): bool => $placement->surface === $surfaceName
            ));
            usort($sameLevel, static fn (BannerPlacement $a, BannerPlacement $b): int => $a->centerX <=> $b->centerX);

            for ($i = 1; $i < count($sameLevel); ++$i) {
                $previous = $sameLevel[$i - 1];
                $current = $sameLevel[$i];
                $previousRight = $previous->centerX + $previous->rotatedWidth / 2;
                $currentLeft = $current->centerX - $current->rotatedWidth / 2;

                $this->assertGreaterThanOrEqual($previousRight + 5, $currentLeft);
            }
        }
    }

    public function testBottleScaleUsesFiftyPercentTargetWithinPlatformLimit(): void
    {
        $layout = $this->layouts->get(BannerLayoutCatalog::DESKTOP);
        $placement = $this->engine->calculate($this->dimensions(1), $layout, 4402)[0];
        $expectedHeight = min(
            (int) round($layout->baseBottleHeight(1) * 1.50),
            $layout->surface('upper')['contactMin'] - $layout->compositionTop
        );

        $this->assertSame($expectedHeight, $placement->targetHeight);
        $this->assertSame('upper', $placement->surface);
        $this->assertSame($layout->surface('upper')['contactMin'], $placement->contactY);
    }

    #[DataProvider('upperOnlyCountProvider')]
    public function testSixOrFewerDesktopBottlesUseOnlyUpperPlatform(int $count): void
    {
        $layout = $this->layouts->get(BannerLayoutCatalog::DESKTOP);
        $placements = $this->engine->calculate($this->dimensions($count), $layout, 7712);

        $this->assertCount($count, $placements);
        foreach ($placements as $placement) {
            $this->assertSame('upper', $placement->surface);
        }
    }

    #[DataProvider('alternatingCountProvider')]
    public function testLargerDesktopCompositionsStrictlyAlternatePlatforms(int $count): void
    {
        $layout = $this->layouts->get(BannerLayoutCatalog::DESKTOP);
        $placements = $this->engine->calculate($this->dimensions($count), $layout, 2271);
        usort($placements, static fn (BannerPlacement $a, BannerPlacement $b): int => $a->centerX <=> $b->centerX);
        $capInterlockedPairs = 0;

        foreach ($placements as $index => $placement) {
            $this->assertSame($index % 2 === 0 ? 'upper' : 'main', $placement->surface);
            if ($index === 0) {
                continue;
            }

            $previous = $placements[$index - 1];
            $distance = $placement->centerX - $previous->centerX;
            $requiredDistance = $previous->surface === 'upper'
                ? $previous->rotatedWidth / 2 + $placement->rotatedWidth * 0.46 / 2
                : $previous->rotatedWidth * 0.46 / 2 + $placement->rotatedWidth / 2;
            $this->assertGreaterThanOrEqual($requiredDistance + 5, $distance);

            if ($distance < ($previous->rotatedWidth + $placement->rotatedWidth) / 2) {
                ++$capInterlockedPairs;
            }
        }

        $this->assertGreaterThan(0, $capInterlockedPairs);
    }

    #[DataProvider('layoutAndCountProvider')]
    public function testBottlesOnTheSamePlatformShareOneContactLine(string $layoutName, int $count): void
    {
        $layout = $this->layouts->get($layoutName);
        $placements = $this->engine->calculate($this->dimensions($count), $layout, 8817);
        $contactLines = [];

        foreach ($placements as $placement) {
            $contactLines[$placement->surface][] = $placement->contactY;
        }

        foreach ($contactLines as $surfaceName => $contacts) {
            $this->assertCount(
                1,
                array_unique($contacts),
                sprintf('Bottles on the %s platform are not aligned.', $surfaceName)
            );
            $this->assertSame($layout->surface($surfaceName)['contactMin'], $contacts[0]);
        }
    }

    #[DataProvider('layoutAndCountProvider')]
    public function testAllBottlesUseOneSharedRenderedHeight(string $layoutName, int $count): void
    {
        $layout = $this->layouts->get($layoutName);
        $placements = $this->engine->calculate($this->dimensions($count), $layout, 5019);
        $heights = array_map(
            static fn (BannerPlacement $placement): int => $placement->targetHeight,
            $placements
        );

        $this->assertCount(1, array_unique($heights));
    }

    /** @return iterable<string, array{0: string, 1: int}> */
    public static function layoutAndCountProvider(): iterable
    {
        foreach ([BannerLayoutCatalog::DESKTOP, BannerLayoutCatalog::MOBILE] as $layout) {
            foreach ([1, 2, 4, 8, 12] as $count) {
                yield $layout . '-' . $count => [$layout, $count];
            }
        }

    }

    /** @return iterable<string, array{0: int}> */
    public static function upperOnlyCountProvider(): iterable
    {
        for ($count = 1; $count <= 6; ++$count) {
            yield (string) $count => [$count];
        }
    }

    /** @return iterable<string, array{0: int}> */
    public static function alternatingCountProvider(): iterable
    {
        for ($count = 7; $count <= 12; ++$count) {
            yield (string) $count => [$count];
        }
    }

    /** @return list<array{width: int, height: int}> */
    private function dimensions(int $count): array
    {
        $dimensions = [];

        for ($i = 0; $i < $count; ++$i) {
            $dimensions[] = [
                'width' => 360 + ($i % 3) * 30,
                'height' => 1200 - ($i % 4) * 40,
            ];
        }

        return $dimensions;
    }

    /** @param list<BannerPlacement> $placements @return list<int> */
    private function sortedAssetIndices(array $placements): array
    {
        $indices = array_map(static fn (BannerPlacement $placement): int => $placement->assetIndex, $placements);
        sort($indices);

        return $indices;
    }
}
