<?php

namespace App\Tests\Entity;

use App\Entity\NotificationLevel;
use App\Entity\SiteNotification;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Validator\Validation;

class SiteNotificationTest extends TestCase
{
    public function testItIsActiveOnlyInsideItsEnabledSchedule(): void
    {
        $notification = (new SiteNotification())
            ->setTitle('Maintenance')
            ->setMessage('Temporarily unavailable.')
            ->setLevel(NotificationLevel::WARNING)
            ->setStartsAt(new \DateTimeImmutable('2026-08-11 07:00:00 UTC'))
            ->setEndsAt(new \DateTimeImmutable('2026-08-16 07:00:00 UTC'));

        self::assertFalse($notification->isActiveAt(new \DateTimeImmutable('2026-08-11 06:59:59 UTC')));
        self::assertTrue($notification->isActiveAt(new \DateTimeImmutable('2026-08-11 07:00:00 UTC')));
        self::assertTrue($notification->isActiveAt(new \DateTimeImmutable('2026-08-16 06:59:59 UTC')));
        self::assertFalse($notification->isActiveAt(new \DateTimeImmutable('2026-08-16 07:00:00 UTC')));

        $notification->setEnabled(false);

        self::assertFalse($notification->isActiveAt(new \DateTimeImmutable('2026-08-14 19:00:00 UTC')));
    }

    public function testEndTimeMustBeAfterStartTime(): void
    {
        $notification = (new SiteNotification())
            ->setTitle('Maintenance')
            ->setMessage('Temporarily unavailable.')
            ->setStartsAt(new \DateTimeImmutable('2026-08-16 07:00:00 UTC'))
            ->setEndsAt(new \DateTimeImmutable('2026-08-14 19:00:00 UTC'));

        $violations = Validation::createValidatorBuilder()
            ->enableAttributeMapping()
            ->getValidator()
            ->validate($notification);

        self::assertCount(1, $violations);
        self::assertSame('endsAt', $violations[0]->getPropertyPath());
        self::assertSame('The end time must be after the start time.', $violations[0]->getMessage());
    }
}
