<?php

namespace App\Tests\Form;

use App\Entity\NotificationLevel;
use App\Entity\SiteNotification;
use App\Form\SiteNotificationType;
use Symfony\Component\Form\Test\TypeTestCase;

class SiteNotificationTypeTest extends TypeTestCase
{
    public function testPacificScheduleIsStoredAsImmutableUtcDates(): void
    {
        $notification = new SiteNotification();
        $form = $this->factory->create(SiteNotificationType::class, $notification);

        $form->submit([
            'title' => 'Scheduled maintenance',
            'message' => 'The service will be unavailable.',
            'level' => NotificationLevel::WARNING->value,
            'startsAt' => '2026-08-14T12:00',
            'endsAt' => '2026-08-16T00:00',
            'enabled' => '1',
        ]);

        self::assertTrue($form->isSynchronized());
        self::assertSame(NotificationLevel::WARNING, $notification->getLevel());
        self::assertSame('2026-08-14 19:00:00 UTC', $notification->getStartsAt()?->format('Y-m-d H:i:s T'));
        self::assertSame('2026-08-16 07:00:00 UTC', $notification->getEndsAt()?->format('Y-m-d H:i:s T'));
    }
}
