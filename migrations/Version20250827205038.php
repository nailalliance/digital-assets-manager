<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250827205038 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE social_media_portals (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_71D59B595E237E06 (name), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE social_media_posts (id INT AUTO_INCREMENT NOT NULL, portal_id INT NOT NULL, brand_id INT NOT NULL, title VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, content LONGTEXT NOT NULL, post_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_E2E08E65B887E1DD (portal_id), INDEX IDX_E2E08E6544F5D008 (brand_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE social_media_post_assets (posts_id INT NOT NULL, assets_id INT NOT NULL, INDEX IDX_5B3AFB8AD5E258C5 (posts_id), INDEX IDX_5B3AFB8AE6AF163A (assets_id), PRIMARY KEY(posts_id, assets_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE social_media_posts ADD CONSTRAINT FK_E2E08E65B887E1DD FOREIGN KEY (portal_id) REFERENCES social_media_portals (id)');
        $this->addSql('ALTER TABLE social_media_posts ADD CONSTRAINT FK_E2E08E6544F5D008 FOREIGN KEY (brand_id) REFERENCES brands (id)');
        $this->addSql('ALTER TABLE social_media_post_assets ADD CONSTRAINT FK_5B3AFB8AD5E258C5 FOREIGN KEY (posts_id) REFERENCES social_media_posts (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE social_media_post_assets ADD CONSTRAINT FK_5B3AFB8AE6AF163A FOREIGN KEY (assets_id) REFERENCES assets (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE social_media_posts DROP FOREIGN KEY FK_E2E08E65B887E1DD');
        $this->addSql('ALTER TABLE social_media_posts DROP FOREIGN KEY FK_E2E08E6544F5D008');
        $this->addSql('ALTER TABLE social_media_post_assets DROP FOREIGN KEY FK_5B3AFB8AD5E258C5');
        $this->addSql('ALTER TABLE social_media_post_assets DROP FOREIGN KEY FK_5B3AFB8AE6AF163A');
        $this->addSql('DROP TABLE social_media_portals');
        $this->addSql('DROP TABLE social_media_posts');
        $this->addSql('DROP TABLE social_media_post_assets');
    }
}
