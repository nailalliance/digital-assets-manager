<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20260910160000 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Store the RGB value extracted from the center of swatch assets.';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE assets ADD rgb VARCHAR(11) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE assets DROP rgb');
    }
}
