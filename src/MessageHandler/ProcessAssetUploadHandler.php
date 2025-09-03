<?php

namespace App\MessageHandler;

use App\Entity\Assets\Assets;
use App\Entity\Assets\ColorSpaceEnum;
use App\Entity\User;
use App\Message\ProcessAssetUpload;
use App\Repository\Assets\AssetsRepository;
use App\Service\ImageProcessorService;
use App\Service\UniqueFilePathGenerator;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Cache\CacheItemPoolInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Filesystem\Exception\IOException;
use Symfony\Component\Filesystem\Filesystem;
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
        private readonly ImageProcessorService $imageProcessorService,
        private readonly ParameterBagInterface $params,
        private readonly Filesystem $filesystem,
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

            $finalFilePath = UniqueFilePathGenerator::get($finalDir, $safeFilename);
            rename($filePath, $finalFilePath);

            $asset = new Assets();

            if (in_array($mimeType, ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'], true)) {
                $thumbnailBinary = $this->imageProcessorService->makeThumbnail($finalFilePath, 700, 700);

                if ($thumbnailBinary) {
                    $thumbnailDir = $this->params->get('thumbnail_dir');
                    $safeFilename = basename($finalFilePath);
                    $firstLetter = strtolower(mb_substr($safeFilename, 0, 1));
                    $secondLetter = strtolower(mb_substr($safeFilename, 1, 1));
                    $finalDir = sprintf('%s/%s/%s', $thumbnailDir, $firstLetter, $secondLetter);
                    $this->filesystem->mkdir($finalDir);
                    $thumbnailPath = $finalDir . '/' . pathinfo($safeFilename, PATHINFO_FILENAME) . '.webp';

                    $this->filesystem->dumpFile($thumbnailPath, $thumbnailBinary);
                    $asset->setThumbnailPath($thumbnailPath);
                }
            }

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
}
