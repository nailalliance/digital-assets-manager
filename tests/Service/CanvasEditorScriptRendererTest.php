<?php

namespace App\Tests\Service;

use App\Service\CanvasEditorScriptRenderer;
use App\Service\EditorFontCatalog;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Filesystem\Filesystem;

class CanvasEditorScriptRendererTest extends TestCase
{
    #[DataProvider('fontFallbackProvider')]
    public function testResolveFontReferenceUsesFamilyAppropriateBundledFallback(
        string $fontFamily,
        string $fontWeight,
        string $fontStyle,
        string $expectedSuffix
    ): void {
        $filesystem = $this->createMock(Filesystem::class);
        $filesystem
            ->method('exists')
            ->willReturnCallback(
                static fn (string $path): bool => str_ends_with($path, $expectedSuffix)
            );

        $parameterBag = $this->createMock(ParameterBagInterface::class);
        $parameterBag
            ->method('get')
            ->with('kernel.project_dir')
            ->willReturn('/project');

        $renderer = new CanvasEditorScriptRenderer($filesystem, $parameterBag);
        $resolveFontReference = \Closure::bind(
            function (string $family, string $weight, string $style): string {
                return $this->resolveFontReference($family, $weight, $style);
            },
            $renderer,
            CanvasEditorScriptRenderer::class
        );

        $resolvedFont = $resolveFontReference($fontFamily, $fontWeight, $fontStyle);

        $this->assertSame('/project/public/standard_fonts/' . $expectedSuffix, $resolvedFont);
    }

    /**
     * @return iterable<string, array{string, string, string, string}>
     */
    public static function fontFallbackProvider(): iterable
    {
        yield 'courier new uses bundled monospace fallback' => [
            'Courier New',
            'normal',
            'normal',
            'FoxitFixed.pfb',
        ];

        yield 'times new roman uses bundled serif fallback' => [
            'Times New Roman',
            'bold',
            'italic',
            'FoxitSerifBoldItalic.pfb',
        ];

        yield 'arial uses bundled sans fallback' => [
            'Arial',
            'bold',
            'normal',
            'LiberationSans-Bold.ttf',
        ];
    }

    public function testResolveFontReferencePrefersRepoControlledCustomFontFile(): void
    {
        $projectDir = sys_get_temp_dir() . '/canvas-editor-renderer-test-' . bin2hex(random_bytes(6));
        $fontPath = $projectDir . '/assets/fonts/CourierPrime/CourierPrime-BoldItalic.ttf';
        $filesystem = new Filesystem();
        $filesystem->mkdir(dirname($fontPath));
        $filesystem->touch($fontPath);

        $parameterBag = $this->createMock(ParameterBagInterface::class);
        $parameterBag
            ->method('get')
            ->with('kernel.project_dir')
            ->willReturn($projectDir);

        $fontCatalog = new EditorFontCatalog($parameterBag);
        $renderer = new CanvasEditorScriptRenderer($filesystem, $parameterBag, $fontCatalog);

        try {
            $resolveFontReference = \Closure::bind(
                function (string $family, string $weight, string $style): string {
                    return $this->resolveFontReference($family, $weight, $style);
                },
                $renderer,
                CanvasEditorScriptRenderer::class
            );

            $resolvedFont = $resolveFontReference('Courier Prime', 'bold', 'italic');

            $this->assertSame(realpath($fontPath) ?: '', $resolvedFont);
        } finally {
            $filesystem->remove($projectDir);
        }
    }
}
