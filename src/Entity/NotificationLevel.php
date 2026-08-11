<?php

namespace App\Entity;

enum NotificationLevel: string
{
    case INFO = 'info';
    case SUCCESS = 'success';
    case WARNING = 'warning';
    case CRITICAL = 'critical';
}
