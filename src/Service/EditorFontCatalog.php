<?php

namespace App\Service;

use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

final class EditorFontCatalog
{
    public const SYSTEM_FONTS = [
        'Arial',
        'Helvetica',
        'Georgia',
        'Times New Roman',
        'Trebuchet MS',
        'Verdana',
        'Tahoma',
        'Courier New',
        'Impact',
    ];

    private const DEFAULT_FONT_FAMILY = 'Arial';
    private const SUPPORTED_EXTENSIONS = [
        'ttf' => [
            'cssFormat' => 'truetype',
            'mimeType' => 'font/ttf',
        ],
        'otf' => [
            'cssFormat' => 'opentype',
            'mimeType' => 'font/otf',
        ],
    ];

    private readonly string $fontDirectory;

    /**
     * @var array{
     *     customFaces: list<array{
     *         key: string,
     *         family: string,
     *         weight: string,
     *         style: string,
     *         cssFormat: string,
     *         mimeType: string,
     *         path: string,
     *         relativePath: string
     *     }>,
     *     facesByKey: array<string, array{
     *         key: string,
     *         family: string,
     *         weight: string,
     *         style: string,
     *         cssFormat: string,
     *         mimeType: string,
     *         path: string,
     *         relativePath: string
     *     }>,
     *     facesByFamily: array<string, list<array{
     *         key: string,
     *         family: string,
     *         weight: string,
     *         style: string,
     *         cssFormat: string,
     *         mimeType: string,
     *         path: string,
     *         relativePath: string
     *     }>>,
     *     selectableFamilies: list<string>
     * }|null
     */
    private ?array $manifest = null;

    public function __construct(ParameterBagInterface $parameterBag)
    {
        $this->fontDirectory = rtrim((string) $parameterBag->get('kernel.project_dir'), '/') . '/assets/fonts';
    }

    /**
     * @return list<string>
     */
    public function getSelectableFontFamilies(): array
    {
        return $this->buildManifest()['selectableFamilies'];
    }

    /**
     * @return list<array{
     *     key: string,
     *     family: string,
     *     weight: string,
     *     style: string,
     *     cssFormat: string,
     *     mimeType: string,
     *     path: string,
     *     relativePath: string
     * }>
     */
    public function getCustomFontFaces(): array
    {
        return $this->buildManifest()['customFaces'];
    }

    /**
     * @return array{
     *     key: string,
     *     family: string,
     *     weight: string,
     *     style: string,
     *     cssFormat: string,
     *     mimeType: string,
     *     path: string,
     *     relativePath: string
     * }|null
     */
    public function findFontFaceByKey(string $fontKey): ?array
    {
        return $this->buildManifest()['facesByKey'][$fontKey] ?? null;
    }

    public function normalizeFontFamily(?string $fontFamily): string
    {
        $requestedFamily = trim((string) $fontFamily);
        if ($requestedFamily === '') {
            return self::DEFAULT_FONT_FAMILY;
        }

        $normalizedFamilies = [];
        foreach ($this->getSelectableFontFamilies() as $availableFamily) {
            $normalizedFamilies[strtolower($availableFamily)] = $availableFamily;
        }

        return $normalizedFamilies[strtolower($requestedFamily)] ?? self::DEFAULT_FONT_FAMILY;
    }

    public function resolveFontFile(string $fontFamily, string $fontWeight, string $fontStyle): ?string
    {
        $familyFaces = $this->buildManifest()['facesByFamily'][strtolower($fontFamily)] ?? [];
        if ($familyFaces === []) {
            return null;
        }

        $desiredWeight = $fontWeight === 'bold' ? 700 : 400;
        $desiredStyle = $fontStyle === 'italic' ? 'italic' : 'normal';

        usort($familyFaces, function (array $left, array $right) use ($desiredWeight, $desiredStyle): int {
            $leftScore = $this->scoreFontFace($left, $desiredWeight, $desiredStyle);
            $rightScore = $this->scoreFontFace($right, $desiredWeight, $desiredStyle);

            if ($leftScore !== $rightScore) {
                return $leftScore <=> $rightScore;
            }

            return [$left['family'], $left['relativePath']] <=> [$right['family'], $right['relativePath']];
        });

        return $familyFaces[0]['path'] ?? null;
    }

