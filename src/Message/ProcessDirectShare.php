<?php

namespace App\Message;

class ProcessDirectShare
{
    public function __construct(
        public readonly array $fileMetaData,
        public readonly string $uploadKey,
        public readonly ?int $userId,
    )
    {}
}
