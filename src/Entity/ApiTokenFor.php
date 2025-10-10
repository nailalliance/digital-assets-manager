<?php

namespace App\Entity;

enum ApiTokenFor: string
{
    case ADOBE = 'adobe';
    case ADMIN = 'admin';
}
