<?php

namespace App\Service;

use App\Service\Image\ClippingPathExtractor;
use Psr\Log\LoggerInterface;
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
    private ?string $thumbnailFallbackFontPath;
    private readonly ClippingPathExtractor $clippingPathExtractor;

    public function __construct(
        private readonly Filesystem $filesystem,
        private readonly LoggerInterface $logger,
        ParameterBagInterface $params,
        ?ClippingPathExtractor $clippingPathExtractor = null
    ) {
        $this->clippingPathExtractor = $clippingPathExtractor ?? new ClippingPathExtractor();
        $srgbProfilePath = $params->get('srgb_profile_path');
        $cmykProfilePath = $params->get('cmyk_profile_path');
        $projectDir = $params->get('kernel.project_dir');

        $this->srgbProfile = $this->filesystem->exists($srgbProfilePath) ? file_get_contents($srgbProfilePath) : null;
        $this->cmykProfile = $this->filesystem->exists($cmykProfilePath) ? file_get_contents($cmykProfilePath) : null;
        $thumbnailFallbackFontPath = $projectDir . '/assets/fonts/Roboto/Roboto-Regular.ttf';
        $this->thumbnailFallbackFontPath = $this->filesystem->exists($thumbnailFallbackFontPath)
            ? $thumbnailFallbackFontPath
            : null;
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
     * @param bool $cropInsideMiddle Whether to fill the available canvas and crop overflow from the center.
     * @return string|null The binary content of the exported image, or null on failure.
     */
    public function exportFile(
        string $sourcePath,
        int $width,
        int $height,
        int $padding = 0,
        string $format = 'jpg',
        bool $useLargestClipPath = false,
        ?int $clipPathIndex = null,
        bool $cropInsideMiddle = false
    ): ?string
    {
        return $this->processImage($sourcePath, $width, $height, $padding, $format, null, $useLargestClipPath, $clipPathIndex, $cropInsideMiddle);
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
        bool $useLargestClipPath = false,
        ?int $clipPathIndex = null,
        bool $cropInsideMiddle = false
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
                $this->applyLargestClipPathIfAvailable($image, $clipPathIndex);
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
                $image->setImagePage(0, 0, 0, 0);
                $image->unsharpMaskImage(0.25, 0.08, 8.3, 0.045);
            }

            $availableWidth = $targetWidth - ($padding * 2);
            $availableHeight = $targetHeight - ($padding * 2);

            if ($cropInsideMiddle) {
                // Fill the available area and remove overflow equally from opposing sides.
                $image->cropThumbnailImage($availableWidth, $availableHeight);
            } else {
                // Preserve the full image inside the available area (the default behavior).
                $image->thumbnailImage($availableWidth, $availableHeight, true, true);
            }

            $backgroundColor = $this->resolveCanvasBackgroundColor($legendText, $useLargestClipPath);

            // Create the final canvas with padding
            $canvas = new \Imagick();
            $canvas->newImage($targetWidth, $targetHeight, $backgroundColor, $outputFormat);

            // Place the resized image in the center of the canvas
            $x = ($targetWidth - $image->getImageWidth()) / 2;
            $y = ($targetHeight - $image->getImageHeight()) / 2;
            $canvas->compositeImage($image, \Imagick::COMPOSITE_OVER, $x, $y);

            // Add the legend only if it's provided (for thumbnails)
            if ($legendText) {
                $this->annotateThumbnailLegend($canvas, $legendText, $sourcePath);
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
            $this->logger->error('Image processing failed.', [
                'sourcePath' => $sourcePath,
                'mimeType' => $mimeType,
                'targetWidth' => $targetWidth,
                'targetHeight' => $targetHeight,
                'padding' => $padding,
                'outputFormat' => $outputFormat,
                'hasLegendText' => $legendText !== null,
                'useLargestClipPath' => $useLargestClipPath,
                'clipPathIndex' => $clipPathIndex,
                'cropInsideMiddle' => $cropInsideMiddle,
                'fallbackFontPath' => $this->thumbnailFallbackFontPath,
                'exception' => $e,
            ]);
            return null;
        } finally {
            if ($tempPngPath && $this->filesystem->exists($tempPngPath)) {
                $this->filesystem->remove($tempPngPath);
            }
        }
    }

    private function annotateThumbnailLegend(\Imagick $canvas, string $legendText, string $sourcePath): void
    {
        $fontCandidates = ['Helvetica'];

        if ($this->thumbnailFallbackFontPath !== null) {
            $fontCandidates[] = $this->thumbnailFallbackFontPath;
        }

        $lastException = null;

        foreach ($fontCandidates as $font) {
            $draw = new \ImagickDraw();

            try {
                $draw->setFont($font);
                $draw->setFontSize(12);
                $draw->setFillColor(new \ImagickPixel('#999999'));
                $draw->setGravity(\Imagick::GRAVITY_SOUTHEAST);
                $canvas->annotateImage($draw, 5, 5, 0, $legendText);

                return;
            } catch (\ImagickException $e) {
                $lastException = $e;

                $this->logger->warning('Thumbnail legend font failed.', [
                    'sourcePath' => $sourcePath,
                    'font' => $font,
                    'fallbackFontPath' => $this->thumbnailFallbackFontPath,
                    'exception' => $e,
                ]);
            } finally {
                $draw->clear();
            }
        }

        if ($lastException !== null) {
            throw $lastException;
        }
    }

    private function applyLargestClipPathIfAvailable(\Imagick $image, ?int $clipPathIndex = null): void
    {
        try {
            $this->clippingPathExtractor->applyLargestIfAvailable($image, $clipPathIndex);
        } catch (\ImagickException) {
            return;
        }
    }

    private function resolveCanvasBackgroundColor(?string $legendText, bool $useLargestClipPath): string
    {
        return 'white';
    }

}