    /**
     * @return array{
     *     customFaces: list<array{
     *         key: string,
     *         family: string,
     *         weight: string,
     *         style: string,
     *         cssFormat: string,
     *         mimeType: string,
     *         path: string,
     *         relativePath: string
     *     }>,
     *     facesByKey: array<string, array{
     *         key: string,
     *         family: string,
     *         weight: string,
     *         style: string,
     *         cssFormat: string,
     *         mimeType: string,
     *         path: string,
     *         relativePath: string
     *     }>,
     *     facesByFamily: array<string, list<array{
     *         key: string,
     *         family: string,
     *         weight: string,
     *         style: string,
     *         cssFormat: string,
     *         mimeType: string,
     *         path: string,
     *         relativePath: string
     *     }>>,
     *     selectableFamilies: list<string>
     * }
     */
    private function buildManifest(): array
    {
        if ($this->manifest !== null) {
            return $this->manifest;
        }

        $customFaces = [];
        $facesByKey = [];
        $facesByFamily = [];

        if (is_dir($this->fontDirectory)) {
            $directoryIterator = new \RecursiveDirectoryIterator($this->fontDirectory, \FilesystemIterator::SKIP_DOTS);
            $iterator = new \RecursiveIteratorIterator($directoryIterator);
            $fontFiles = [];

            foreach ($iterator as $file) {
                if (!$file instanceof \SplFileInfo || !$file->isFile()) {
                    continue;
                }

                $extension = strtolower($file->getExtension());
                if (!isset(self::SUPPORTED_EXTENSIONS[$extension])) {
                    continue;
                }

                $realPath = $file->getRealPath();
                if ($realPath === false) {
                    continue;
                }

                $relativePath = ltrim(str_replace('\\', '/', substr($realPath, strlen($this->fontDirectory))), '/');
                $fontFiles[] = [
                    'extension' => $extension,
                    'path' => $realPath,
                    'relativePath' => $relativePath,
                ];
            }

            usort($fontFiles, static fn (array $left, array $right): int => $left['relativePath'] <=> $right['relativePath']);

            foreach ($fontFiles as $fontFile) {
                $fontFace = $this->buildCustomFontFace($fontFile['relativePath'], $fontFile['path'], $fontFile['extension']);
                $customFaces[] = $fontFace;
                $facesByKey[$fontFace['key']] = $fontFace;
                $facesByFamily[strtolower($fontFace['family'])][] = $fontFace;
            }
        }

        usort($customFaces, static fn (array $left, array $right): int => [
            strtolower($left['family']),
            (int) $left['weight'],
            $left['style'],
            $left['relativePath'],
        ] <=> [
            strtolower($right['family']),
            (int) $right['weight'],
            $right['style'],
            $right['relativePath'],
        ]);

        $selectableFamilies = self::SYSTEM_FONTS;
        foreach ($customFaces as $fontFace) {
            if (!in_array($fontFace['family'], $selectableFamilies, true)) {
                $selectableFamilies[] = $fontFace['family'];
            }
        }

        $this->manifest = [
            'customFaces' => $customFaces,
            'facesByKey' => $facesByKey,
            'facesByFamily' => $facesByFamily,
            'selectableFamilies' => $selectableFamilies,
        ];

        return $this->manifest;
    }

    /**
     * @return array{
     *     key: string,
     *     family: string,
     *     weight: string,
     *     style: string,
     *     cssFormat: string,
     *     mimeType: string,
     *     path: string,
     *     relativePath: string
     * }
     */
    private function buildCustomFontFace(string $relativePathname, string $realPath, string $extension): array
    {
        $relativePath = str_replace('\\', '/', $relativePathname);
        $fileStem = pathinfo($relativePath, \PATHINFO_FILENAME);
        $cleanStem = $this->sanitizeFontStem($fileStem);
        $parts = preg_split('/-+/', $cleanStem) ?: [];
        $familyPart = trim((string) array_shift($parts));
        $variantPart = trim(implode(' ', $parts));
        $family = $this->humanizeFontFamily($familyPart !== '' ? $familyPart : $fileStem);
        $variantTokens = $this->normalizeVariantTokens($variantPart);

        return [
            'key' => substr(sha1($relativePath), 0, 16),
            'family' => $family !== '' ? $family : self::DEFAULT_FONT_FAMILY,
            'weight' => $this->resolveVariantWeight($variantTokens),
            'style' => $this->resolveVariantStyle($variantTokens),
            'cssFormat' => self::SUPPORTED_EXTENSIONS[$extension]['cssFormat'],
            'mimeType' => self::SUPPORTED_EXTENSIONS[$extension]['mimeType'],
            'path' => $realPath,
            'relativePath' => $relativePath,
        ];
    }

    private function sanitizeFontStem(string $fileStem): string
    {
        $cleanStem = preg_replace('/\[[^\]]+\]/', '', $fileStem) ?? $fileStem;
        $cleanStem = preg_replace('/VariableFont(?:_[A-Za-z0-9,]+)?/i', '', $cleanStem) ?? $cleanStem;

        return trim($cleanStem, " \t\n\r\0\x0B-_");
    }

    private function humanizeFontFamily(string $value): string
    {
        $spacedValue = preg_replace('/(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])/', ' ', $value) ?? $value;
        $spacedValue = str_replace(['_', '-'], ' ', $spacedValue);

        return preg_replace('/\s+/', ' ', trim($spacedValue)) ?? trim($spacedValue);
    }

    private function normalizeVariantTokens(string $value): string
    {
        return strtolower($this->humanizeFontFamily($value));
    }

    private function resolveVariantWeight(string $variantTokens): string
    {
        return match (true) {
            preg_match('/\b(thin|hairline)\b/', $variantTokens) === 1 => '100',
            preg_match('/\b(extra light|extralight|ultra light|ultralight)\b/', $variantTokens) === 1 => '200',
            preg_match('/\blight\b/', $variantTokens) === 1 => '300',
            preg_match('/\bmedium\b/', $variantTokens) === 1 => '500',
            preg_match('/\b(semi bold|semibold|demi bold|demibold)\b/', $variantTokens) === 1 => '600',
            preg_match('/\b(extra bold|extrabold|ultra bold|ultrabold)\b/', $variantTokens) === 1 => '800',
            preg_match('/\b(black|heavy)\b/', $variantTokens) === 1 => '900',
            preg_match('/\bbold\b/', $variantTokens) === 1 => '700',
            default => '400',
        };
    }

    private function resolveVariantStyle(string $variantTokens): string
    {
        return preg_match('/\b(italic|oblique)\b/', $variantTokens) === 1 ? 'italic' : 'normal';
    }

    /**
     * @param array{weight: string, style: string} $fontFace
     */
    private function scoreFontFace(array $fontFace, int $desiredWeight, string $desiredStyle): int
    {
        $weight = (int) $fontFace['weight'];
        $score = abs($weight - $desiredWeight);

        if ($fontFace['style'] !== $desiredStyle) {
            $score += 1000;
        }

        if (($desiredWeight >= 600) !== ($weight >= 600)) {
            $score += 100;
        }

        return $score;
    }
}
