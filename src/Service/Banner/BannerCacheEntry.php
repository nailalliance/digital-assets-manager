<?php

namespace App\Service\Banner;

final readonly class BannerCacheEntry
{
    public function __construct(
        public string $path,
        public string $etag,
        public int $seed,
        public bool $cacheHit,
    ) {
    }
}
