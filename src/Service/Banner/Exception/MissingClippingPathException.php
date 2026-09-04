<?php

namespace App\Service\Banner\Exception;

final class MissingClippingPathException extends BannerInputException
{
    public function __construct(public readonly ?int $assetId = null)
    {
        parent::__construct($assetId === null
            ? 'The source image does not contain a usable clipping path.'
            : sprintf('Asset %d does not contain a usable clipping path.', $assetId));
    }
}
