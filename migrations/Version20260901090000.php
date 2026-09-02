<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20260901090000 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Track the asynchronous browser-ready video rendition for each original video asset.';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE assets ADD web_video_status VARCHAR(20) DEFAULT NULL, ADD web_video_error LONGTEXT DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE assets DROP web_video_status, DROP web_video_error');
    }
}
