<?php

namespace App\Tus;

use TusPhp\File;
use TusPhp\Tus\Server;

final class OptimizedTusServer extends Server
{
    protected function buildFile(array $meta): File
    {
        $file = new OptimizedFile($meta['name'], $this->cache);

        if (array_key_exists('offset', $meta)) {
            $file->setMeta($meta['offset'], $meta['size'], $meta['file_path'], $meta['location']);
        }

        return $file;
    }
}
