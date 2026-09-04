<?php

namespace App\Service\Banner;

use App\Service\Banner\Exception\BannerInputException;
use Random\Engine\Mt19937;
use Random\Randomizer;

final class BannerPlacementEngine
{
    private const BOTTLE_SCALE_MULTIPLIER = 1.50;
    private const MINIMUM_GAP = 6;
    private const MAXIMUM_EXTRA_GAP = 14;

    /**
     * @param list<array{width: int, height: int}> $assetDimensions
     * @return list<BannerPlacement>
     */
    public function calculate(array $assetDimensions, BannerLayout $layout, int $seed): array
    {
        $assetCount = count($assetDimensions);
        if ($assetCount < 1 || $assetCount > 12) {
            throw new BannerInputException('A banner requires between 1 and 12 assets.');
        }

        foreach ($assetDimensions as $dimensions) {
            if ($dimensions['width'] < 1 || $dimensions['height'] < 1) {
                throw new BannerInputException('Every product cutout must have positive dimensions.');
            }
        }

        $randomizer = new Randomizer(new Mt19937($seed));
        $shuffledIndices = $randomizer->shuffleArray(range(0, $assetCount - 1));
        $surfaceGroups = $this->assignSurfaces($shuffledIndices, $layout);
        $packingOrder = $this->interleaveSurfaceGroups($surfaceGroups);
        $surfaceByAsset = [];

        foreach ($surfaceGroups as $surfaceName => $indices) {
            foreach ($indices as $assetIndex) {
                $surfaceByAsset[$assetIndex] = $surfaceName;
            }
        }

        $prepared = [];
        foreach ($packingOrder as $assetIndex) {
            $surfaceName = $surfaceByAsset[$assetIndex];
            $surface = $layout->surface($surfaceName);
            $source = $assetDimensions[$assetIndex];
            // Every bottle assigned to this platform shares its exact contact
            // line, keeping the bottoms visually aligned at the same depth.
            $contactY = $surface['contactMin'];

            $prepared[] = [
                'assetIndex' => $assetIndex,
                'surface' => $surfaceName,
                'sourceRatio' => $source['width'] / $source['height'],
                'contactY' => $contactY,
            ];
        }

        // Every platform shares one set of horizontal lanes. This stronger
        // constraint prevents a foreground bottle from obscuring a bottle on
        // the upper platform, even though their vertical bounds intersect.
        $usedSurfaces = array_unique(array_column($prepared, 'surface'));
        $stageLeft = max(array_map(
            static fn (string $name): int => $layout->surface($name)['stageLeft'],
            $usedSurfaces
        ));
        $stageRight = min(array_map(
            static fn (string $name): int => $layout->surface($name)['stageRight'],
            $usedSurfaces
        ));
        $availableWidth = $stageRight - $stageLeft;
        $gapCount = max(0, $assetCount - 1);
        $widthBudget = max($assetCount, $availableWidth - self::MINIMUM_GAP * $gapCount);
        $desiredHeight = max(1, (int) round(
            $layout->baseBottleHeight($assetCount) * self::BOTTLE_SCALE_MULTIPLIER
        ));
        $verticalLimit = min(array_map(
            static fn (array $item): int => $item['contactY'] - $layout->compositionTop,
            $prepared
        ));
        $totalAspectRatio = array_sum(array_column($prepared, 'sourceRatio'));
        $widthLimitedHeight = max(1, (int) floor(
            ($widthBudget - $assetCount) / max(0.0001, $totalAspectRatio)
        ));
        $sharedHeight = max(1, min($desiredHeight, $verticalLimit, $widthLimitedHeight));

        foreach ($prepared as &$item) {
            $item['targetHeight'] = $sharedHeight;
            $item['targetWidth'] = max(1, (int) round($sharedHeight * $item['sourceRatio']));
        }
        unset($item);

        // Guard against accumulated width rounding at the maximum count. The
        // shared height is reduced as one unit so all products remain equal.
        while (array_sum(array_column($prepared, 'targetWidth')) > $widthBudget) {
            --$sharedHeight;
            foreach ($prepared as &$item) {
                $item['targetHeight'] = max(1, $sharedHeight);
                $item['targetWidth'] = max(1, (int) round(
                    $item['targetHeight'] * $item['sourceRatio']
                ));
            }
            unset($item);
        }

        $totalWidth = array_sum(array_column($prepared, 'targetWidth'));
        $slack = max(0, $availableWidth - $totalWidth - self::MINIMUM_GAP * $gapCount);
        $gaps = array_fill(0, $gapCount, self::MINIMUM_GAP);
        $extraGapBudget = min($slack, self::MAXIMUM_EXTRA_GAP * $gapCount);

        for ($i = 0; $i < $gapCount && $extraGapBudget > 0; ++$i) {
            $extra = $randomizer->getInt(0, min(self::MAXIMUM_EXTRA_GAP, $extraGapBudget));
            $gaps[$i] += $extra;
            $extraGapBudget -= $extra;
            $slack -= $extra;
        }

        // Randomize the cluster's position using only the remaining outer
        // margin. Internal jitter is represented by safe, positive gaps.
        $cursor = $stageLeft + ($slack > 0 ? $randomizer->getInt(0, $slack) : 0);
        $placements = [];

        foreach ($prepared as $index => $item) {
            $centerX = $cursor + intdiv($item['targetWidth'], 2);
            $zIndex = $item['contactY'] * 100 + $randomizer->getInt(0, 99);

            $placements[] = new BannerPlacement(
                assetIndex: $item['assetIndex'],
                surface: $item['surface'],
                targetHeight: $item['targetHeight'],
                rotationDegrees: 0.0,
                centerX: $centerX,
                contactY: $item['contactY'],
                rotatedWidth: $item['targetWidth'],
                rotatedHeight: $item['targetHeight'],
                zIndex: $zIndex,
            );

            $cursor += $item['targetWidth'] + ($gaps[$index] ?? 0);
        }

        usort($placements, static fn (BannerPlacement $a, BannerPlacement $b): int => $a->zIndex <=> $b->zIndex);

        return $placements;
    }

    /**
     * @param list<int> $shuffledIndices
     * @return array<string, list<int>>
     */
    private function assignSurfaces(array $shuffledIndices, BannerLayout $layout): array
    {
        if ($layout->name === BannerLayoutCatalog::MOBILE) {
            return ['main' => $shuffledIndices];
        }

        if (count($shuffledIndices) === 1) {
            return ['upper' => [], 'main' => $shuffledIndices];
        }

        $upperCount = max(1, min(
            count($shuffledIndices) - 1,
            (int) ceil(count($shuffledIndices) * 0.58)
        ));

        return [
            'upper' => array_slice($shuffledIndices, 0, $upperCount),
            'main' => array_slice($shuffledIndices, $upperCount),
        ];
    }

    /**
     * Alternating surface membership avoids turning each platform into a
     * visually rigid block while maintaining collision-free X intervals.
     *
     * @param array<string, list<int>> $surfaceGroups
     * @return list<int>
     */
    private function interleaveSurfaceGroups(array $surfaceGroups): array
    {
        $result = [];
        $offset = 0;

        do {
            $added = false;
            foreach ($surfaceGroups as $indices) {
                if (isset($indices[$offset])) {
                    $result[] = $indices[$offset];
                    $added = true;
                }
            }
            ++$offset;
        } while ($added);

        return $result;
    }
}
