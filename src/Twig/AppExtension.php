<?php

namespace App\Twig;

use App\Service\DownloadListService;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class AppExtension extends AbstractExtension
{
    public function __construct(private readonly DownloadListService $downloadListService)
    {
    }

    public function getFunctions(): array
    {
        return [
            new TwigFunction('download_list_count', [$this->downloadListService, 'getCount']),
        ];
    }
}
