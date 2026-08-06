<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20260805120000 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Grant individual users access to designer-only assets through brands and categories.';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE user_designer_access_brands (user_id INT NOT NULL, brand_id INT NOT NULL, INDEX IDX_DESIGNER_BRAND_USER (user_id), INDEX IDX_DESIGNER_BRAND_BRAND (brand_id), PRIMARY KEY(user_id, brand_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_designer_access_categories (user_id INT NOT NULL, category_id INT NOT NULL, INDEX IDX_DESIGNER_CATEGORY_USER (user_id), INDEX IDX_DESIGNER_CATEGORY_CATEGORY (category_id), PRIMARY KEY(user_id, category_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user_designer_access_brands ADD CONSTRAINT FK_DESIGNER_BRAND_USER FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_designer_access_brands ADD CONSTRAINT FK_DESIGNER_BRAND_BRAND FOREIGN KEY (brand_id) REFERENCES brands (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_designer_access_categories ADD CONSTRAINT FK_DESIGNER_CATEGORY_USER FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_designer_access_categories ADD CONSTRAINT FK_DESIGNER_CATEGORY_CATEGORY FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE user_designer_access_brands DROP FOREIGN KEY FK_DESIGNER_BRAND_USER');
        $this->addSql('ALTER TABLE user_designer_access_brands DROP FOREIGN KEY FK_DESIGNER_BRAND_BRAND');
        $this->addSql('ALTER TABLE user_designer_access_categories DROP FOREIGN KEY FK_DESIGNER_CATEGORY_USER');
        $this->addSql('ALTER TABLE user_designer_access_categories DROP FOREIGN KEY FK_DESIGNER_CATEGORY_CATEGORY');
        $this->addSql('DROP TABLE user_designer_access_brands');
        $this->addSql('DROP TABLE user_designer_access_categories');
    }
}
