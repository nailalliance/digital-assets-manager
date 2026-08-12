<?php

namespace App\Tests\Twig;

use App\Repository\SiteNotificationRepository;
use App\Twig\SiteNotificationTwigFunctions;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Clock\MockClock;

class SiteNotificationTwigFunctionsTest extends TestCase
{
    public function testItLoadsNotificationsLazilyAtTheCurrentUtcTime(): void
    {
        $expectedTime = new \DateTimeImmutable('2026-08-11 22:30:00 UTC');
        $repository = $this->createMock(SiteNotificationRepository::class);
        $repository->expects(self::once())
            ->method('findActiveAt')
            ->with(self::callback(
                static fn (\DateTimeImmutable $time): bool => $time == $expectedTime && $time->getTimezone()->getName() === 'UTC',
            ))
            ->willReturn([]);

        $functions = new SiteNotificationTwigFunctions(
            $repository,
            new MockClock('2026-08-11 15:30:00 America/Los_Angeles'),
        );

        self::assertSame([], $functions->getHeaderNotifications());
    }
}
