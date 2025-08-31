<?php

namespace App\Service;

use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Filesystem\Filesystem;

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
        $legendText = "Preview.\nColor in an approximation.\nDo not use this thumbnail in production.";
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
    public function exportFile(string $sourcePath, int $width, int $height, int $padding = 0, string $format = 'jpg'): ?string
    {
        return $this->processImage($sourcePath, $width, $height, $padding, $format, null);
    }

    /**
     * The core image processing logic.
     */
    private function processImage(string $sourcePath, int $targetWidth, int $targetHeight, int $padding, string $outputFormat, ?string $legendText): ?string
    {
        if (!class_exists('Imagick') || !$this->filesystem->exists($sourcePath)) {
            return null;
        }

        $mimeType = mime_content_type($sourcePath);

        try {
            if ($mimeType === 'application/pdf') {
                $image = new \Imagick();
                $image->setResolution(300, 300);
                // $image->setBackgroundColor(new \ImagickPixel('white'));
                $filePathToRead = $sourcePath . '[0]';
                $image->readImage($filePathToRead);
                $image = $image->flattenImages();
                // $image = $image->mergeImageLayers(\Imagick::LAYERMETHOD_FLATTEN);
            } else {
                $image = new \Imagick($sourcePath);
            }

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

        } catch (\ImagickException $e) {
            return null;
        }
    }
}
