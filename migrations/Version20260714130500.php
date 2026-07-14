<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20260714130500 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Track direct-share upload lifecycle fields for safe cleanup of interrupted and expired shares.';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE one_time_links ADD expected_file_count INT DEFAULT NULL, ADD created_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', ADD updated_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', ADD upload_completed_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\'');
        $this->addSql('UPDATE one_time_links SET created_at = UTC_TIMESTAMP(), updated_at = UTC_TIMESTAMP()');
        $this->addSql('UPDATE one_time_links SET expected_file_count = JSON_LENGTH(temporary_files), upload_completed_at = UTC_TIMESTAMP() WHERE download_list_id IS NULL AND assets_id IS NULL AND temporary_files IS NOT NULL AND JSON_LENGTH(temporary_files) > 0');
        $this->addSql('ALTER TABLE one_time_links MODIFY created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', MODIFY updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\'');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE one_time_links DROP expected_file_count, DROP created_at, DROP updated_at, DROP upload_completed_at');
    }
}
