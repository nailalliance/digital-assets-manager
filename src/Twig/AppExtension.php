<?php

namespace App\Twig;

use App\Repository\SiteNotificationRepository;
use App\Service\DownloadListService;
use Symfony\Component\Clock\ClockInterface;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class AppExtension extends AbstractExtension
{
    public function __construct(
        private readonly DownloadListService $downloadListService,
        private readonly SiteNotificationRepository $siteNotificationRepository,
        private readonly ClockInterface $clock,
    ) {
    }

    public function getFunctions(): array
    {
        return [
            new TwigFunction('download_list_count', [$this->downloadListService, 'getCount']),
            new TwigFunction('header_notifications', [$this, 'getHeaderNotifications']),
        ];
    }

    /**
     * @return list<\App\Entity\SiteNotification>
     */
    public function getHeaderNotifications(): array
    {
        return $this->siteNotificationRepository->findActiveAt(
            $this->clock->now()->setTimezone(new \DateTimeZone('UTC')),
        );
    }
}
