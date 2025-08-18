<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250818110142 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE assets (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, file_path VARCHAR(255) NOT NULL, thumbnail_path VARCHAR(255) NOT NULL, mime_type VARCHAR(255) NOT NULL, file_size INT NOT NULL, color_space VARCHAR(255) NOT NULL, status VARCHAR(255) NOT NULL, embargo_date DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', expiration_date DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE assets_assets (assets_source INT NOT NULL, assets_target INT NOT NULL, INDEX IDX_4DD5AC426B8EAEBF (assets_source), INDEX IDX_4DD5AC42726BFE30 (assets_target), PRIMARY KEY(assets_source, assets_target)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE assets_item_codes (assets_id INT NOT NULL, item_codes_id INT NOT NULL, INDEX IDX_3A02E595E6AF163A (assets_id), INDEX IDX_3A02E5958882AD7 (item_codes_id), PRIMARY KEY(assets_id, item_codes_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE assets_brands (assets_id INT NOT NULL, brands_id INT NOT NULL, INDEX IDX_4AA695F8E6AF163A (assets_id), INDEX IDX_4AA695F8E9EEC0C7 (brands_id), PRIMARY KEY(assets_id, brands_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE brands (id INT AUTO_INCREMENT NOT NULL, brands_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, INDEX IDX_7EA24434E9EEC0C7 (brands_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE item_codes (id INT AUTO_INCREMENT NOT NULL, code VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, username VARCHAR(255) NOT NULL, roles JSON NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', available_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', delivered_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_75EA56E0FB7336F0 (queue_name), INDEX IDX_75EA56E0E3BD61CE (available_at), INDEX IDX_75EA56E016BA31DB (delivered_at), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE assets_assets ADD CONSTRAINT FK_4DD5AC426B8EAEBF FOREIGN KEY (assets_source) REFERENCES assets (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE assets_assets ADD CONSTRAINT FK_4DD5AC42726BFE30 FOREIGN KEY (assets_target) REFERENCES assets (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE assets_item_codes ADD CONSTRAINT FK_3A02E595E6AF163A FOREIGN KEY (assets_id) REFERENCES assets (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE assets_item_codes ADD CONSTRAINT FK_3A02E5958882AD7 FOREIGN KEY (item_codes_id) REFERENCES item_codes (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE assets_brands ADD CONSTRAINT FK_4AA695F8E6AF163A FOREIGN KEY (assets_id) REFERENCES assets (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE assets_brands ADD CONSTRAINT FK_4AA695F8E9EEC0C7 FOREIGN KEY (brands_id) REFERENCES brands (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE brands ADD CONSTRAINT FK_7EA24434E9EEC0C7 FOREIGN KEY (brands_id) REFERENCES brands (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE assets_assets DROP FOREIGN KEY FK_4DD5AC426B8EAEBF');
        $this->addSql('ALTER TABLE assets_assets DROP FOREIGN KEY FK_4DD5AC42726BFE30');
        $this->addSql('ALTER TABLE assets_item_codes DROP FOREIGN KEY FK_3A02E595E6AF163A');
        $this->addSql('ALTER TABLE assets_item_codes DROP FOREIGN KEY FK_3A02E5958882AD7');
        $this->addSql('ALTER TABLE assets_brands DROP FOREIGN KEY FK_4AA695F8E6AF163A');
        $this->addSql('ALTER TABLE assets_brands DROP FOREIGN KEY FK_4AA695F8E9EEC0C7');
        $this->addSql('ALTER TABLE brands DROP FOREIGN KEY FK_7EA24434E9EEC0C7');
        $this->addSql('DROP TABLE assets');
        $this->addSql('DROP TABLE assets_assets');
        $this->addSql('DROP TABLE assets_item_codes');
        $this->addSql('DROP TABLE assets_brands');
        $this->addSql('DROP TABLE brands');
        $this->addSql('DROP TABLE item_codes');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
