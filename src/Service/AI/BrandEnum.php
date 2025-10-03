<?php

namespace App\Service\AI;

enum BrandEnum: string
{
    case GELISH = 'gelish.json';
    case ARTISTIC = 'artistic.json';
    case ENTITY = 'entity.json';
    case MORGAN_TAYLOR = 'morgan-taylor.json';
    case RCM = 'rcm.json';
}
