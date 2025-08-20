<?php

namespace App\MessageHandler;

use App\Entity\Assets\Assets;
use App\Entity\Assets\ColorSpaceEnum;
use App\Entity\User;
use App\Message\ProcessAssetUpload;
use App\Repository\Assets\AssetsRepository;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Cache\CacheItemPoolInterface;
use Symfony\Component\Filesystem\Exception\IOException;
use Symfony\Component\Lock\LockFactory;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

#[AsMessageHandler]
final class ProcessAssetUploadHandler
{
    public function __construct(
        private readonly EntityManagerInterface $entityManager,
        private readonly AssetsRepository $assetsRepository,
        private readonly LockFactory $lockFactory,
        private readonly string $uploadDir
    )
    {
    }

    public function __invoke(ProcessAssetUpload $message): void
    {
        $lock = $this->lockFactory->createLock('process-upload-' . $message->uploadKey, 30);

        if (!$lock->acquire(true)) {
            return;
        }

        try {
            if ($this->assetsRepository->findOneBy(['tusUploadKey' => $message->uploadKey])) {
                return;
            }

            $fileMetaData = $message->fileMetaData;
            $originalFilename = $fileMetaData['metadata']['filename'];
            $filePath = $fileMetaData['file_path'];
            $fileSize = $fileMetaData['size'];
            $mimeType = $fileMetaData['metadata']['filetype'];

            $colorSpace = ColorSpaceEnum::RGB;
            if (class_exists('Imagick')) {
                try {
                    $image = new \Imagick($filePath);
                    if ($image->getImageColorspace() === \Imagick::COLORSPACE_CMYK) {
                        $colorSpace = ColorSpaceEnum::CMYK;
                    }
                } catch (\ImagickException $e) {
                }
            }

            $safeFilename = str_replace(' ', '-', $originalFilename);
            $safeFilename = preg_replace('/[^A-Za-z0-9\-\_\.]/', '', $safeFilename);

            $firstLetter = strtolower(mb_substr($safeFilename, 0, 1));
            $secondLetter = strtolower(mb_substr($safeFilename, 1, 1));
            $finalDir = sprintf('%s/%s/%s', $this->uploadDir, $firstLetter, $secondLetter);

            if (!is_dir($finalDir)) {
                mkdir($finalDir, 0755, true);
            }

            $finalFilePath = $this->getUniqueFilePath($finalDir, $safeFilename);
            rename($filePath, $finalFilePath);

            $asset = new Assets();
            $asset->setName($originalFilename);
            $asset->setFilePath($finalFilePath);
            $asset->setMimeType($mimeType);
            $asset->setFileSize($fileSize);
            $asset->setColorSpace($colorSpace);
            $asset->setTusUploadKey($message->uploadKey);

            if ($message->userId) {
                $user = $this->entityManager->getReference(User::class, $message->userId);
                $asset->setUploader($user);
            }

            $this->entityManager->persist($asset);
            $this->entityManager->flush();

        } finally {
            $lock->release();
        }
    }

    private function getUniqueFilePath(string $directory, string $filename): string
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
