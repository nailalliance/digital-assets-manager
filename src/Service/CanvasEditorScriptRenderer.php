<?php

namespace App\Service;

use App\Entity\Assets\Assets;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Filesystem\Filesystem;

final class CanvasEditorScriptRenderer
{
    public const SUPPORTED_MIME_TYPES = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/gif',
    ];

    private const SUPPORTED_FONTS = [
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

    private const MIN_IMAGE_SCALE = 0.2;
    private const MAX_IMAGE_SCALE = 4.0;
    private const MIN_GEOMETRY_SIZE = 40.0;
    private const MAX_OUTPUT_DIMENSION = 12000;
    private const MAX_OUTPUT_PIXELS = 100000000;
    private const MAX_TEXT_LAYERS = 100;

    private readonly string $projectDir;

    public function __construct(
        private readonly Filesystem $filesystem,
        ParameterBagInterface $parameterBag,
        private readonly ?EditorFontCatalog $editorFontCatalog = null,
    ) {
        $this->projectDir = rtrim((string) $parameterBag->get('kernel.project_dir'), '/');
    }

    /**
     * @return array<string, mixed>
     */
    public function parseScript(string $rawScript): array
    {
        $rawScript = trim($rawScript);

        if ($rawScript === '') {
            throw new \InvalidArgumentException('Paste an editor script before downloading.');
        }

        try {
            $parsedScript = json_decode($rawScript, true, 512, \JSON_THROW_ON_ERROR);
        } catch (\JsonException) {
            throw new \InvalidArgumentException('The script is not valid JSON.');
        }

        if (!is_array($parsedScript) || ($parsedScript['version'] ?? null) !== 1) {
            throw new \InvalidArgumentException('Only version 1 editor scripts can be applied.');
        }

        if (
            !isset($parsedScript['baseImage'], $parsedScript['texts'])
            || !is_array($parsedScript['baseImage'])
            || !is_array($parsedScript['texts'])
        ) {
            throw new \InvalidArgumentException('The script is missing one or more required fields.');
        }

        if (array_key_exists('crop', $parsedScript) && $parsedScript['crop'] !== null && !is_array($parsedScript['crop'])) {
            throw new \InvalidArgumentException('The script crop values are invalid.');
        }

        return $parsedScript;
    }

    public function supportsMimeType(?string $mimeType): bool
    {
        return in_array($mimeType, self::SUPPORTED_MIME_TYPES, true);
    }

    public function getOutputExtensionForMimeType(string $inputMimeType): string
    {
        return $this->resolveOutputExtension($this->resolveOutputMimeType($inputMimeType));
    }

    /**
     * @param array<string, mixed> $parsedScript
     *
     * @return array{path: string, extension: string, mimeType: string}
     */
    public function renderAssetToTempFile(Assets $asset, array $parsedScript): array
    {
        if (!class_exists(\Imagick::class)) {
            throw new \RuntimeException('Imagick is required to render scripted downloads.');
        }

        $sourcePath = $asset->getFilePath();
        if (!is_string($sourcePath) || $sourcePath === '' || !$this->filesystem->exists($sourcePath)) {
            throw new \RuntimeException('Source file not found.');
        }

        $mimeType = (string) $asset->getMimeType();
        if (!$this->supportsMimeType($mimeType)) {
            throw new \RuntimeException(sprintf('The asset mime type "%s" is not supported.', $mimeType));
        }

        $sourceImage = $this->loadSourceImage($sourcePath, $mimeType);

        try {
            $sourceWidth = max(1, $sourceImage->getImageWidth());
            $sourceHeight = max(1, $sourceImage->getImageHeight());
            $normalizedState = $this->buildRenderableState($parsedScript, $sourceWidth, $sourceHeight);
            $outputMimeType = $this->resolveOutputMimeType($mimeType);
            $outputExtension = $this->resolveOutputExtension($outputMimeType);
            $exportCanvas = $this->renderCanvas($sourceImage, $normalizedState, $outputMimeType);
            $tempPath = $this->buildTemporaryOutputPath($outputExtension);

            try {
                $exportCanvas->writeImage($tempPath);
            } finally {
                $exportCanvas->clear();
                $exportCanvas->destroy();
            }

            return [
                'path' => $tempPath,
                'extension' => $outputExtension,
                'mimeType' => $outputMimeType,
            ];
        } finally {
            $sourceImage->clear();
            $sourceImage->destroy();
        }
    }

    /**
     * @param array<string, mixed> $parsedScript
     *
     * @return array{stream: resource, extension: string, mimeType: string}
     */
    public function renderAssetToStream(Assets $asset, array $parsedScript): array
    {
        if (!class_exists(\Imagick::class)) {
            throw new \RuntimeException('Imagick is required to render scripted downloads.');
        }

        $sourcePath = $asset->getFilePath();
        if (!is_string($sourcePath) || $sourcePath === '' || !$this->filesystem->exists($sourcePath)) {
            throw new \RuntimeException('Source file not found.');
        }

        $mimeType = (string) $asset->getMimeType();
        if (!$this->supportsMimeType($mimeType)) {
            throw new \RuntimeException(sprintf('The asset mime type "%s" is not supported.', $mimeType));
        }

        $sourceImage = $this->loadSourceImage($sourcePath, $mimeType);

        try {
            $sourceWidth = max(1, $sourceImage->getImageWidth());
            $sourceHeight = max(1, $sourceImage->getImageHeight());
            $normalizedState = $this->buildRenderableState($parsedScript, $sourceWidth, $sourceHeight);
            $outputMimeType = $this->resolveOutputMimeType($mimeType);
            $outputExtension = $this->resolveOutputExtension($outputMimeType);
            $exportCanvas = $this->renderCanvas($sourceImage, $normalizedState, $outputMimeType);

            try {
                $stream = tmpfile();
                if ($stream === false) {
                    throw new \RuntimeException('A temporary stream could not be created for the scripted download.');
                }

                $blob = $exportCanvas->getImageBlob();
                if (fwrite($stream, $blob) === false) {
                    fclose($stream);
                    throw new \RuntimeException('The scripted image stream could not be written.');
                }
                unset($blob);

                if (rewind($stream) === false) {
                    fclose($stream);
                    throw new \RuntimeException('The scripted image stream could not be rewound.');
                }

                return [
                    'stream' => $stream,
                    'extension' => $outputExtension,
                    'mimeType' => $outputMimeType,
                ];
            } finally {
                $exportCanvas->clear();
                $exportCanvas->destroy();
            }
        } finally {
            $sourceImage->clear();
            $sourceImage->destroy();
        }
    }

    private function loadSourceImage(string $sourcePath, string $mimeType): \Imagick
    {
        $image = new \Imagick();

        try {
            $image->readImage($mimeType === 'image/gif' ? $sourcePath . '[0]' : $sourcePath);
            if (method_exists($image, 'autoOrientImage')) {
                $image->autoOrientImage();
            }
            if ($image->getImageColorspace() === \Imagick::COLORSPACE_CMYK) {
                $image->transformImageColorspace(\Imagick::COLORSPACE_SRGB);
            }
            $image->setImageColorspace(\Imagick::COLORSPACE_SRGB);

            return $image;
        } catch (\ImagickException $exception) {
            throw new \RuntimeException('The source image could not be loaded.', previous: $exception);
        }
    }

    /**
     * @param array<string, mixed> $parsedScript
     *
     * @return array{
     *     crop: array{left: float, top: float, width: float, height: float},
     *     baseImage: array{scale: float, offsetX: float, offsetY: float},
     *     texts: list<array{
     *         text: string,
     *         left: float,
     *         top: float,
     *         width: float,
     *         height: float,
     *         fontFamily: string,
     *         fontSize: float,
     *         color: string,
     *         fontWeight: string,
     *         fontStyle: string,
     *         textAlign: string
     *     }>
     * }
     */
    private function buildRenderableState(array $parsedScript, int $sourceWidth, int $sourceHeight): array
    {
        $scriptSourceHeight = $this->toFiniteFloat($parsedScript['sourceBounds']['height'] ?? null);
        $sourceHeightRatio = $scriptSourceHeight && $scriptSourceHeight > 0
            ? $sourceHeight / $scriptSourceHeight
            : 1.0;

        $cropLeft = 0.0;
        $cropTop = 0.0;
        $cropPixelWidth = (float) $sourceWidth;
        $cropPixelHeight = (float) $sourceHeight;
        $rawCrop = $parsedScript['crop'] ?? null;

        if (is_array($rawCrop)) {
            $cropX = $this->toFiniteFloat($rawCrop['x'] ?? null);
            $cropY = $this->toFiniteFloat($rawCrop['y'] ?? null);
            $cropWidth = $this->toFiniteFloat($rawCrop['width'] ?? null);
            $cropHeight = $this->toFiniteFloat($rawCrop['height'] ?? null);

            if ($cropX === null || $cropY === null || $cropWidth === null || $cropHeight === null) {
                throw new \InvalidArgumentException('The script crop values are invalid.');
            }

            $cropLeft = $cropX * $sourceWidth;
            $cropTop = $cropY * $sourceHeight;
            $cropPixelWidth = max($cropWidth * $sourceWidth, self::MIN_GEOMETRY_SIZE);
            $cropPixelHeight = max($cropHeight * $sourceHeight, self::MIN_GEOMETRY_SIZE);
        }

        if ($cropPixelWidth > self::MAX_OUTPUT_DIMENSION || $cropPixelHeight > self::MAX_OUTPUT_DIMENSION) {
            throw new \InvalidArgumentException('The script crop area is too large to render safely.');
        }

        if (($cropPixelWidth * $cropPixelHeight) > self::MAX_OUTPUT_PIXELS) {
            throw new \InvalidArgumentException('The script crop area is too large to render safely.');
        }

        $texts = [];
        foreach (array_slice($parsedScript['texts'], 0, self::MAX_TEXT_LAYERS) as $textLayer) {
            if (!is_array($textLayer)) {
                continue;
            }

            $textWidth = $this->toFiniteFloat($textLayer['width'] ?? null);
            $textHeight = $this->toFiniteFloat($textLayer['height'] ?? null);
            $textLeft = $this->toFiniteFloat($textLayer['x'] ?? null);
            $textTop = $this->toFiniteFloat($textLayer['y'] ?? null);

            $texts[] = [
                'text' => is_string($textLayer['text'] ?? null) ? $textLayer['text'] : '',
                'left' => ($textLeft ?? 0.0) * $sourceWidth,
                'top' => ($textTop ?? 0.0) * $sourceHeight,
                'width' => max(($textWidth ?? (self::MIN_GEOMETRY_SIZE / $sourceWidth)) * $sourceWidth, self::MIN_GEOMETRY_SIZE),
                'height' => max(($textHeight ?? (self::MIN_GEOMETRY_SIZE / $sourceHeight)) * $sourceHeight, self::MIN_GEOMETRY_SIZE),
                'fontKey' => is_string($textLayer['fontKey'] ?? null) ? trim($textLayer['fontKey']) : null,
                'fontFamily' => $this->normalizeFont(is_string($textLayer['fontFamily'] ?? null) ? $textLayer['fontFamily'] : null),
                'fontSize' => $this->clamp(
                    ($this->toFiniteFloat($textLayer['fontSize'] ?? null) ?? 96.0) * $sourceHeightRatio,
                    8.0,
                    (float) $sourceHeight
                ),
                'color' => $this->normalizeColor(is_string($textLayer['color'] ?? null) ? $textLayer['color'] : null),
                'fontWeight' => ($textLayer['fontWeight'] ?? null) === 'bold' ? 'bold' : 'normal',
                'fontStyle' => ($textLayer['fontStyle'] ?? null) === 'italic' ? 'italic' : 'normal',
                'textAlign' => $this->normalizeTextAlign(is_string($textLayer['textAlign'] ?? null) ? $textLayer['textAlign'] : null),
            ];
        }

        return [
            'crop' => [
                'left' => $cropLeft,
                'top' => $cropTop,
                'width' => $cropPixelWidth,
                'height' => $cropPixelHeight,
            ],
            'baseImage' => [
                'scale' => $this->clamp(
                    $this->toFiniteFloat($parsedScript['baseImage']['scale'] ?? null) ?? 1.0,
                    self::MIN_IMAGE_SCALE,
                    self::MAX_IMAGE_SCALE
                ),
                'offsetX' => $this->toFiniteFloat($parsedScript['baseImage']['offsetX'] ?? null) ?? 0.0,
                'offsetY' => $this->toFiniteFloat($parsedScript['baseImage']['offsetY'] ?? null) ?? 0.0,
            ],
            'texts' => $texts,
        ];
    }

    /**
     * @param array<string, mixed> $normalizedState
     */
    private function renderCanvas(\Imagick $sourceImage, array $normalizedState, string $outputMimeType): \Imagick
    {
        $crop = $normalizedState['crop'];
        $baseImageRect = $this->buildBaseImageRect(
            $normalizedState['baseImage'],
            $sourceImage->getImageWidth(),
            $sourceImage->getImageHeight(),
        );
        $outputFormat = $outputMimeType === 'image/jpeg' ? 'jpeg' : $this->resolveOutputExtension($outputMimeType);
        $canvas = new \Imagick();
        $background = $outputMimeType === 'image/jpeg' ? new \ImagickPixel('white') : new \ImagickPixel('transparent');

        try {
            $canvas->newImage(
                max(1, (int) round($crop['width'])),
                max(1, (int) round($crop['height'])),
                $background,
                $outputFormat
            );
            $canvas->setImageColorspace(\Imagick::COLORSPACE_SRGB);
            $canvas->setImageFormat($outputFormat);

            $resizedImage = clone $sourceImage;
            try {
                $resizedImage->resizeImage(
                    max(1, (int) round($baseImageRect['width'])),
                    max(1, (int) round($baseImageRect['height'])),
                    \Imagick::FILTER_LANCZOS,
                    1
                );

                $canvas->compositeImage(
                    $resizedImage,
                    \Imagick::COMPOSITE_OVER,
                    (int) round($baseImageRect['left'] - $crop['left']),
                    (int) round($baseImageRect['top'] - $crop['top'])
                );
            } finally {
                $resizedImage->clear();
                $resizedImage->destroy();
            }

            $this->drawTextLayers($canvas, $normalizedState['texts'], $crop);
            $this->optimizeOutputImage($canvas, $outputMimeType);

            return $canvas;
        } catch (\ImagickException $exception) {
            $canvas->clear();
            $canvas->destroy();

            throw new \RuntimeException('The editor script could not be rendered.', previous: $exception);
        }
    }

    /**
     * @param array{scale: float, offsetX: float, offsetY: float} $baseImage
     *
     * @return array{left: float, top: float, width: float, height: float}
     */
    private function buildBaseImageRect(array $baseImage, int $sourceWidth, int $sourceHeight): array
    {
        $width = $baseImage['scale'] * $sourceWidth;
        $height = $baseImage['scale'] * $sourceHeight;

        return [
            'left' => ($baseImage['offsetX'] * $sourceWidth) + (($sourceWidth - $width) / 2),
            'top' => ($baseImage['offsetY'] * $sourceHeight) + (($sourceHeight - $height) / 2),
            'width' => $width,
            'height' => $height,
        ];
    }

    /**
     * @param list<array{
     *     text: string,
     *     left: float,
     *     top: float,
     *     width: float,
     *     height: float,
     *     fontFamily: string,
     *     fontSize: float,
     *     color: string,
     *     fontWeight: string,
     *     fontStyle: string,
     *     textAlign: string
     * }> $texts
     * @param array{left: float, top: float, width: float, height: float} $crop
     */
    private function drawTextLayers(\Imagick $canvas, array $texts, array $crop): void
    {
        foreach ($texts as $textLayer) {
            $draw = new \ImagickDraw();

            try {
                $draw->setFillColor(new \ImagickPixel($textLayer['color']));
                $draw->setFontSize($textLayer['fontSize']);
                $draw->setTextAlignment(match ($textLayer['textAlign']) {
                    'center' => \Imagick::ALIGN_CENTER,
                    'right' => \Imagick::ALIGN_RIGHT,
                    default => \Imagick::ALIGN_LEFT,
                });

                $fontReference = $this->resolveFontReference(
                    is_string($textLayer['fontKey'] ?? null) ? $textLayer['fontKey'] : null,
                    $textLayer['fontFamily'],
                    $textLayer['fontWeight'],
                    $textLayer['fontStyle']
                );
                $draw->setFont($fontReference);

                $metrics = $canvas->queryFontMetrics($draw, 'Ag');
                $ascender = (float) ($metrics['ascender'] ?? $textLayer['fontSize']);
                $lineHeight = $textLayer['fontSize'] * 1.2;
                $lines = $this->wrapTextLines($canvas, $draw, $textLayer['text'], $textLayer['width']);

                foreach ($lines as $index => $line) {
                    $lineTop = $textLayer['top'] + ($index * $lineHeight);
                    if (($lineTop + $lineHeight) > ($textLayer['top'] + $textLayer['height'])) {
                        break;
                    }

                    $drawX = match ($textLayer['textAlign']) {
                        'center' => $textLayer['left'] + ($textLayer['width'] / 2) - $crop['left'],
                        'right' => $textLayer['left'] + $textLayer['width'] - $crop['left'],
                        default => $textLayer['left'] - $crop['left'],
                    };
                    $baselineY = ($lineTop - $crop['top']) + $ascender;

                    $canvas->annotateImage($draw, $drawX, $baselineY, 0, $line);
                }
            } catch (\ImagickException $exception) {
                throw new \RuntimeException('A text layer could not be rendered.', previous: $exception);
            } finally {
                $draw->clear();
            }
        }
    }

    private function optimizeOutputImage(\Imagick $image, string $outputMimeType): void
    {
        $image->stripImage();

        if ($outputMimeType === 'image/jpeg') {
            $image->setImageCompressionQuality(92);
            return;
        }

        if ($outputMimeType === 'image/png') {
            $image->setOption('png:compression-filter', '5');
            $image->setOption('png:compression-level', '9');
            $image->setOption('png:compression-strategy', '1');
            return;
        }

        if ($outputMimeType === 'image/webp') {
            $image->setImageCompressionQuality(92);
            $image->setOption('webp:method', '6');
        }
    }

    private function resolveOutputMimeType(string $inputMimeType): string
    {
        return $inputMimeType === 'image/gif' ? 'image/png' : $inputMimeType;
    }

    private function resolveOutputExtension(string $outputMimeType): string
    {
        return $outputMimeType === 'image/jpeg'
            ? 'jpg'
            : explode('/', $outputMimeType)[1];
    }

    private function buildTemporaryOutputPath(string $extension): string
    {
        return sprintf('%s/canvas-script-%s.%s', sys_get_temp_dir(), bin2hex(random_bytes(16)), $extension);
    }

    private function normalizeFont(?string $fontFamily): string
    {
        if ($this->editorFontCatalog !== null) {
            return $this->editorFontCatalog->normalizeFontFamily($fontFamily);
        }

        return in_array($fontFamily, self::SUPPORTED_FONTS, true) ? $fontFamily : self::SUPPORTED_FONTS[0];
    }

    private function normalizeColor(?string $color): string
    {
        return is_string($color) && preg_match('/^#[0-9a-f]{6}$/i', $color) === 1
            ? strtolower($color)
            : '#111827';
    }

    private function normalizeTextAlign(?string $textAlign): string
    {
        return in_array($textAlign, ['left', 'center', 'right'], true) ? $textAlign : 'left';
    }

    private function resolveFontReference(?string $fontKey, string $fontFamily, string $fontWeight, string $fontStyle): string
    {
        $normalizedFontKey = trim((string) $fontKey);
        if ($normalizedFontKey !== '') {
            $customFontFace = $this->editorFontCatalog?->findFontFaceByKey($normalizedFontKey);
            $customFontReference = $customFontFace['path'] ?? null;
            if (is_string($customFontReference) && $customFontReference !== '' && $this->filesystem->exists($customFontReference)) {
                return $customFontReference;
            }
        }

        $customFontReference = $this->editorFontCatalog?->resolveFontFile($fontFamily, $fontWeight, $fontStyle);
        if (is_string($customFontReference) && $customFontReference !== '' && $this->filesystem->exists($customFontReference)) {
            return $customFontReference;
        }

        $candidates = match ($fontFamily) {
            'Arial' => $this->fontCandidatesFromVariantMap([
                'normal|normal' => [
                    '/System/Library/Fonts/Supplemental/Arial.ttf',
                    '/Library/Fonts/Arial.ttf',
                ],
                'bold|normal' => [
                    '/System/Library/Fonts/Supplemental/Arial Bold.ttf',
                ],
                'normal|italic' => [
                    '/System/Library/Fonts/Supplemental/Arial Italic.ttf',
                ],
                'bold|italic' => [
                    '/System/Library/Fonts/Supplemental/Arial Bold Italic.ttf',
                ],
            ], $fontWeight, $fontStyle),
            'Helvetica' => $this->fontCandidatesFromVariantMap([
                'normal|normal' => ['/System/Library/Fonts/Helvetica.ttc'],
                'bold|normal' => ['/System/Library/Fonts/Helvetica.ttc'],
                'normal|italic' => ['/System/Library/Fonts/Helvetica.ttc'],
                'bold|italic' => ['/System/Library/Fonts/Helvetica.ttc'],
            ], $fontWeight, $fontStyle),
            'Georgia' => $this->fontCandidatesFromVariantMap([
                'normal|normal' => ['/System/Library/Fonts/Supplemental/Georgia.ttf'],
                'bold|normal' => ['/System/Library/Fonts/Supplemental/Georgia Bold.ttf'],
                'normal|italic' => ['/System/Library/Fonts/Supplemental/Georgia Italic.ttf'],
                'bold|italic' => ['/System/Library/Fonts/Supplemental/Georgia Bold Italic.ttf'],
            ], $fontWeight, $fontStyle),
            'Times New Roman' => $this->fontCandidatesFromVariantMap([
                'normal|normal' => ['/System/Library/Fonts/Supplemental/Times New Roman.ttf'],
                'bold|normal' => ['/System/Library/Fonts/Supplemental/Times New Roman Bold.ttf'],
                'normal|italic' => ['/System/Library/Fonts/Supplemental/Times New Roman Italic.ttf'],
                'bold|italic' => ['/System/Library/Fonts/Supplemental/Times New Roman Bold Italic.ttf'],
            ], $fontWeight, $fontStyle),
            'Trebuchet MS' => $this->fontCandidatesFromVariantMap([
                'normal|normal' => ['/System/Library/Fonts/Supplemental/Trebuchet MS.ttf'],
                'bold|normal' => ['/System/Library/Fonts/Supplemental/Trebuchet MS Bold.ttf'],
                'normal|italic' => ['/System/Library/Fonts/Supplemental/Trebuchet MS Italic.ttf'],
                'bold|italic' => ['/System/Library/Fonts/Supplemental/Trebuchet MS Bold Italic.ttf'],
            ], $fontWeight, $fontStyle),
            'Verdana' => $this->fontCandidatesFromVariantMap([
                'normal|normal' => ['/System/Library/Fonts/Supplemental/Verdana.ttf'],
                'bold|normal' => ['/System/Library/Fonts/Supplemental/Verdana Bold.ttf'],
                'normal|italic' => ['/System/Library/Fonts/Supplemental/Verdana Italic.ttf'],
                'bold|italic' => ['/System/Library/Fonts/Supplemental/Verdana Bold Italic.ttf'],
            ], $fontWeight, $fontStyle),
            'Tahoma' => $this->fontCandidatesFromVariantMap([
                'normal|normal' => ['/System/Library/Fonts/Supplemental/Tahoma.ttf'],
                'bold|normal' => ['/System/Library/Fonts/Supplemental/Tahoma Bold.ttf'],
                'normal|italic' => ['/System/Library/Fonts/Supplemental/Tahoma.ttf'],
                'bold|italic' => ['/System/Library/Fonts/Supplemental/Tahoma Bold.ttf'],
            ], $fontWeight, $fontStyle),
            'Courier New' => $this->fontCandidatesFromVariantMap([
                'normal|normal' => ['/System/Library/Fonts/Supplemental/Courier New.ttf'],
                'bold|normal' => ['/System/Library/Fonts/Supplemental/Courier New Bold.ttf'],
                'normal|italic' => ['/System/Library/Fonts/Supplemental/Courier New Italic.ttf'],
                'bold|italic' => ['/System/Library/Fonts/Supplemental/Courier New Bold Italic.ttf'],
            ], $fontWeight, $fontStyle),
            'Impact' => $this->fontCandidatesFromVariantMap([
                'normal|normal' => ['/System/Library/Fonts/Supplemental/Impact.ttf'],
                'bold|normal' => ['/System/Library/Fonts/Supplemental/Impact.ttf'],
                'normal|italic' => ['/System/Library/Fonts/Supplemental/Impact.ttf'],
                'bold|italic' => ['/System/Library/Fonts/Supplemental/Impact.ttf'],
            ], $fontWeight, $fontStyle),
            default => [],
        };

        foreach (array_merge(
            $candidates,
            $this->resolveBundledFontFallbackCandidates($fontFamily, $fontWeight, $fontStyle),
            $this->resolveGenericFontCandidates($fontFamily),
            [$fontFamily]
        ) as $candidate) {
            if (!is_string($candidate) || $candidate === '') {
                continue;
            }

            if ($candidate === $fontFamily || $this->filesystem->exists($candidate)) {
                return $candidate;
            }
        }

        return $fontFamily;
    }

    /**
     * @return list<string>
     */
    private function resolveBundledFontFallbackCandidates(string $fontFamily, string $fontWeight, string $fontStyle): array
    {
        $fontDirectory = $this->projectDir . '/public/standard_fonts';

        return match ($fontFamily) {
            'Courier New' => $this->fontCandidatesFromVariantMap([
                'normal|normal' => [$fontDirectory . '/FoxitFixed.pfb'],
                'bold|normal' => [$fontDirectory . '/FoxitFixedBold.pfb'],
                'normal|italic' => [$fontDirectory . '/FoxitFixedItalic.pfb'],
                'bold|italic' => [$fontDirectory . '/FoxitFixedBoldItalic.pfb'],
            ], $fontWeight, $fontStyle),
            'Georgia', 'Times New Roman' => $this->fontCandidatesFromVariantMap([
                'normal|normal' => [$fontDirectory . '/FoxitSerif.pfb'],
                'bold|normal' => [$fontDirectory . '/FoxitSerifBold.pfb'],
                'normal|italic' => [$fontDirectory . '/FoxitSerifItalic.pfb'],
                'bold|italic' => [$fontDirectory . '/FoxitSerifBoldItalic.pfb'],
            ], $fontWeight, $fontStyle),
            default => $this->fontCandidatesFromVariantMap([
                'normal|normal' => [$fontDirectory . '/LiberationSans-Regular.ttf'],
                'bold|normal' => [$fontDirectory . '/LiberationSans-Bold.ttf'],
                'normal|italic' => [$fontDirectory . '/LiberationSans-Italic.ttf'],
                'bold|italic' => [$fontDirectory . '/LiberationSans-BoldItalic.ttf'],
            ], $fontWeight, $fontStyle),
        };
    }

    /**
     * @return list<string>
     */
    private function resolveGenericFontCandidates(string $fontFamily): array
    {
        return match ($fontFamily) {
            'Courier New' => ['Courier', 'monospace'],
            'Georgia', 'Times New Roman' => ['Times-Roman', 'Times', 'serif'],
            'Impact' => ['Impact', 'Arial Black', 'sans-serif'],
            'Helvetica' => ['Helvetica', 'Arial', 'sans-serif'],
            default => ['Arial', 'Helvetica', 'sans-serif'],
        };
    }

    /**
     * @param array<string, list<string>> $variantMap
     *
     * @return list<string>
     */
    private function fontCandidatesFromVariantMap(array $variantMap, string $fontWeight, string $fontStyle): array
    {
        $variantKey = sprintf('%s|%s', $fontWeight, $fontStyle);

        return array_merge(
            $variantMap[$variantKey] ?? [],
            $variantMap['normal|normal'] ?? [],
        );
    }

    /**
     * @return list<string>
     */
    private function wrapTextLines(\Imagick $canvas, \ImagickDraw $draw, string $rawText, float $maxWidth): array
    {
        $paragraphs = explode("\n", (string) $rawText);
        $lines = [];

        foreach ($paragraphs as $paragraph) {
            if ($paragraph === '') {
                $lines[] = '';
                continue;
            }

            $words = preg_split('/\s+/', $paragraph) ?: [];
            $currentLine = '';

            foreach ($words as $word) {
                $candidate = $currentLine === '' ? $word : $currentLine . ' ' . $word;

                if ($this->measureTextWidth($canvas, $draw, $candidate) <= $maxWidth) {
                    $currentLine = $candidate;
                    continue;
                }

                if ($currentLine !== '') {
                    $lines[] = $currentLine;
                }

                if ($this->measureTextWidth($canvas, $draw, $word) <= $maxWidth) {
                    $currentLine = $word;
                    continue;
                }

                $brokenWord = $this->breakWord($canvas, $draw, $word, $maxWidth);
                foreach (array_slice($brokenWord, 0, -1) as $piece) {
                    $lines[] = $piece;
                }
                $currentLine = $brokenWord[array_key_last($brokenWord)] ?? '';
            }

            $lines[] = $currentLine;
        }

        return $lines;
    }

    /**
     * @return list<string>
     */
    private function breakWord(\Imagick $canvas, \ImagickDraw $draw, string $word, float $maxWidth): array
    {
        $pieces = [];
        $buffer = '';

        $characters = preg_split('//u', $word, -1, \PREG_SPLIT_NO_EMPTY) ?: str_split($word);

        foreach ($characters as $character) {
            $candidate = $buffer . $character;

            if ($buffer === '' || $this->measureTextWidth($canvas, $draw, $candidate) <= $maxWidth) {
                $buffer = $candidate;
                continue;
            }

            $pieces[] = $buffer;
            $buffer = $character;
        }

        if ($buffer !== '') {
            $pieces[] = $buffer;
        }

        return $pieces;
    }

    private function measureTextWidth(\Imagick $canvas, \ImagickDraw $draw, string $text): float
    {
        try {
            $metrics = $canvas->queryFontMetrics($draw, $text);
        } catch (\ImagickException $exception) {
            throw new \RuntimeException('Text metrics could not be measured for the scripted download.', previous: $exception);
        }

        return (float) ($metrics['textWidth'] ?? 0.0);
    }

    private function clamp(float $value, float $min, float $max): float
    {
        return min(max($value, $min), $max);
    }

    private function toFiniteFloat(mixed $value): ?float
    {
        if (!is_numeric($value)) {
            return null;
        }

        $floatValue = (float) $value;

        return is_finite($floatValue) ? $floatValue : null;
    }
}
