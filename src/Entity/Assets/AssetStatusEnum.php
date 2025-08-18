<?php

namespace App\Entity\Assets;

enum AssetStatusEnum: string
{
    case ACTIVE = 'active';
    case INACTIVE = 'inactive';
    case EXPIRED = 'expired';
}
