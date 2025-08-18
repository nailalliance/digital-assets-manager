<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250818110943 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE assets ADD uploader_id INT NOT NULL');
        $this->addSql('ALTER TABLE assets ADD CONSTRAINT FK_79D17D8E16678C77 FOREIGN KEY (uploader_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_79D17D8E16678C77 ON assets (uploader_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE assets DROP FOREIGN KEY FK_79D17D8E16678C77');
        $this->addSql('DROP INDEX IDX_79D17D8E16678C77 ON assets');
        $this->addSql('ALTER TABLE assets DROP uploader_id');
    }
}
