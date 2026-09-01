<?php

namespace App\Service\Video;

use App\Entity\Assets\Assets;
use App\Service\CanvasEditorScriptRenderer;
use App\Service\EditorFontCatalog;
use Symfony\Component\Process\Process;

final class CanvasEditorVideoRenderer
{
    private const SUPPORTED_MIME_TYPES = ['video/mp4', 'video/webm', 'video/quicktime'];

    public function __construct(
        private readonly CanvasEditorScriptRenderer $scriptRenderer,
        private readonly EditorFontCatalog $fontCatalog,
    ) {
    }

    /**
     * @return array{path: string}
     */
    public function render(Assets $asset, string $rawScript): array
    {
        $sourcePath = $asset->getFilePath();
        if (!in_array($asset->getMimeType(), self::SUPPORTED_MIME_TYPES, true) || !is_string($sourcePath) || !is_readable($sourcePath)) {
            throw new \RuntimeException('The video source is not available for export.');
        }

        $script = $this->scriptRenderer->parseScript($rawScript);
        [$sourceWidth, $sourceHeight] = $this->readVideoDimensions($sourcePath);
        $state = $this->scriptRenderer->buildRenderableStateForSource($script, $sourceWidth, $sourceHeight);
        $filterGraph = $this->buildFilterGraph($state, $sourceWidth, $sourceHeight);
        $outputPath = sprintf('%s/canvas-video-%s.mp4', sys_get_temp_dir(), bin2hex(random_bytes(16)));

        $process = new Process([
            'ffmpeg', '-y', '-i', $sourcePath, '-filter_complex', $filterGraph, '-map', '[editor_video]', '-map', '0:a?',
            '-c:v', 'libx264', '-crf', '20', '-preset', 'medium', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k',
            '-movflags', '+faststart', $outputPath,
        ]);
        $process->setTimeout(null);
        $process->run();

        if (!$process->isSuccessful() || !is_file($outputPath) || filesize($outputPath) === 0) {
            @unlink($outputPath);
            throw new \RuntimeException('FFmpeg could not render the edited video.');
        }

        return ['path' => $outputPath];
    }

    /** @return array{0: int, 1: int} */
    private function readVideoDimensions(string $sourcePath): array
    {
        $process = new Process([
            'ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0:s=x', $sourcePath,
        ]);
        $process->run();

        if (!$process->isSuccessful() || preg_match('/^(\\d+)x(\\d+)$/', trim($process->getOutput()), $matches) !== 1) {
            throw new \RuntimeException('The video dimensions could not be read.');
        }

        return [max(1, (int) $matches[1]), max(1, (int) $matches[2])];
    }

    /** @param array<string, mixed> $state */
    private function buildFilterGraph(array $state, int $sourceWidth, int $sourceHeight): string
    {
        $crop = $state['crop'];
        $baseImage = $state['baseImage'];
        $outputWidth = $this->makeEven((int) round($crop['width']));
        $outputHeight = $this->makeEven((int) round($crop['height']));
        $scaledWidth = $this->makeEven((int) round($sourceWidth * $baseImage['scale']));
        $scaledHeight = $this->makeEven((int) round($sourceHeight * $baseImage['scale']));
        $baseLeft = ($baseImage['offsetX'] * $sourceWidth) + (($sourceWidth - $scaledWidth) / 2);
        $baseTop = ($baseImage['offsetY'] * $sourceHeight) + (($sourceHeight - $scaledHeight) / 2);

        $filters = [
            sprintf('[0:v]scale=%d:%d[scaled]', $scaledWidth, $scaledHeight),
            sprintf('color=c=black:s=%dx%d[background]', $outputWidth, $outputHeight),
            sprintf('[background][scaled]overlay=x=%d:y=%d:shortest=1[base]', (int) round($baseLeft - $crop['left']), (int) round($baseTop - $crop['top'])),
        ];

        $previousLabel = 'base';
        foreach ($state['texts'] as $index => $text) {
            $nextLabel = $index === count($state['texts']) - 1 ? 'editor_video' : 'text_' . $index;
            $fontPath = $this->resolveFontPath($text);
            $fontSize = max(8, (int) round($text['fontSize']));
            $lineHeight = $fontSize * 1.2;
            $lines = preg_split('/\\R/', $text['text']) ?: [''];

            foreach ($lines as $lineIndex => $line) {
                $x = match ($text['textAlign']) {
                    'center' => sprintf('(%d+%d/2-text_w/2)', (int) round($text['left'] - $crop['left']), (int) round($text['width'])),
                    'right' => sprintf('(%d+%d-text_w)', (int) round($text['left'] - $crop['left']), (int) round($text['width'])),
                    default => (string) (int) round($text['left'] - $crop['left']),
                };
                $y = (int) round($text['top'] - $crop['top'] + ($lineIndex * $lineHeight));
                $drawText = sprintf(
                    "drawtext=fontfile='%s':text='%s':fontcolor=%s:fontsize=%d:x=%s:y=%d",
                    $this->escapeFilterValue($fontPath),
                    $this->escapeFilterValue($line),
                    $text['color'],
                    $fontSize,
                    $x,
                    $y,
                );
                $lineLabel = $lineIndex === count($lines) - 1 ? $nextLabel : sprintf('line_%d_%d', $index, $lineIndex);
                $filters[] = sprintf('[%s]%s[%s]', $previousLabel, $drawText, $lineLabel);
                $previousLabel = $lineLabel;
            }
        }

        if ($state['texts'] === []) {
            $filters[] = '[base]null[editor_video]';
        }

        return implode(';', $filters);
    }

    /** @param array<string, mixed> $text */
    private function resolveFontPath(array $text): string
    {
        $fontKey = is_string($text['fontKey'] ?? null) ? $text['fontKey'] : '';
        $face = $fontKey === '' ? null : $this->fontCatalog->findFontFaceByKey($fontKey);
        $fontPath = $face['path'] ?? $this->fontCatalog->resolveFontFile($text['fontFamily'], $text['fontWeight'], $text['fontStyle']);

        if (!is_string($fontPath) || !is_readable($fontPath)) {
            throw new \RuntimeException(sprintf('The selected font "%s" is not available for video export.', $text['fontFamily']));
        }

        return $fontPath;
    }

    private function makeEven(int $value): int
    {
        return max(2, $value - ($value % 2));
    }

    private function escapeFilterValue(string $value): string
    {
        return str_replace(['\\', ':', "'", '%'], ['\\\\', '\\:', "\\'", '\\%'], $value);
    }
}
