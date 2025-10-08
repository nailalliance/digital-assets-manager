<?php

namespace App\Service\Video;

use Exception;
use function basename;
use function escapeshellarg;
use function exec;
use function implode;
use const DIRECTORY_SEPARATOR;

class FFMPEG
{
    static function getLastFrame(string $uri, string $outputPath): string
    {
        // Command to extract the last frame using ffmpeg
        // -sseof -3: Seeks 3 seconds from the end of the file to ensure we get past any potential audio-only extensions or black frames.
        // -i: Specifies the input file.
        // -update 1: Tells ffmpeg to overwrite the output file if it exists.
        // -q:v 1: Sets the video quality (1 is the highest quality for JPEG).
        $command = "ffmpeg -sseof -3 -i " . escapeshellarg($uri) . " -update 1 -q:v 1 " . escapeshellarg($outputPath);

        $output = "";
        $returnCode = 1;

        // Execute the command
        exec($command, $output, $returnCode);

        if ($returnCode === 0) {
            return $outputPath;
            // echo "Last frame extracted successfully to: " . $outputPath;
        } else {
            $errorMessage = "Error extracting last frame. Return code: " . $returnCode . "\n";
            $errorMessage .= "Output: " . implode("\n", $output);
            throw new Exception($errorMessage);
        }
    }

    static function getFirstFrame(string $uri, string $outputPath): string
    {
        // Command to extract the last frame using ffmpeg
        // -sseof -3: Seeks 3 seconds from the end of the file to ensure we get past any potential audio-only extensions or black frames.
        // -i: Specifies the input file.
        // -update 1: Tells ffmpeg to overwrite the output file if it exists.
        // -q:v 1: Sets the video quality (1 is the highest quality for JPEG).
        $command = "ffmpeg -ss 3 -i " . escapeshellarg($uri) . " -update 1 -q:v 1 " . escapeshellarg($outputPath);

        $output = "";
        $returnCode = 1;

        // Execute the command
        exec($command, $output, $returnCode);

        if ($returnCode === 0) {
            return $outputPath;
            // echo "Last frame extracted successfully to: " . $outputPath;
        } else {
            $errorMessage = "Error extracting first frame. Return code: " . $returnCode . " -> ";
            $errorMessage .= "Output: " . implode("\n", $output) . " -> ";
            $errorMessage .= "Command: " . $command;
            throw new Exception($errorMessage);
        }
    }
}
