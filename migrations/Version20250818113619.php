<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250818113619 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE assets_tags (assets_id INT NOT NULL, tags_id INT NOT NULL, INDEX IDX_D7AC0F37E6AF163A (assets_id), INDEX IDX_D7AC0F378D7B4FB4 (tags_id), PRIMARY KEY(assets_id, tags_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE assets_collections (assets_id INT NOT NULL, collections_id INT NOT NULL, INDEX IDX_DD0B53E3E6AF163A (assets_id), INDEX IDX_DD0B53E3242C7AD2 (collections_id), PRIMARY KEY(assets_id, collections_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE assets_categories (assets_id INT NOT NULL, categories_id INT NOT NULL, INDEX IDX_CFFB7960E6AF163A (assets_id), INDEX IDX_CFFB7960A21214B7 (categories_id), PRIMARY KEY(assets_id, categories_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE categories (id INT AUTO_INCREMENT NOT NULL, categories_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, INDEX IDX_3AF34668A21214B7 (categories_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE collections (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, year INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE groups (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE groups_brands (groups_id INT NOT NULL, brands_id INT NOT NULL, INDEX IDX_AF4880A2F373DCF (groups_id), INDEX IDX_AF4880A2E9EEC0C7 (brands_id), PRIMARY KEY(groups_id, brands_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE groups_categories (groups_id INT NOT NULL, categories_id INT NOT NULL, INDEX IDX_613B3FA8F373DCF (groups_id), INDEX IDX_613B3FA8A21214B7 (categories_id), PRIMARY KEY(groups_id, categories_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE groups_assets (groups_id INT NOT NULL, assets_id INT NOT NULL, INDEX IDX_A83BB918F373DCF (groups_id), INDEX IDX_A83BB918E6AF163A (assets_id), PRIMARY KEY(groups_id, assets_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE lists (id INT AUTO_INCREMENT NOT NULL, creator_id INT NOT NULL, name VARCHAR(255) DEFAULT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_8269FA561220EA6 (creator_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE lists_assets (lists_id INT NOT NULL, assets_id INT NOT NULL, INDEX IDX_F27430199D26499B (lists_id), INDEX IDX_F2743019E6AF163A (assets_id), PRIMARY KEY(lists_id, assets_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE logs (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, asset_id INT NOT NULL, one_time_link_id INT DEFAULT NULL, ip_address VARCHAR(255) NOT NULL, downloaded_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_F08FC65CA76ED395 (user_id), INDEX IDX_F08FC65C5DA1941 (asset_id), INDEX IDX_F08FC65C502F9A06 (one_time_link_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE one_time_links (id INT AUTO_INCREMENT NOT NULL, download_list_id INT DEFAULT NULL, assets_id INT DEFAULT NULL, token VARCHAR(255) NOT NULL, expiration_date DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_D32A8E1E91D0174E (download_list_id), INDEX IDX_D32A8E1EE6AF163A (assets_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE tags (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_groups (user_id INT NOT NULL, groups_id INT NOT NULL, INDEX IDX_953F224DA76ED395 (user_id), INDEX IDX_953F224DF373DCF (groups_id), PRIMARY KEY(user_id, groups_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE assets_tags ADD CONSTRAINT FK_D7AC0F37E6AF163A FOREIGN KEY (assets_id) REFERENCES assets (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE assets_tags ADD CONSTRAINT FK_D7AC0F378D7B4FB4 FOREIGN KEY (tags_id) REFERENCES tags (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE assets_collections ADD CONSTRAINT FK_DD0B53E3E6AF163A FOREIGN KEY (assets_id) REFERENCES assets (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE assets_collections ADD CONSTRAINT FK_DD0B53E3242C7AD2 FOREIGN KEY (collections_id) REFERENCES collections (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE assets_categories ADD CONSTRAINT FK_CFFB7960E6AF163A FOREIGN KEY (assets_id) REFERENCES assets (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE assets_categories ADD CONSTRAINT FK_CFFB7960A21214B7 FOREIGN KEY (categories_id) REFERENCES categories (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE categories ADD CONSTRAINT FK_3AF34668A21214B7 FOREIGN KEY (categories_id) REFERENCES categories (id)');
        $this->addSql('ALTER TABLE groups_brands ADD CONSTRAINT FK_AF4880A2F373DCF FOREIGN KEY (groups_id) REFERENCES groups (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE groups_brands ADD CONSTRAINT FK_AF4880A2E9EEC0C7 FOREIGN KEY (brands_id) REFERENCES brands (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE groups_categories ADD CONSTRAINT FK_613B3FA8F373DCF FOREIGN KEY (groups_id) REFERENCES groups (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE groups_categories ADD CONSTRAINT FK_613B3FA8A21214B7 FOREIGN KEY (categories_id) REFERENCES categories (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE groups_assets ADD CONSTRAINT FK_A83BB918F373DCF FOREIGN KEY (groups_id) REFERENCES groups (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE groups_assets ADD CONSTRAINT FK_A83BB918E6AF163A FOREIGN KEY (assets_id) REFERENCES assets (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE lists ADD CONSTRAINT FK_8269FA561220EA6 FOREIGN KEY (creator_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE lists_assets ADD CONSTRAINT FK_F27430199D26499B FOREIGN KEY (lists_id) REFERENCES lists (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE lists_assets ADD CONSTRAINT FK_F2743019E6AF163A FOREIGN KEY (assets_id) REFERENCES assets (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE logs ADD CONSTRAINT FK_F08FC65CA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE logs ADD CONSTRAINT FK_F08FC65C5DA1941 FOREIGN KEY (asset_id) REFERENCES assets (id)');
        $this->addSql('ALTER TABLE logs ADD CONSTRAINT FK_F08FC65C502F9A06 FOREIGN KEY (one_time_link_id) REFERENCES one_time_links (id)');
        $this->addSql('ALTER TABLE one_time_links ADD CONSTRAINT FK_D32A8E1E91D0174E FOREIGN KEY (download_list_id) REFERENCES lists (id)');
        $this->addSql('ALTER TABLE one_time_links ADD CONSTRAINT FK_D32A8E1EE6AF163A FOREIGN KEY (assets_id) REFERENCES assets (id)');
        $this->addSql('ALTER TABLE user_groups ADD CONSTRAINT FK_953F224DA76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_groups ADD CONSTRAINT FK_953F224DF373DCF FOREIGN KEY (groups_id) REFERENCES groups (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE assets_tags DROP FOREIGN KEY FK_D7AC0F37E6AF163A');
        $this->addSql('ALTER TABLE assets_tags DROP FOREIGN KEY FK_D7AC0F378D7B4FB4');
        $this->addSql('ALTER TABLE assets_collections DROP FOREIGN KEY FK_DD0B53E3E6AF163A');
        $this->addSql('ALTER TABLE assets_collections DROP FOREIGN KEY FK_DD0B53E3242C7AD2');
        $this->addSql('ALTER TABLE assets_categories DROP FOREIGN KEY FK_CFFB7960E6AF163A');
        $this->addSql('ALTER TABLE assets_categories DROP FOREIGN KEY FK_CFFB7960A21214B7');
        $this->addSql('ALTER TABLE categories DROP FOREIGN KEY FK_3AF34668A21214B7');
        $this->addSql('ALTER TABLE groups_brands DROP FOREIGN KEY FK_AF4880A2F373DCF');
        $this->addSql('ALTER TABLE groups_brands DROP FOREIGN KEY FK_AF4880A2E9EEC0C7');
        $this->addSql('ALTER TABLE groups_categories DROP FOREIGN KEY FK_613B3FA8F373DCF');
        $this->addSql('ALTER TABLE groups_categories DROP FOREIGN KEY FK_613B3FA8A21214B7');
        $this->addSql('ALTER TABLE groups_assets DROP FOREIGN KEY FK_A83BB918F373DCF');
        $this->addSql('ALTER TABLE groups_assets DROP FOREIGN KEY FK_A83BB918E6AF163A');
        $this->addSql('ALTER TABLE lists DROP FOREIGN KEY FK_8269FA561220EA6');
        $this->addSql('ALTER TABLE lists_assets DROP FOREIGN KEY FK_F27430199D26499B');
        $this->addSql('ALTER TABLE lists_assets DROP FOREIGN KEY FK_F2743019E6AF163A');
        $this->addSql('ALTER TABLE logs DROP FOREIGN KEY FK_F08FC65CA76ED395');
        $this->addSql('ALTER TABLE logs DROP FOREIGN KEY FK_F08FC65C5DA1941');
        $this->addSql('ALTER TABLE logs DROP FOREIGN KEY FK_F08FC65C502F9A06');
        $this->addSql('ALTER TABLE one_time_links DROP FOREIGN KEY FK_D32A8E1E91D0174E');
        $this->addSql('ALTER TABLE one_time_links DROP FOREIGN KEY FK_D32A8E1EE6AF163A');
        $this->addSql('ALTER TABLE user_groups DROP FOREIGN KEY FK_953F224DA76ED395');
        $this->addSql('ALTER TABLE user_groups DROP FOREIGN KEY FK_953F224DF373DCF');
        $this->addSql('DROP TABLE assets_tags');
        $this->addSql('DROP TABLE assets_collections');
        $this->addSql('DROP TABLE assets_categories');
        $this->addSql('DROP TABLE categories');
        $this->addSql('DROP TABLE collections');
        $this->addSql('DROP TABLE groups');
        $this->addSql('DROP TABLE groups_brands');
        $this->addSql('DROP TABLE groups_categories');
        $this->addSql('DROP TABLE groups_assets');
        $this->addSql('DROP TABLE lists');
        $this->addSql('DROP TABLE lists_assets');
        $this->addSql('DROP TABLE logs');
        $this->addSql('DROP TABLE one_time_links');
        $this->addSql('DROP TABLE tags');
        $this->addSql('DROP TABLE user_groups');
    }
}
