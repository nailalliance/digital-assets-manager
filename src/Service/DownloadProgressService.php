<?php

namespace App\Service;

use Symfony\Component\Filesystem\Filesystem;

final class DownloadProgressService
{
    private readonly string $progressDirectory;

    public function __construct(
        private readonly Filesystem $filesystem,
    ) {
        $this->progressDirectory = rtrim(sys_get_temp_dir(), '/') . '/download-progress';
        $this->filesystem->mkdir($this->progressDirectory);
    }

    /**
     * @return array<string, mixed>|null
     */
    public function get(string $token): ?array
    {
        $this->assertValidToken($token);
        $path = $this->buildPath($token);

        if (!is_readable($path)) {
            return null;
        }

        $decoded = json_decode((string) file_get_contents($path), true);

        return is_array($decoded) ? $decoded : null;
    }

    public function initialize(string $token, int $total, int $skipped = 0): void
    {
        $this->write($token, [
            'status' => 'running',
            'total' => max($total, 0),
            'processed' => 0,
            'skipped' => max($skipped, 0),
            'message' => $total > 0
                ? sprintf('Preparing %d edited %s...', $total, $total === 1 ? 'asset' : 'assets')
                : 'Preparing edited download...',
            'updatedAt' => time(),
        ]);
    }

    public function advance(string $token, int $processed, int $total, string $message): void
    {
        $this->write($token, [
            'status' => 'running',
            'total' => max($total, 0),
            'processed' => min(max($processed, 0), max($total, 0)),
            'skipped' => $this->get($token)['skipped'] ?? 0,
            'message' => $message,
            'updatedAt' => time(),
        ]);
    }

    public function fail(string $token, string $message): void
    {
        $current = $this->get($token);

        $this->write($token, [
            'status' => 'failed',
            'total' => (int) ($current['total'] ?? 0),
            'processed' => (int) ($current['processed'] ?? 0),
            'skipped' => (int) ($current['skipped'] ?? 0),
            'message' => $message,
            'updatedAt' => time(),
        ]);
    }

    public function complete(string $token, string $message = 'Edited ZIP is ready.'): void
    {
        $current = $this->get($token);
        $total = (int) ($current['total'] ?? 0);

        $this->write($token, [
            'status' => 'completed',
            'total' => $total,
            'processed' => $total,
            'skipped' => (int) ($current['skipped'] ?? 0),
            'message' => $message,
            'updatedAt' => time(),
        ]);
    }

    public function clear(string $token): void
    {
        $this->assertValidToken($token);
        $path = $this->buildPath($token);

        if (is_file($path)) {
            $this->filesystem->remove($path);
        }
    }

    /**
     * @param array<string, mixed> $payload
     */
    private function write(string $token, array $payload): void
    {
        $this->assertValidToken($token);
        $payload['token'] = $token;
        $this->filesystem->dumpFile($this->buildPath($token), json_encode($payload, \JSON_THROW_ON_ERROR));
    }

    private function buildPath(string $token): string
    {
        return $this->progressDirectory . '/' . $token . '.json';
    }

    private function assertValidToken(string $token): void
    {
        if (preg_match('/^[A-Za-z0-9._-]{12,120}$/', $token) !== 1) {
            throw new \InvalidArgumentException('The download token is invalid.');
        }
    }
}
