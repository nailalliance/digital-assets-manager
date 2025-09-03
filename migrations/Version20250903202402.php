<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250903202402 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE user_brands (user_id INT NOT NULL, brands_id INT NOT NULL, INDEX IDX_1BF05F09A76ED395 (user_id), INDEX IDX_1BF05F09E9EEC0C7 (brands_id), PRIMARY KEY(user_id, brands_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user_brands ADD CONSTRAINT FK_1BF05F09A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_brands ADD CONSTRAINT FK_1BF05F09E9EEC0C7 FOREIGN KEY (brands_id) REFERENCES brands (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user_brands DROP FOREIGN KEY FK_1BF05F09A76ED395');
        $this->addSql('ALTER TABLE user_brands DROP FOREIGN KEY FK_1BF05F09E9EEC0C7');
        $this->addSql('DROP TABLE user_brands');
    }
}
