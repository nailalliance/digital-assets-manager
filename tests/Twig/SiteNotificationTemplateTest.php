<?php

namespace App\Tests\Twig;

use App\Entity\NotificationLevel;
use App\Entity\SiteNotification;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;
use Twig\Environment;
use Twig\Loader\FilesystemLoader;
use Twig\TwigFunction;

class SiteNotificationTemplateTest extends TestCase
{
    #[DataProvider('levelStyles')]
    public function testItRendersEachAlertLevel(NotificationLevel $level, string $style, string $role): void
    {
        $notification = (new SiteNotification())
            ->setTitle('Scheduled maintenance')
            ->setMessage('The service will be unavailable.')
            ->setLevel($level)
            ->setStartsAt(new \DateTimeImmutable('2026-08-11 07:00:00 UTC'))
            ->setEndsAt(new \DateTimeImmutable('2026-08-16 07:00:00 UTC'));

        $twig = new Environment(
            new FilesystemLoader(dirname(__DIR__, 2).'/templates'),
            ['autoescape' => 'html'],
        );
        $twig->addFunction(new TwigFunction('header_notifications', static fn (): array => [$notification]));

        $html = $twig->render('_partials/_site_notifications.html.twig');

        self::assertStringContainsString($style, $html);
        self::assertStringContainsString(sprintf('role="%s"', $role), $html);
        self::assertStringContainsString('Scheduled maintenance', $html);
    }

    /**
     * @return iterable<string, array{NotificationLevel, string, string}>
     */
    public static function levelStyles(): iterable
    {
        yield 'info' => [NotificationLevel::INFO, 'border-blue-500 bg-blue-50 text-blue-950', 'status'];
        yield 'success' => [NotificationLevel::SUCCESS, 'border-green-500 bg-green-50 text-green-950', 'status'];
        yield 'warning' => [NotificationLevel::WARNING, 'border-amber-500 bg-amber-50 text-amber-950', 'alert'];
        yield 'critical' => [NotificationLevel::CRITICAL, 'border-red-600 bg-red-50 text-red-950', 'alert'];
    }
}
