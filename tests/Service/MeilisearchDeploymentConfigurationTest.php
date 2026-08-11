<?php

namespace App\Tests\Service;

use PHPUnit\Framework\TestCase;
use Symfony\Component\Yaml\Yaml;

final class MeilisearchDeploymentConfigurationTest extends TestCase
{
    public function testAccessFieldsAreConfiguredAsFilterable(): void
    {
        $configuration = Yaml::parseFile(
            dirname(__DIR__, 2) . '/config/packages/meilisearch.yaml'
        );
        $index = $configuration['meilisearch']['indices'][0];
        $filterable = $index['settings']['filterableAttributes'];

        self::assertSame('assets', $index['name']);
        self::assertContains('brand_access_ids', $filterable);
        self::assertContains('category_access_ids', $filterable);
    }

    public function testDeploymentSyncUpdatesSettingsAndAtomicallySwaps(): void
    {
        $composer = json_decode(
            file_get_contents(dirname(__DIR__, 2) . '/composer.json'),
            true,
            flags: JSON_THROW_ON_ERROR
        );
        $command = $composer['scripts']['meilisearch-sync'];

        self::assertStringContainsString('--indices=assets', $command);
        self::assertStringContainsString('--update-settings', $command);
        self::assertStringContainsString('--swap-indices', $command);
        self::assertStringContainsString('--env=prod', $command);
    }
}
