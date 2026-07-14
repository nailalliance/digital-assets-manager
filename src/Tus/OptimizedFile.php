<?php

namespace App\Tus;

use TusPhp\File;
use TusPhp\Exception\ConnectionException;
use TusPhp\Exception\OutOfRangeException;

class OptimizedFile extends File
{
    private const IO_CHUNK_SIZE = 1048576;
    private const OFFSET_SYNC_INTERVAL = 8388608;

    public function upload(int $totalBytes): int
    {
        if ($this->offset === $totalBytes) {
            return $this->offset;
        }

        $input = $this->open($this->getInputStream(), self::READ_BINARY);
        $output = $this->open($this->getFilePath(), self::APPEND_BINARY);
        $key = $this->getKey();
        $nextOffsetSync = min($totalBytes, $this->offset + self::OFFSET_SYNC_INTERVAL);

        try {
            $this->seek($output, $this->offset);

            while (!feof($input) && $this->offset < $totalBytes) {
                if (CONNECTION_NORMAL !== connection_status()) {
                    throw new ConnectionException('Connection aborted by user.');
                }

                $bytesRemaining = $totalBytes - $this->offset;
                $data = $this->read($input, min(self::IO_CHUNK_SIZE, $bytesRemaining));

                if ($data === '') {
                    break;
                }

                $this->offset += $this->write($output, $data);

                if ($this->offset > $totalBytes) {
                    throw new OutOfRangeException('The uploaded file is corrupt.');
                }

                if ($this->offset >= $nextOffsetSync || $this->offset === $totalBytes) {
                    $this->cache->set($key, ['offset' => $this->offset]);
                    $nextOffsetSync = min($totalBytes, $this->offset + self::OFFSET_SYNC_INTERVAL);
                }
            }
        } finally {
            $this->close($input);
            $this->close($output);
        }

        return $this->offset;
    }
}
