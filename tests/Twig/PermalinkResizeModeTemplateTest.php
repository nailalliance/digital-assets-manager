<?php

namespace App\Tests\Twig;

use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;

class PermalinkResizeModeTemplateTest extends TestCase
{
    #[DataProvider('webLinkTemplates')]
    public function testWebLinkSettingsOfferBothResizeBehaviors(string $templatePath): void
    {
        $template = file_get_contents($templatePath);

        $this->assertIsString($template);
        $this->assertStringContainsString('data-permalink-generator-target="resizeModeInput"', $template);
        $this->assertStringContainsString('<option value="extend-canvas">Extend Canvas to Fit</option>', $template);
        $this->assertStringContainsString('<option value="crop-inside-middle">Fill and Center Crop</option>', $template);
    }

    /**
     * @return iterable<string, array{string}>
     */
    public static function webLinkTemplates(): iterable
    {
        $templatesDir = dirname(__DIR__, 2) . '/templates';

        yield 'download list' => [$templatesDir . '/download_list/index.html.twig'];
        yield 'public share list' => [$templatesDir . '/public_download_list/index.html.twig'];
    }
}
