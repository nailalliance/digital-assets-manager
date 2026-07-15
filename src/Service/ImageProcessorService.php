<?php

namespace App\Service;

use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

/**
 * A service for processing images, creating thumbnails, and exporting optimized versions.
 */
class ImageProcessorService
{
    private ?string $srgbProfile;
    private ?string $cmykProfile;

    public function __construct(
        private readonly Filesystem $filesystem,
        ParameterBagInterface $params
    ) {
        $srgbProfilePath = $params->get('srgb_profile_path');
        $cmykProfilePath = $params->get('cmyk_profile_path');

        $this->srgbProfile = $this->filesystem->exists($srgbProfilePath) ? file_get_contents($srgbProfilePath) : null;
        $this->cmykProfile = $this->filesystem->exists($cmykProfilePath) ? file_get_contents($cmykProfilePath) : null;
    }

    /**
     * Creates a standard 700x700 thumbnail with a watermark and returns the image binary.
     *
     * @param string $sourcePath The absolute path to the source image.
     * @return string|null The binary content of the WEBP thumbnail, or null on failure.
     */
    public function makeThumbnail(string $sourcePath, int $width, int $height): ?string
    {
        $legendText = "Preview.\nColor is an approximation.\nDo not use this thumbnail in production.";
        return $this->processImage($sourcePath, $width, $height, 0, 'webp', $legendText);
    }

    /**
     * Creates a clean, optimized image for public use and returns the image binary.
     * Inspired by mogrify commands for high-quality web output.
     *
     * @param string $sourcePath The absolute path to the source image.
     * @param int $width The target width.
     * @param int $height The target height.
     * @param int $padding The padding to add around the image.
     * @param string $format The output format ('webp', 'jpg', 'png').
     * @return string|null The binary content of the exported image, or null on failure.
     */
    public function exportFile(
        string $sourcePath,
        int $width,
        int $height,
        int $padding = 0,
        string $format = 'jpg',
        bool $useLargestClipPath = false
    ): ?string
    {
        return $this->processImage($sourcePath, $width, $height, $padding, $format, null, $useLargestClipPath);
    }

    /**
     * The core image processing logic.
     */
    private function processImage(
        string $sourcePath,
        int $targetWidth,
        int $targetHeight,
        int $padding,
        string $outputFormat,
        ?string $legendText,
        bool $useLargestClipPath = false
    ): ?string
    {
        if (!class_exists('Imagick') || !$this->filesystem->exists($sourcePath)) {
            return null;
        }

        $mimeType = mime_content_type($sourcePath);
        $tempPngPath = null;
        $image = new \Imagick();

        try {
            $filePathToRead = $sourcePath;

            if ($mimeType === 'application/pdf') {
                $image->setResolution(300, 300);
                $image->setBackgroundColor(new \ImagickPixel('white'));
                $filePathToRead = $sourcePath . '[0]';
                $image->readImage($filePathToRead);
                $image = $image->mergeImageLayers(\Imagick::LAYERMETHOD_FLATTEN);
            } else {
                $image->readImage($filePathToRead);
            }

            if ($useLargestClipPath && $legendText === null) {
                $this->applyLargestClipPathIfAvailable($image);
            }

            // if ($mimeType === 'application/pdf') {
            //     $tempPngPath = $this->filesystem->tempnam(sys_get_temp_dir(), 'pdf_render_') . '.png';
            //
            //     $process = new Process([
            //         'gs',               // Ghostscript command
            //         '-q',
            //         '-dNOPAUSE',
            //         '-dBATCH',
            //         '-sDEVICE=pngalpha',// Output device
            //         '-dPDFSETTINGS=/prepress',
            //         '-r300',            // Render at 300 DPI for high quality
            //         '-o', $tempPngPath, // Output file
            //         $sourcePath,// . '[0]',// Input file (first page only)
            //     ]);
            //
            //     $process->run();
            //
            //     if (!$process->isSuccessful()) {
            //         throw new ProcessFailedException($process);
            //     }
            //
            //
            //     if (!file_exists($tempPngPath) || filesize($tempPngPath) === 0) {
            //         throw new \Exception('Ghostscript failed to create a valid PNG from the PDF.');
            //     }
            //
            //     // The path to read is now the temporary PNG file
            //     $filePathToRead = $tempPngPath;
            // }
            //
            // $image->readImage($filePathToRead);

            // Convert CMYK to sRGB for web compatibility
            if ($image->getImageColorspace() === \Imagick::COLORSPACE_CMYK) {
                if ($this->cmykProfile && $this->srgbProfile) {
                    $image->profileImage('icc', $this->cmykProfile);
                    $image->profileImage('icc', $this->srgbProfile);
                } else {
                    $image->transformImageColorspace(\Imagick::COLORSPACE_SRGB);
                }
            }

            // Apply mogrify-inspired optimizations for high quality exports
            if ($legendText === null) {
                $image->trimImage(0); // Equivalent to -trim
                $image->unsharpMaskImage(0.25, 0.08, 8.3, 0.045);
            }

            // Resize the image to fit within the target dimensions minus padding
            $image->thumbnailImage($targetWidth - ($padding * 2), $targetHeight - ($padding * 2), true, true);

            // Create the final canvas with padding
            $canvas = new \Imagick();
            $canvas->newImage($targetWidth, $targetHeight, 'white', $outputFormat);

            // Place the resized image in the center of the canvas
            $x = ($targetWidth - $image->getImageWidth()) / 2;
            $y = ($targetHeight - $image->getImageHeight()) / 2;
            $canvas->compositeImage($image, \Imagick::COMPOSITE_OVER, $x, $y);

            // Add the legend only if it's provided (for thumbnails)
            if ($legendText) {
                $draw = new \ImagickDraw();
                $draw->setFont('Helvetica');
                $draw->setFontSize(12);
                $draw->setFillColor(new \ImagickPixel('#999999'));
                $draw->setGravity(\Imagick::GRAVITY_SOUTHEAST);
                $canvas->annotateImage($draw, 5, 5, 0, $legendText);
                $draw->clear();
            }

            // Set format-specific optimizations
            if ($outputFormat === 'jpg' || $outputFormat === 'jpeg') {
                $canvas->setImageCompressionQuality(82);
                $canvas->setOption('jpeg:fancy-upsampling', 'off');
            } elseif ($outputFormat === 'png') {
                $canvas->setOption('png:compression-filter', '5');
                $canvas->setOption('png:compression-level', '9');
                $canvas->setOption('png:compression-strategy', '1');
            }

            $binary = $canvas->getImageBlob();

            $image->clear();
            $canvas->clear();

            return $binary;

        } catch (\ImagickException | ProcessFailedException $e) {
            return null;
        } finally {
            if ($tempPngPath && $this->filesystem->exists($tempPngPath)) {
                $this->filesystem->remove($tempPngPath);
            }
        }
    }

