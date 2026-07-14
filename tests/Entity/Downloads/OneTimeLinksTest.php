<?php

namespace App\Tests\Entity\Downloads;

use App\Entity\Downloads\OneTimeLinks;
use PHPUnit\Framework\TestCase;

final class OneTimeLinksTest extends TestCase
{
    public function testAppendTemporaryFileSkipsDuplicateTusUploadKeys(): void
    {
        $oneTimeLink = new OneTimeLinks();
        $oneTimeLink->setTemporaryFiles([]);

        $oneTimeLink->appendTemporaryFile([
            'path' => '/tmp/first.zip',
            'originalName' => 'first.zip',
            'size' => 123,
            'mimeType' => 'application/zip',
            'tusUploadKey' => 'upload-1',
        ]);
        $oneTimeLink->appendTemporaryFile([
            'path' => '/tmp/first-copy.zip',
            'originalName' => 'first-copy.zip',
            'size' => 456,
            'mimeType' => 'application/zip',
            'tusUploadKey' => 'upload-1',
        ]);

        self::assertSame(1, $oneTimeLink->getTemporaryFileCount());
        self::assertTrue($oneTimeLink->hasTemporaryFileUploadKey('upload-1'));
        self::assertSame('first.zip', $oneTimeLink->getTemporaryFiles()[0]['originalName']);
    }

    public function testAppendTemporaryFileAddsDistinctUploadsInOrder(): void
    {
        $oneTimeLink = new OneTimeLinks();
        $oneTimeLink->setTemporaryFiles([]);

        $oneTimeLink->appendTemporaryFile([
            'path' => '/tmp/first.zip',
            'originalName' => 'first.zip',
            'size' => 123,
            'mimeType' => 'application/zip',
            'tusUploadKey' => 'upload-1',
        ]);
        $oneTimeLink->appendTemporaryFile([
            'path' => '/tmp/second.zip',
            'originalName' => 'second.zip',
            'size' => 456,
            'mimeType' => 'application/zip',
            'tusUploadKey' => 'upload-2',
        ]);

        self::assertSame(2, $oneTimeLink->getTemporaryFileCount());
        self::assertSame(
            ['first.zip', 'second.zip'],
            array_column($oneTimeLink->getTemporaryFiles(), 'originalName')
        );
    }

    public function testUploadCompleteDependsOnUploadCompletedAt(): void
    {
        $oneTimeLink = new OneTimeLinks();

        self::assertFalse($oneTimeLink->isUploadComplete());

        $oneTimeLink->setUploadCompletedAt(new \DateTimeImmutable('now', new \DateTimeZone('UTC')));

        self::assertTrue($oneTimeLink->isUploadComplete());
    }
}
