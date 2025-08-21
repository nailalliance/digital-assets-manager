<?php

namespace App\TwigExtension;

use Twig\Attribute\AsTwigFilter;
use Twig\Attribute\AsTwigFunction;

class BasenameTwigFilter
{
    #[AsTwigFilter('basename')]
    public function basename(string $path): string
    {
        return basename($path);
    }
}
