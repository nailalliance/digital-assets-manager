<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250818192137 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE assets CHANGE thumbnail_path thumbnail_path VARCHAR(255) DEFAULT NULL, CHANGE color_space color_space VARCHAR(255) DEFAULT \'rgb\' NOT NULL, CHANGE status status VARCHAR(255) DEFAULT \'active\' NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE assets CHANGE thumbnail_path thumbnail_path VARCHAR(255) NOT NULL, CHANGE color_space color_space VARCHAR(255) NOT NULL, CHANGE status status VARCHAR(255) NOT NULL');
    }
}
