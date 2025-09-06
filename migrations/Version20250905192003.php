<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250905192003 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE assets ADD parent_id INT DEFAULT NULL, ADD asset_version_type_enum VARCHAR(50) DEFAULT NULL');
        $this->addSql('ALTER TABLE assets ADD CONSTRAINT FK_79D17D8E727ACA70 FOREIGN KEY (parent_id) REFERENCES assets (id) ON DELETE SET NULL');
        $this->addSql('CREATE INDEX IDX_79D17D8E727ACA70 ON assets (parent_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE assets DROP FOREIGN KEY FK_79D17D8E727ACA70');
        $this->addSql('DROP INDEX IDX_79D17D8E727ACA70 ON assets');
        $this->addSql('ALTER TABLE assets DROP parent_id, DROP asset_version_type_enum');
    }
}
