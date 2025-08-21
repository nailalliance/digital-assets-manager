<?php

namespace App\Service;

use Symfony\Component\Filesystem\Exception\IOException;

class UniqueFilePathGenerator
{
    static public function get(string $directory, string $filename): string
    {
        $filePath = $directory . DIRECTORY_SEPARATOR . $filename;
        if (!file_exists($filePath)) {
            return $filePath;
        }

        $originalName = pathinfo($filename, PATHINFO_FILENAME);
        $extension = pathinfo($filename, PATHINFO_EXTENSION);

        for ($a = 1; $a <= 2000; $a++) {
            $newName = sprintf("%s(%d).%s", $originalName, $a, $extension);
            $newPath = $directory . DIRECTORY_SEPARATOR . $newName;
            if (!file_exists($newPath)) {
                return $newPath;
            }
        }

        throw new IOException("Could not find a unique filename for \"{$filename}\" after 2000 attempts.");
    }
}
