<?php

namespace App\Service\Image;

/**
 * Applies Photoshop clipping paths embedded in JPEG 8BIM resources.
 *
 * ImageMagick's native clipImage() support varies with the delegates used to
 * build it. The banner workflow tries that API first, then falls back to the
 * explicit SVG resource conversion already used by the DAM.
 */
final class ClippingPathExtractor
{
    /**
     * Applies the largest embedded path, preserving the historic export logic.
     */
    public function applyLargestIfAvailable(\Imagick $image, ?int $clipPathIndex = null): bool
    {
        $svgPathData = $clipPathIndex !== null
            ? $image->getImageProperty("8BIM:1999,2998:#{$clipPathIndex}")
            : $this->largestPathResource($image);

        if (!is_string($svgPathData) || $svgPathData === '') {
            return false;
        }

        $this->applyClipPathSvg($image, $svgPathData);

        return $this->hasUsefulTransparency($image);
    }

    /**
     * Applies the primary clipping path for a product cutout.
     *
     * clipImage() clips against the first path in the image's 8BIM profile. If
     * the local ImageMagick build cannot use that path, the SVG-mask fallback
     * explicitly applies the largest filled path through COPYOPACITY.
     */
    public function applyPrimary(\Imagick $image, ?string $fallbackPathResource = null): bool
    {
        $nativeCandidate = clone $image;

        try {
            $nativeCandidate->setImageAlphaChannel(\Imagick::ALPHACHANNEL_SET);
            $nativeCandidate->clipImage();

            if ($this->hasUsefulTransparency($nativeCandidate)) {
                $image->setImageAlphaChannel(\Imagick::ALPHACHANNEL_SET);
                $image->compositeImage($nativeCandidate, \Imagick::COMPOSITE_SRC, 0, 0);

                return true;
            }
        } catch (\ImagickException) {
            // Continue with the explicit 8BIM-to-SVG mask fallback below.
        } finally {
            $nativeCandidate->clear();
        }

        if ($fallbackPathResource !== null && $fallbackPathResource !== '') {
            $this->applyClipPathSvg($image, $fallbackPathResource);

            return $this->hasUsefulTransparency($image);
        }

        return $this->applyLargestIfAvailable($image);
    }

    public function largestPathResource(\Imagick $image): ?string
    {
        return $this->findLargestClipPathSvg($image);
    }

    private function hasUsefulTransparency(\Imagick $image): bool
    {
        $range = $image->getImageChannelRange(\Imagick::CHANNEL_ALPHA);
        $minimum = (float) ($range['minima'] ?? $range['min'] ?? 0.0);
        $maximum = (float) ($range['maxima'] ?? $range['max'] ?? 0.0);

        return $maximum > 0.0 && $minimum < $maximum;
    }

    private function applyClipPathSvg(\Imagick $image, string $svgPathData): void
    {
        $mask = new \Imagick();

        try {
            $maskSvg = $this->buildMaskSvgFromFilledPaths(
                $svgPathData,
                $image->getImageWidth(),
                $image->getImageHeight()
            );
            $mask->setBackgroundColor(new \ImagickPixel('black'));
            $mask->readImageBlob($maskSvg);
            $mask->setImageMatte(false);

            if (
                $mask->getImageWidth() !== $image->getImageWidth()
                || $mask->getImageHeight() !== $image->getImageHeight()
            ) {
                $mask->scaleImage($image->getImageWidth(), $image->getImageHeight());
            }

            $image->setImageAlphaChannel(\Imagick::ALPHACHANNEL_SET);
            $image->compositeImage($mask, \Imagick::COMPOSITE_COPYOPACITY, 0, 0);
        } finally {
            $mask->clear();
        }
    }

    private function findLargestClipPathSvg(\Imagick $image): ?string
    {
        $bestSvgPathData = null;
        $largestBoundingBoxArea = 0.0;

        for ($i = 0; $i <= 15; ++$i) {
            $svgPathData = $image->getImageProperty("8BIM:1999,2998:#{$i}");
            if (!is_string($svgPathData) || $svgPathData === '') {
                continue;
            }

            $bounds = $this->extractClipPathBounds($svgPathData);
            $area = $bounds['area'] ?? null;
            if ($area === null || $area <= $largestBoundingBoxArea) {
                continue;
            }

            $largestBoundingBoxArea = $area;
            $bestSvgPathData = $svgPathData;
        }

        return $bestSvgPathData;
    }

    private function buildMaskSvgFromFilledPaths(string $svgPathData, int $imageWidth, int $imageHeight): string
    {
        $document = new \DOMDocument();
        if (@$document->loadXML($svgPathData) === false) {
            return $this->buildMaskSvgFromPathDataStrings(
                $this->extractPathDataStringsFromRawSvg($svgPathData),
                $imageWidth,
                $imageHeight
            );
        }

        $xpath = new \DOMXPath($document);
        /** @var \DOMNodeList<\DOMElement>|false $pathElements */
        $pathElements = $xpath->query('//*[local-name()="path"][@d]');
        if ($pathElements === false) {
            return $this->buildMaskSvgFromPathDataStrings(
                $this->extractPathDataStringsFromRawSvg($svgPathData),
                $imageWidth,
                $imageHeight
            );
        }

        $paths = [];
        foreach ($pathElements as $pathElement) {
            if (!$this->isFilledMaskPathElement($pathElement)) {
                continue;
            }

            $paths[] = [
                'd' => $pathElement->getAttribute('d'),
                'fillRule' => $pathElement->getAttribute('fill-rule'),
                'clipRule' => $pathElement->getAttribute('clip-rule'),
                'transform' => $pathElement->getAttribute('transform'),
            ];
        }

        if ($paths === []) {
            return $this->buildMaskSvgFromPathDataStrings(
                $this->extractPathDataStringsFromRawSvg($svgPathData),
                $imageWidth,
                $imageHeight
            );
        }

        return $this->buildMaskSvgDocument(
            $paths,
            $imageWidth,
            $imageHeight,
            $this->resolveSourceViewBox($document, $imageWidth, $imageHeight)
        );
    }

