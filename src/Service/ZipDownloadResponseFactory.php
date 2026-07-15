<?php

namespace App\Service;

use Closure;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\HttpFoundation\StreamedResponse;
use ZipStream\CompressionMethod;
use ZipStream\OperationMode;
use ZipStream\ZipStream;

final class ZipDownloadResponseFactory
{
    /**
     * @param list<array{archiveName: string, sourcePath?: string, content?: string}> $entries
     */
    public function create(
        string $archiveName,
        array $entries,
        ?Closure $beforeStream = null,
        ?Closure $afterStream = null,
        $outputStream = null
    ): StreamedResponse
    {
        // A fixed content length and stored entries are more reliable for multi-GB downloads.
        $zip = new ZipStream(
            operationMode: OperationMode::SIMULATE_STRICT,
            outputName: $archiveName,
            outputStream: $outputStream,
            defaultCompressionMethod: CompressionMethod::STORE,
            defaultEnableZeroHeader: false,
            sendHttpHeaders: false,
            flushOutput: true,
        );

        foreach ($entries as $entry) {
            if (isset($entry['sourcePath'])) {
                $size = filesize($entry['sourcePath']);

                if ($size === false) {
                    continue;
                }

                $zip->addFileFromPath(
                    fileName: $entry['archiveName'],
                    path: $entry['sourcePath'],
                    exactSize: $size,
                );
                continue;
            }

            if (isset($entry['content'])) {
                $zip->addFile(
                    fileName: $entry['archiveName'],
                    data: $entry['content'],
                    exactSize: strlen($entry['content']),
                );
            }
        }

        $contentLength = $zip->finish();

        $response = new StreamedResponse(function () use ($beforeStream, $afterStream, $zip): void {
            try {
                if ($beforeStream) {
                    $beforeStream();
                }

                @ignore_user_abort(true);
                @set_time_limit(0);

                $zip->executeSimulation();
            } finally {
                if ($afterStream) {
                    $afterStream();
                }
            }
        });

        $response->headers->set('Content-Type', 'application/zip');
        $response->headers->set('Content-Length', (string) $contentLength);
        $response->headers->set(
            'Content-Disposition',
            $response->headers->makeDisposition(ResponseHeaderBag::DISPOSITION_ATTACHMENT, $archiveName)
        );
        $response->headers->set('Content-Transfer-Encoding', 'binary');
        $response->headers->set('Cache-Control', 'public, must-revalidate');
        $response->headers->set('Pragma', 'public');
        $response->headers->set('X-Accel-Buffering', 'no');

        return $response;
    }
}
