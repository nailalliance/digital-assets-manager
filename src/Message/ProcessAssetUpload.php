<?php

namespace App\Message;

class ProcessAssetUpload
{
    public function __construct(
        public readonly array $fileMetaData,
        public readonly string $uploadKey,
        public readonly ?int $userId,
        public readonly ?string $cacheItemKeyName,
        public readonly ?int $assetId = null
    )
    {}
}
