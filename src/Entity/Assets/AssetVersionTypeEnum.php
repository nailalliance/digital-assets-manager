<?php

namespace App\Entity\Assets;

enum AssetVersionTypeEnum: string
{
    case EDITABLE = 'editable';
    case CMYK_VERSION = 'cmyk_version';
}
