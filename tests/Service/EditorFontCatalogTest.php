<?php

namespace App\Tests\Service;

use App\Service\EditorFontCatalog;
use PHPUnit\Framework\TestCase;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Filesystem\Filesystem;

class EditorFontCatalogTest extends TestCase
{
    private Filesystem $filesystem;
    private string $projectDir;

    protected function setUp(): void
    {
        $this->filesystem = new Filesystem();
        $this->projectDir = sys_get_temp_dir() . '/editor-font-catalog-test-' . bin2hex(random_bytes(6));
        $this->filesystem->mkdir($this->projectDir . '/assets/fonts/Google');
    }

    protected function tearDown(): void
    {
        $this->filesystem->remove($this->projectDir);
    }

    public function testCatalogDiscoversRepoControlledFontsAndResolvesVariants(): void
    {
        $this->filesystem->touch([
            $this->projectDir . '/assets/fonts/Google/DMSerifText-Regular.ttf',
            $this->projectDir . '/assets/fonts/Google/DMSerifText-BoldItalic.ttf',
            $this->projectDir . '/assets/fonts/Google/RobotoMono-LightItalic.ttf',
        ]);

        $catalog = $this->createCatalog();

        $fontFamilies = $catalog->getSelectableFontFamilies();
        $customFontFaces = $catalog->getCustomFontFaces();

        $this->assertContains('DM Serif Text', $fontFamilies);
        $this->assertContains('Roboto Mono', $fontFamilies);
        $this->assertCount(3, $customFontFaces);
        $this->assertSame(
            realpath($this->projectDir . '/assets/fonts/Google/DMSerifText-BoldItalic.ttf') ?: '',
            $catalog->resolveFontFile('DM Serif Text', 'bold', 'italic')
        );
        $this->assertSame(
            realpath($this->projectDir . '/assets/fonts/Google/RobotoMono-LightItalic.ttf') ?: '',
            $catalog->resolveFontFile('Roboto Mono', 'normal', 'italic')
        );
    }

    public function testCatalogNormalizesUnsupportedFontsToArialAndFindsFacesByKey(): void
    {
        $fontPath = $this->projectDir . '/assets/fonts/Google/CourierPrime-Regular.ttf';
        $this->filesystem->touch($fontPath);

        $catalog = $this->createCatalog();
        $fontFace = $catalog->getCustomFontFaces()[0];

        $this->assertSame('Arial', $catalog->normalizeFontFamily('Missing Font'));
        $this->assertSame('Courier Prime', $catalog->normalizeFontFamily('courier prime'));
        $this->assertSame(realpath($fontPath) ?: '', $catalog->findFontFaceByKey($fontFace['key'])['path']);
    }

    private function createCatalog(): EditorFontCatalog
    {
        $parameterBag = $this->createMock(ParameterBagInterface::class);
        $parameterBag
            ->method('get')
            ->with('kernel.project_dir')
            ->willReturn($this->projectDir);

        return new EditorFontCatalog($parameterBag);
    }
}
