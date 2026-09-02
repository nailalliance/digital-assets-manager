<?php

namespace App\Service\Video;

use Symfony\Component\Process\Process;

final class WebVideoTranscoder
{
    private const MAX_WEB_DIMENSION = 1920;

    public function isBrowserReady(string $sourcePath): bool
    {
        if (!is_readable($sourcePath)) {
            return false;
        }

        $process = new Process([
            'ffprobe', '-v', 'error',
            '-show_entries', 'format=format_name:stream=codec_type,codec_name,pix_fmt,width,height',
            '-of', 'json',
            $sourcePath,
        ]);
        $process->run();

        if (!$process->isSuccessful()) {
            return false;
        }

        $metadata = json_decode($process->getOutput(), true);
        if (!is_array($metadata) || !str_contains((string) ($metadata['format']['format_name'] ?? ''), 'mp4')) {
            return false;
        }

        $videoStream = null;
        foreach ($metadata['streams'] ?? [] as $stream) {
            if (($stream['codec_type'] ?? null) === 'video' && $videoStream === null) {
                $videoStream = $stream;
                continue;
            }

            if (($stream['codec_type'] ?? null) === 'audio' && ($stream['codec_name'] ?? null) !== 'aac') {
                return false;
            }
        }

        if (!is_array($videoStream)) {
            return false;
        }

        $width = (int) ($videoStream['width'] ?? 0);
        $height = (int) ($videoStream['height'] ?? 0);

        return ($videoStream['codec_name'] ?? null) === 'h264'
            && ($videoStream['pix_fmt'] ?? null) === 'yuv420p'
            && $width > 0
            && $height > 0
            && max($width, $height) <= self::MAX_WEB_DIMENSION
            && $this->hasFastStart($sourcePath);
    }

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

    private function hasFastStart(string $sourcePath): bool
    {
        $handle = @fopen($sourcePath, 'rb');
        if ($handle === false) {
            return false;
        }

        try {
            $prefix = fread($handle, 1024 * 1024);
        } finally {
            fclose($handle);
        }

        if (!is_string($prefix)) {
            return false;
        }

        $movieAtom = strpos($prefix, 'moov');
        $mediaAtom = strpos($prefix, 'mdat');

        return $movieAtom !== false && $mediaAtom !== false && $movieAtom < $mediaAtom;
    }
}
