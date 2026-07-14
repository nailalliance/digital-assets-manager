<?php

namespace App\Tests\Tus;

use App\Tus\OptimizedFile;
use PHPUnit\Framework\TestCase;
use TusPhp\Cache\AbstractCache;

final class OptimizedFileTest extends TestCase
{
    public function testItBatchesOffsetWritesWhilePreservingUploadedData(): void
    {
        $inputPath = tempnam(sys_get_temp_dir(), 'tus-input-');
        $outputPath = tempnam(sys_get_temp_dir(), 'tus-output-');

        self::assertNotFalse($inputPath);
        self::assertNotFalse($outputPath);

        file_put_contents($inputPath, str_repeat('A', 10 * 1024 * 1024));
        file_put_contents($outputPath, '');

        $cache = new InMemoryTusCache();
        $cache->set('upload-key', ['offset' => 0]);

        $file = new TestOptimizedFile($inputPath, $cache);
        $file
            ->setMeta(0, filesize($inputPath), $outputPath)
            ->setKey('upload-key');

        $offset = $file->upload(filesize($inputPath));

        self::assertSame(filesize($inputPath), $offset);
        self::assertSame(file_get_contents($inputPath), file_get_contents($outputPath));
        self::assertSame(filesize($inputPath), $cache->get('upload-key')['offset']);
        self::assertSame(3, $cache->setCalls);

        @unlink($inputPath);
        @unlink($outputPath);
    }

    public function testItFlushesTheFinalOffsetAtTheEndOfANonFinalPatch(): void
    {
        $inputPath = tempnam(sys_get_temp_dir(), 'tus-input-');
        $outputPath = tempnam(sys_get_temp_dir(), 'tus-output-');

        self::assertNotFalse($inputPath);
        self::assertNotFalse($outputPath);

        file_put_contents($inputPath, str_repeat('B', 10 * 1024 * 1024));
        file_put_contents($outputPath, '');

        $cache = new InMemoryTusCache();
        $cache->set('upload-key', ['offset' => 0]);

        $file = new TestOptimizedFile($inputPath, $cache);
        $file
            ->setMeta(0, 20 * 1024 * 1024, $outputPath)
            ->setKey('upload-key');

        $offset = $file->upload(20 * 1024 * 1024);

        self::assertSame(10 * 1024 * 1024, $offset);
        self::assertSame(10 * 1024 * 1024, $cache->get('upload-key')['offset']);
        self::assertSame(3, $cache->setCalls);

        @unlink($inputPath);
        @unlink($outputPath);
    }
}

final class TestOptimizedFile extends OptimizedFile
{
    public function __construct(
        private readonly string $inputPath,
        InMemoryTusCache $cache
    ) {
        parent::__construct('demo.bin', $cache);
    }

    public function getInputStream(): string
    {
        return $this->inputPath;
    }
}

final class InMemoryTusCache extends AbstractCache
{
    public int $setCalls = 0;

    private array $items = [];

    public function get(string $key, bool $withExpired = false)
    {
        return $this->items[$key] ?? null;
    }

    public function set(string $key, $value)
    {
        $this->setCalls++;

        if (isset($this->items[$key]) && is_array($this->items[$key]) && is_array($value)) {
            $this->items[$key] = $value + $this->items[$key];
        } else {
            $this->items[$key] = $value;
        }

        return true;
    }

    public function delete(string $key): bool
    {
        unset($this->items[$key]);

        return true;
    }

    public function keys(): array
    {
        return array_keys($this->items);
    }
}
