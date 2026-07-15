<?php

namespace App\Tests\Service;

use App\Service\ZipDownloadResponseFactory;
use PHPUnit\Framework\TestCase;

class ZipDownloadResponseFactoryTest extends TestCase
{
    public function testCreateBuildsZipResponseWithStableHeadersAndValidArchive(): void
    {
        $firstFile = tempnam(sys_get_temp_dir(), 'zip-download-');
        $secondFile = tempnam(sys_get_temp_dir(), 'zip-download-');
        $archivePath = null;

        $this->assertNotFalse($firstFile);
        $this->assertNotFalse($secondFile);

        file_put_contents($firstFile, 'alpha');
        file_put_contents($secondFile, 'beta');

        $beforeStreamCalled = false;
        $afterStreamCalled = false;
        $outputStream = fopen('php://temp', 'w+b');
        $this->assertNotFalse($outputStream);

        try {
            $factory = new ZipDownloadResponseFactory();
            $response = $factory->create(
                'bundle.zip',
                [
                    ['archiveName' => 'first.txt', 'sourcePath' => $firstFile],
                    ['archiveName' => 'second.txt', 'sourcePath' => $secondFile],
                    ['archiveName' => 'readme.txt', 'content' => "hello\nworld"],
                ],
                function () use (&$beforeStreamCalled): void {
                    $beforeStreamCalled = true;
                },
                function () use (&$afterStreamCalled): void {
                    $afterStreamCalled = true;
                },
                $outputStream
            );

            $this->assertSame('application/zip', $response->headers->get('Content-Type'));
            $this->assertSame('no', $response->headers->get('X-Accel-Buffering'));
            $this->assertStringContainsString('public', (string) $response->headers->get('Cache-Control'));
            $this->assertStringContainsString('must-revalidate', (string) $response->headers->get('Cache-Control'));
            $this->assertStringContainsString(
                'bundle.zip',
                (string) $response->headers->get('Content-Disposition')
            );

            $contentLength = (int) $response->headers->get('Content-Length');
            $this->assertGreaterThan(0, $contentLength);

            $response->sendContent();
            rewind($outputStream);
            $archiveContent = stream_get_contents($outputStream);
            $this->assertIsString($archiveContent);

            $this->assertTrue($beforeStreamCalled);
            $this->assertTrue($afterStreamCalled);
            $this->assertSame($contentLength, strlen($archiveContent));

            $archivePath = tempnam(sys_get_temp_dir(), 'zip-download-archive-');
            $this->assertNotFalse($archivePath);
            file_put_contents($archivePath, $archiveContent);

            $zip = new \ZipArchive();
            $this->assertTrue($zip->open($archivePath) === true);
            $this->assertSame('alpha', $zip->getFromName('first.txt'));
            $this->assertSame('beta', $zip->getFromName('second.txt'));
            $this->assertSame("hello\nworld", $zip->getFromName('readme.txt'));
            $this->assertSame(3, $zip->numFiles);
            $zip->close();

        } finally {
            if (is_resource($outputStream)) {
                fclose($outputStream);
            }

            if (is_string($archivePath) && file_exists($archivePath)) {
                unlink($archivePath);
            }

            if (is_string($firstFile) && file_exists($firstFile)) {
                unlink($firstFile);
            }

            if (is_string($secondFile) && file_exists($secondFile)) {
                unlink($secondFile);
            }
        }
    }
}
