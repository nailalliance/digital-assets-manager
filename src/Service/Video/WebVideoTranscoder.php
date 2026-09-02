<?php

namespace App\Service\Video;

use Symfony\Component\Process\Process;

final class WebVideoTranscoder
{
    private const MAX_WEB_DIMENSION = 1920;

    public function transcode(string $sourcePath, string $outputPath): void
    {
        $process = new Process([
            'ffmpeg', '-y', '-i', $sourcePath,
            '-map', '0:v:0', '-map', '0:a?',
            '-vf', sprintf(
                'scale=%1$d:%1$d:force_original_aspect_ratio=decrease:force_divisible_by=2',
                self::MAX_WEB_DIMENSION,
            ),
            '-c:v', 'libx264', '-crf', '20', '-preset', 'medium', '-pix_fmt', 'yuv420p',
            '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart',
            $outputPath,
        ]);
        $process->setTimeout(null);
        $process->run();

        if (!$process->isSuccessful() || !is_file($outputPath) || filesize($outputPath) === 0) {
            throw new \RuntimeException('FFmpeg could not create the browser-ready MP4 rendition.');
        }
    }

    public function extractPoster(string $sourcePath, string $outputPath): void
    {
        $process = new Process([
            'ffmpeg', '-y', '-ss', '00:00:00.5', '-i', $sourcePath, '-frames:v', '1', '-q:v', '2', $outputPath,
        ]);
        $process->run();

        if (!$process->isSuccessful() || !is_file($outputPath) || filesize($outputPath) === 0) {
            throw new \RuntimeException('FFmpeg could not extract a preview frame.');
        }
    }
}
