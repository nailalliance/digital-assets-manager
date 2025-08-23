<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250823050321 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE one_time_links ADD creator_id INT DEFAULT NULL, ADD temporary_files JSON DEFAULT NULL');
        $this->addSql('ALTER TABLE one_time_links ADD CONSTRAINT FK_D32A8E1E61220EA6 FOREIGN KEY (creator_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_D32A8E1E61220EA6 ON one_time_links (creator_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE one_time_links DROP FOREIGN KEY FK_D32A8E1E61220EA6');
        $this->addSql('DROP INDEX IDX_D32A8E1E61220EA6 ON one_time_links');
        $this->addSql('ALTER TABLE one_time_links DROP creator_id, DROP temporary_files');
    }
}
