<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20260811000000 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add scheduled, severity-based header notifications and seed the August 14 maintenance notice.';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE site_notification (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(120) NOT NULL, message VARCHAR(1000) NOT NULL, level VARCHAR(20) NOT NULL, starts_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', ends_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', enabled TINYINT(1) DEFAULT 1 NOT NULL, INDEX IDX_SITE_NOTIFICATION_ACTIVE (enabled, starts_at, ends_at), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql("INSERT INTO site_notification (title, message, level, starts_at, ends_at, enabled) VALUES ('Scheduled maintenance', 'The service will be unavailable Friday, August 14 after 12 PM PDT.', 'warning', '2026-08-11 07:00:00', '2026-08-16 07:00:00', 1)");
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP TABLE site_notification');
    }
}
