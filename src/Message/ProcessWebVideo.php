<?php

namespace App\Message;

final class ProcessWebVideo
{
    public function __construct(
        public readonly int $assetId,
        public readonly bool $force = false,
    )
    {
    }
}