    private function isFilledMaskPathElement(\DOMElement $pathElement): bool
    {
        $fill = strtolower(trim($pathElement->getAttribute('fill')));
        if ($fill === 'none') {
            return false;
        }

        $style = strtolower($pathElement->getAttribute('style'));

        return preg_match('/fill\s*:\s*none\b/', $style) !== 1;
    }

    /** @return list<string> */
    private function extractPathDataStringsFromRawSvg(string $svgPathData): array
    {
        if (!preg_match_all('/<path[^>]*\sd="([^"]+)"/i', $svgPathData, $matches)) {
            return [];
        }

        return array_values(array_filter(
            $matches[1] ?? [],
            static fn (string $pathData): bool => $pathData !== ''
        ));
    }

    /** @param list<string> $pathDataStrings */
    private function buildMaskSvgFromPathDataStrings(array $pathDataStrings, int $imageWidth, int $imageHeight): string
    {
        $paths = [];

        foreach ($pathDataStrings as $pathData) {
            $paths[] = [
                'd' => $pathData,
                'fillRule' => 'evenodd',
                'clipRule' => '',
                'transform' => '',
            ];
        }

        return $this->buildMaskSvgDocument($paths, $imageWidth, $imageHeight);
    }

    /**
     * @param list<array{d: string, fillRule: string, clipRule: string, transform: string}> $paths
     */
    private function buildMaskSvgDocument(
        array $paths,
        int $imageWidth,
        int $imageHeight,
        ?string $sourceViewBox = null
    ): string
    {
        $document = new \DOMDocument('1.0', 'UTF-8');
        $svg = $document->createElement('svg');
        $svg->setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        $svg->setAttribute('width', (string) $imageWidth);
        $svg->setAttribute('height', (string) $imageHeight);
        $svg->setAttribute('viewBox', $sourceViewBox ?? sprintf('0 0 %d %d', $imageWidth, $imageHeight));
        $document->appendChild($svg);

        $backgroundRect = $document->createElement('rect');
        $backgroundRect->setAttribute('width', '100%');
        $backgroundRect->setAttribute('height', '100%');
        $backgroundRect->setAttribute('fill', '#000000');
        $svg->appendChild($backgroundRect);

        foreach ($paths as $pathData) {
            $path = $document->createElement('path');
            $path->setAttribute('d', $pathData['d']);
            $path->setAttribute('fill', '#FFFFFF');

            if ($pathData['fillRule'] !== '') {
                $path->setAttribute('fill-rule', $pathData['fillRule']);
            }
            if ($pathData['clipRule'] !== '') {
                $path->setAttribute('clip-rule', $pathData['clipRule']);
            }
            if ($pathData['transform'] !== '') {
                $path->setAttribute('transform', $pathData['transform']);
            }

            $svg->appendChild($path);
        }

        return $document->saveXML() ?: sprintf(
            '<svg xmlns="http://www.w3.org/2000/svg" width="%1$d" height="%2$d" viewBox="0 0 %1$d %2$d"><rect width="100%%" height="100%%" fill="#000000"/></svg>',
            $imageWidth,
            $imageHeight
        );
    }

    private function resolveSourceViewBox(\DOMDocument $document, int $fallbackWidth, int $fallbackHeight): string
    {
        $root = $document->documentElement;
        if ($root instanceof \DOMElement) {
            $viewBox = trim($root->getAttribute('viewBox'));
            if ($viewBox !== '') {
                return $viewBox;
            }

            $width = $this->numericSvgDimension($root->getAttribute('width'));
            $height = $this->numericSvgDimension($root->getAttribute('height'));
            if ($width !== null && $height !== null) {
                return sprintf('0 0 %s %s', $width, $height);
            }
        }

        return sprintf('0 0 %d %d', $fallbackWidth, $fallbackHeight);
    }

    private function numericSvgDimension(string $value): ?string
    {
        if (preg_match('/^\s*([0-9]+(?:\.[0-9]+)?)/', $value, $matches) !== 1) {
            return null;
        }

        return $matches[1];
    }

    /** @return array{width: float, height: float, area: float}|null */
    private function extractClipPathBounds(string $pathData): ?array
    {
        if (preg_match('/d="([^"]+)"/', $pathData, $matches)) {
            $pathData = $matches[1];
        }

        preg_match_all('/[-+]?[0-9]*\.?[0-9]+/', $pathData, $coords);
        $numbers = $coords[0] ?? [];

        if (count($numbers) < 4) {
            return null;
        }

        $minX = $maxX = (float) $numbers[0];
        $minY = $maxY = (float) $numbers[1];
        $count = count($numbers);

        for ($i = 0; $i < $count; $i += 2) {
            if (!isset($numbers[$i + 1])) {
                break;
            }

            $x = (float) $numbers[$i];
            $y = (float) $numbers[$i + 1];
            $minX = min($minX, $x);
            $maxX = max($maxX, $x);
            $minY = min($minY, $y);
            $maxY = max($maxY, $y);
        }

        $width = $maxX - $minX;
        $height = $maxY - $minY;

        return ['width' => $width, 'height' => $height, 'area' => $width * $height];
    }
}
