<?php

namespace App\MessageHandler;

use App\Entity\Downloads\OneTimeLinks;
use App\Entity\User;
use App\Message\ProcessDirectShare;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;
use Symfony\Component\Uid\Uuid;

#[AsMessageHandler]
final class ProcessDirectShareHandler
{
    public function __construct(
        private readonly EntityManagerInterface $entityManager
    ) {
    }

    public function __invoke(ProcessDirectShare $message): void
    {
        $fileMetaData = $message->fileMetaData;

        $oneTimeLink = new OneTimeLinks();
        $oneTimeLink->setToken(Uuid::v4()->toBase32());
        $oneTimeLink->setExpirationDate(new \DateTimeImmutable('+30 days'));

        // Set the unique key from the upload
        $oneTimeLink->setTusUploadKey($message->uploadKey);

        $oneTimeLink->setTemporaryFiles([[
            'path' => $fileMetaData['file_path'],
            'originalName' => $fileMetaData['metadata']['filename'],
            'size' => $fileMetaData['size'],
            'mimeType' => $fileMetaData['metadata']['filetype'],
        ]]);

        if ($message->userId) {
            $user = $this->entityManager->getReference(User::class, $message->userId);
            $oneTimeLink->setCreator($user);
        }

        $this->entityManager->persist($oneTimeLink);
        $this->entityManager->flush();
    }
}
