<?php

namespace App\Service\Banner\Exception;

final class AssetSourceNotFoundException extends BannerInputException
{
    public function __construct(public readonly ?int $assetId = null)
    {
        parent::__construct($assetId === null
            ? 'The asset source file is missing or unreadable.'
            : sprintf('The source file for asset %d is missing or unreadable.', $assetId));
    }
}
