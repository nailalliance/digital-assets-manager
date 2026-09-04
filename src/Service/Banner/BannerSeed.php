<?php

namespace App\Service\Banner;

final class BannerSeed
{
    /** @param list<int> $assetIds */
    public static function resolve(array $assetIds, string $layout, ?int $requestedSeed): int
    {
        if ($requestedSeed !== null) {
            return $requestedSeed & 0x7fffffff;
        }

        $binaryHash = hash('sha256', $layout . ':' . implode(',', $assetIds), true);
        $unpacked = unpack('Nseed', substr($binaryHash, 0, 4));

        return ((int) ($unpacked['seed'] ?? 1)) & 0x7fffffff;
    }
}
