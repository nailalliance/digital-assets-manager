<?php

namespace App\Twig;

use App\Entity\SiteNotification;
use App\Repository\SiteNotificationRepository;
use Symfony\Component\Clock\ClockInterface;
use Twig\Attribute\AsTwigFunction;

class SiteNotificationTwigFunctions
{
    public function __construct(
        private readonly SiteNotificationRepository $siteNotificationRepository,
        private readonly ClockInterface $clock,
    ) {
    }

    /**
     * @return list<SiteNotification>
     */
    #[AsTwigFunction('header_notifications')]
    public function getHeaderNotifications(): array
    {
        return $this->siteNotificationRepository->findActiveAt(
            $this->clock->now()->setTimezone(new \DateTimeZone('UTC')),
        );
    }
}
