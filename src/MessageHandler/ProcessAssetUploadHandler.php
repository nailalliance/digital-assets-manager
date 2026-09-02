<?php

namespace App\MessageHandler;

use App\Entity\Assets\Assets;
use App\Entity\Assets\Brands;
use App\Entity\Assets\Categories;
use App\Entity\Assets\Collections;
use App\Entity\Assets\ColorSpaceEnum;
use App\Entity\User;
use App\Message\ProcessAssetUpload;
use App\Message\ProcessWebVideo;
use App\Repository\Assets\AssetsRepository;
use App\Service\ImageProcessorService;
use App\Service\UniqueFilePathGenerator;
use App\Service\Video\FFMPEG;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Filesystem\Exception\FileNotFoundException;
use Symfony\Component\Filesystem\Exception\IOException;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Lock\LockFactory;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;
use Symfony\Component\Messenger\MessageBusInterface;
use function basename;
use function is_null;
use function mb_substr;
use function sprintf;
use const DIRECTORY_SEPARATOR;

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
        private readonly string $uploadDir,
        private readonly ?MessageBusInterface $messageBus = null,
    )
    {
    }

    public function __invoke(ProcessAssetUpload $message): void
    {
        $lock = $this->lockFactory->createLock('process-upload-' . $message->uploadKey, 30);
        $filePath = $message->fileMetaData['file_path'] ?? null;
        $finalFilePath = null;
        $sourceFileMoved = false;

        if (!$lock->acquire(true)) {
            return;
        }

        try {
            if ($this->assetsRepository->findOneBy(['tusUploadKey' => $message->uploadKey])) {
                return;
            }

            $fileMetaData = $message->fileMetaData;
            $originalFilename = $fileMetaData['metadata']['original_filename'] ?? $fileMetaData['metadata']['filename'];
            $fileSize = $fileMetaData['size'];
            $mimeType = $fileMetaData['metadata']['filetype'];

            if (!is_string($filePath) || !$this->filesystem->exists($filePath)) {
                throw new FileNotFoundException(null, 0, null, is_string($filePath) ? $filePath : null);
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
            $this->filesystem->rename($filePath, $finalFilePath);
            $sourceFileMoved = true;

            if ($message->assetId)
            {
                $asset = $this->assetsRepository->find($message->assetId);
                if (!$asset) {
                    return;
                }
            } else {
                $asset = new Assets();
                $asset->setName($originalFilename);
                $this->applyTaxonomyMetadata($asset, $fileMetaData['metadata'] ?? []);
            }

            $colorSpace = ColorSpaceEnum::RGB;
            if (class_exists('Imagick') && in_array($mimeType, ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'], true)) {
                try {
                    $image = new \Imagick($finalFilePath);
                    if ($image->getImageColorspace() === \Imagick::COLORSPACE_CMYK) {
                        $colorSpace = ColorSpaceEnum::CMYK;
                    }
                } catch (\ImagickException $e) {
                }
            }

            $thumbnailBinary = null;
            $targetWidth = 700;
            $targetHeight = 700;

            if (mb_substr($mimeType, 0, 6) === 'video/') {
                $frame = null;
                try {
                    $frame = FFMPEG::getFirstFrame($finalFilePath, sys_get_temp_dir() . DIRECTORY_SEPARATOR . basename($finalFilePath) . ".jpg");
                } catch (\Exception $e) {

                }

                if (!is_null($frame) && $this->filesystem->exists($frame)) {
                    $thumbnailBinary = $this->imageProcessorService->makeThumbnail($frame, $targetWidth, $targetHeight);
                    $this->filesystem->remove($frame);
                }
            }

            if (in_array($mimeType, ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'], true)) {
                $thumbnailBinary = $this->imageProcessorService->makeThumbnail($finalFilePath, $targetWidth, $targetHeight);
            }

            if (!is_null($thumbnailBinary)) {
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

            if (str_starts_with($mimeType, 'video/') && $asset->getId() !== null && $this->messageBus !== null) {
                $asset->setWebVideoStatus('pending')->setWebVideoError(null);
                $this->entityManager->flush();
                $this->messageBus->dispatch(new ProcessWebVideo($asset->getId()));
            }
            $sourceFileMoved = false;

        } finally {
            if (
                $sourceFileMoved
                && is_string($filePath)
                && is_string($finalFilePath)
                && $this->filesystem->exists($finalFilePath)
                && !$this->filesystem->exists($filePath)
            ) {
                try {
                    $this->filesystem->rename($finalFilePath, $filePath, true);
                } catch (IOException) {
                    // Preserve the original processing error; the final file remains recoverable in place.
                }
            }

            $lock->release();
        }
    }

    private function applyTaxonomyMetadata(Assets $asset, array $metadata): void
    {
        $brandIds = $this->parseTaxonomyIds($metadata['brand_ids'] ?? null);
        if ($brandIds !== []) {
            $brands = $this->entityManager->getRepository(Brands::class)->findBy([
                'id' => $brandIds,
                'status' => true,
            ]);

            foreach ($brands as $brand) {
                if ($brand instanceof Brands) {
                    $asset->addBrand($brand);
                }
            }
        }

        $categoryIds = $this->parseTaxonomyIds($metadata['category_ids'] ?? null);
        if ($categoryIds !== []) {
            $categories = $this->entityManager->getRepository(Categories::class)->findBy([
                'id' => $categoryIds,
                'status' => true,
            ]);

            foreach ($categories as $category) {
                if ($category instanceof Categories) {
                    $asset->addCategory($category);
                }
            }
        }

        $collectionIds = $this->parseTaxonomyIds($metadata['collection_ids'] ?? null);
        if ($collectionIds !== []) {
            $collections = $this->entityManager->getRepository(Collections::class)->findBy([
                'id' => $collectionIds,
                'status' => true,
            ]);

            foreach ($collections as $collection) {
                if ($collection instanceof Collections) {
                    $asset->addCollection($collection);
                }
            }
        }
    }

    /**
     * @return list<int>
     */
    private function parseTaxonomyIds(mixed $value): array
    {
        if (!is_string($value) || $value === '') {
            return [];
        }

        $ids = [];
        foreach (explode(',', $value) as $candidate) {
            $candidate = trim($candidate);
            if (!ctype_digit($candidate)) {
                continue;
            }

            $id = (int) $candidate;
            if ($id > 0) {
                $ids[$id] = $id;
            }
        }

        return array_values($ids);
    }
}
