<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250902053743 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE board (id INT AUTO_INCREMENT NOT NULL, owner_id INT NOT NULL, name VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_58562B477E3C61F9 (owner_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE board_collaborator (id INT AUTO_INCREMENT NOT NULL, board_id INT NOT NULL, user_id INT NOT NULL, role VARCHAR(50) NOT NULL, INDEX IDX_A9A3130BE7EC5785 (board_id), INDEX IDX_A9A3130BA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE board_item (id INT AUTO_INCREMENT NOT NULL, board_id INT NOT NULL, type VARCHAR(50) NOT NULL, pos_x INT NOT NULL, pos_y INT NOT NULL, width INT NOT NULL, height INT NOT NULL, content JSON NOT NULL, INDEX IDX_C58D7C3DE7EC5785 (board_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE board ADD CONSTRAINT FK_58562B477E3C61F9 FOREIGN KEY (owner_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE board_collaborator ADD CONSTRAINT FK_A9A3130BE7EC5785 FOREIGN KEY (board_id) REFERENCES board (id)');
        $this->addSql('ALTER TABLE board_collaborator ADD CONSTRAINT FK_A9A3130BA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE board_item ADD CONSTRAINT FK_C58D7C3DE7EC5785 FOREIGN KEY (board_id) REFERENCES board (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE board DROP FOREIGN KEY FK_58562B477E3C61F9');
        $this->addSql('ALTER TABLE board_collaborator DROP FOREIGN KEY FK_A9A3130BE7EC5785');
        $this->addSql('ALTER TABLE board_collaborator DROP FOREIGN KEY FK_A9A3130BA76ED395');
        $this->addSql('ALTER TABLE board_item DROP FOREIGN KEY FK_C58D7C3DE7EC5785');
        $this->addSql('DROP TABLE board');
        $this->addSql('DROP TABLE board_collaborator');
        $this->addSql('DROP TABLE board_item');
    }
}