    private function applyLargestClipPathIfAvailable(\Imagick $image): void
    {
        $svgPathData = $this->findLargestClipPathSvg($image);
        if ($svgPathData === null) {
            return;
        }

        $mask = new \Imagick();

        try {
            $maskSvg = $this->normalizeClipPathSvg($svgPathData);

            $mask->setBackgroundColor(new \ImagickPixel('black'));
            $mask->readImageBlob($maskSvg);
            $mask->setImageAlphaChannel(\Imagick::ALPHACHANNEL_REMOVE);

            if (
                $mask->getImageWidth() !== $image->getImageWidth()
                || $mask->getImageHeight() !== $image->getImageHeight()
            ) {
                $mask->scaleImage($image->getImageWidth(), $image->getImageHeight());
            }

            $image->setImageAlphaChannel(\Imagick::ALPHACHANNEL_SET);
            $image->compositeImage($mask, \Imagick::COMPOSITE_COPYOPACITY, 0, 0);
        } catch (\ImagickException) {
            return;
        } finally {
            $mask->clear();
        }
    }

    private function findLargestClipPathSvg(\Imagick $image): ?string
    {
        $bestPathSvg = null;
        $maxBoxArea = 0.0;

        for ($i = 0; $i <= 15; $i++) {
            $svgPathData = $image->getImageProperty("8BIM:1999,2998:#{$i}");
            if (!$svgPathData) {
                continue;
            }

            $area = $this->estimateClipPathBoundingBoxArea($svgPathData);
            if ($area === null || $area <= $maxBoxArea) {
                continue;
            }

            $maxBoxArea = $area;
            $bestPathSvg = $svgPathData;
        }

        return $bestPathSvg;
    }

    private function estimateClipPathBoundingBoxArea(string $svgPathData): ?float
    {
        if (!preg_match('/d="([^"]+)"/', $svgPathData, $matches)) {
            return null;
        }

        preg_match_all('/[-+]?[0-9]*\.?[0-9]+/', $matches[1], $coords);
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

            if ($x < $minX) {
                $minX = $x;
            }
            if ($x > $maxX) {
                $maxX = $x;
            }
            if ($y < $minY) {
                $minY = $y;
            }
            if ($y > $maxY) {
                $maxY = $y;
            }
        }

        return ($maxX - $minX) * ($maxY - $minY);
    }

    private function normalizeClipPathSvg(string $svgPathData): string
    {
        $svgPathData = preg_replace('/fill\s*:\s*#[0-9A-Fa-f]{3,6}/', 'fill:#FFFFFF', $svgPathData) ?? $svgPathData;
        $svgPathData = preg_replace('/fill="[^"]*"/', 'fill="#FFFFFF"', $svgPathData) ?? $svgPathData;

        return $svgPathData;
    }
}
