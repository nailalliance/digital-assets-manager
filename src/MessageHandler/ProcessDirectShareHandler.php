<?php

namespace App\MessageHandler;

use App\Entity\Downloads\OneTimeLinks;
use App\Entity\User;
use App\Message\ProcessDirectShare;
use App\Repository\Downloads\OneTimeLinksRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Lock\LockFactory;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;

#[AsMessageHandler]
final class ProcessDirectShareHandler
{
    public function __construct(
        private readonly EntityManagerInterface $entityManager,
        private readonly OneTimeLinksRepository $oneTimeLinksRepository,
        private readonly LockFactory $lockFactory,
    ) {
    }

    public function __invoke(ProcessDirectShare $message): void
    {
        $lock = $this->lockFactory->createLock('process-direct-share-' . $message->shareToken, 30);

        if (!$lock->acquire(true)) {
            return;
        }

        $fileMetaData = $message->fileMetaData;
        $originalFilename = $fileMetaData['metadata']['original_filename'] ?? $fileMetaData['metadata']['filename'];

        try {
            $oneTimeLink = $this->oneTimeLinksRepository->findOneBy(['token' => $message->shareToken]);

            if ($oneTimeLink === null) {
                $oneTimeLink = new OneTimeLinks();
                $oneTimeLink->setToken($message->shareToken);
                $oneTimeLink->setExpirationDate(new \DateTimeImmutable('+30 days', new \DateTimeZone('UTC')));
                $oneTimeLink->setTemporaryFiles([]);
            }

            if ($oneTimeLink->getExpectedFileCount() === null && $message->expectedFileCount !== null) {
                $oneTimeLink->setExpectedFileCount($message->expectedFileCount);
            }

            if ($oneTimeLink->getTusUploadKey() === null) {
                $oneTimeLink->setTusUploadKey($message->uploadKey);
            }

            $oneTimeLink->appendTemporaryFile([
                'path' => $fileMetaData['file_path'],
                'originalName' => $originalFilename,
                'size' => $fileMetaData['size'],
                'mimeType' => $fileMetaData['metadata']['filetype'],
                'tusUploadKey' => $message->uploadKey,
            ]);

            if ($message->userId && $oneTimeLink->getCreator() === null) {
                $user = $this->entityManager->getReference(User::class, $message->userId);
                $oneTimeLink->setCreator($user);
            }

            $expectedFileCount = $oneTimeLink->getExpectedFileCount();
            if ($expectedFileCount !== null && $expectedFileCount > 0 && $oneTimeLink->getTemporaryFileCount() >= $expectedFileCount) {
                $oneTimeLink->setUploadCompletedAt(new \DateTimeImmutable('now', new \DateTimeZone('UTC')));
            }

            $this->entityManager->persist($oneTimeLink);
            $this->entityManager->flush();
        } finally {
            $lock->release();
        }
    }
}
