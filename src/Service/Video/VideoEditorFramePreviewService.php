<?php

namespace App\Service\Video;

use App\Entity\Assets\Assets;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Process\Process;

final class VideoEditorFramePreviewService
{
    private const MAX_PREVIEW_DIMENSION = 1600;
    private const MAX_CACHED_FRAMES_PER_VIDEO = 48;

    private readonly string $cacheDirectory;

    public function __construct(
        private readonly Filesystem $filesystem,
        ParameterBagInterface $parameterBag,
    ) {
        $this->cacheDirectory = rtrim((string) $parameterBag->get('kernel.cache_dir'), '/') . '/video-editor-frames';
    }

    public function getFrame(Assets $asset, float $position): string
    {
        $sourcePath = $asset->getFilePath();
        if (!is_string($sourcePath) || !is_readable($sourcePath)) {
            throw new \RuntimeException('The video source is not readable.');
        }

        $position = min(1.0, max(0.0, $position));
        $cacheKey = sprintf('%d-%d-%04d.jpg', $asset->getId(), (int) filemtime($sourcePath), (int) round($position * 1000));
        $cachePath = $this->cacheDirectory . '/' . $cacheKey;
        if (is_readable($cachePath)) {
            return $cachePath;
        }

        $this->filesystem->mkdir($this->cacheDirectory);
        $duration = $this->readDuration($sourcePath);
        $timestamp = max(0.0, min(max(0.0, $duration - 0.05), $duration * $position));
        $temporaryPath = $cachePath . '.' . bin2hex(random_bytes(6)) . '.tmp.jpg';

        try {
            $process = new Process([
                'ffmpeg', '-y', '-ss', sprintf('%.3F', $timestamp), '-i', $sourcePath,
                '-frames:v', '1', '-vf', sprintf(
                    'scale=%1$d:%1$d:force_original_aspect_ratio=decrease:force_divisible_by=2',
                    self::MAX_PREVIEW_DIMENSION,
                ),
                '-q:v', '2', $temporaryPath,
            ]);
            $process->setTimeout(30);
            $process->run();

            if (!$process->isSuccessful() || !is_readable($temporaryPath)) {
                throw new \RuntimeException('FFmpeg could not extract the requested video frame.');
            }

            if (!$this->filesystem->exists($cachePath)) {
                $this->filesystem->rename($temporaryPath, $cachePath);
                $this->trimCachedFrames((int) $asset->getId());
            }
        } finally {
            if ($this->filesystem->exists($temporaryPath)) {
                $this->filesystem->remove($temporaryPath);
            }
        }

        return $cachePath;
    }

    private function readDuration(string $sourcePath): float
    {
        $process = new Process([
            'ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', $sourcePath,
        ]);
        $process->run();
        $duration = (float) trim($process->getOutput());

        if (!$process->isSuccessful() || $duration <= 0) {
            throw new \RuntimeException('The video duration could not be read.');
        }

        return $duration;
    }

    private function trimCachedFrames(int $assetId): void
    {
        $frames = glob(sprintf('%s/%d-*.jpg', $this->cacheDirectory, $assetId)) ?: [];
        if (count($frames) <= self::MAX_CACHED_FRAMES_PER_VIDEO) {
            return;
        }

        usort($frames, static fn (string $left, string $right): int => filemtime($left) <=> filemtime($right));
        $this->filesystem->remove(array_slice($frames, 0, count($frames) - self::MAX_CACHED_FRAMES_PER_VIDEO));
    }
}
