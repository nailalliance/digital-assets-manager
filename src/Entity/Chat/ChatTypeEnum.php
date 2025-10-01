<?php

namespace App\Entity\Chat;

enum ChatTypeEnum: string
{
    case IMAGE = 'image';
    case AUDIO = 'audio';
    case VIDEO = 'video';
    case TEXT = 'text';
}
