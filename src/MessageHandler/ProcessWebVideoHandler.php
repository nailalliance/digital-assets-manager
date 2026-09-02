<?php

namespace App\MessageHandler;

use App\Entity\Assets\AssetVersionTypeEnum;
use App\Entity\Assets\Assets;
use App\Message\ProcessWebVideo;
use App\Repository\Assets\AssetsRepository;
use App\Service\ImageProcessorService;
use App\Service\Video\WebVideoTranscoder;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Lock\LockFactory;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;

#[AsMessageHandler]
final class ProcessWebVideoHandler
{
    private const SUPPORTED_MIME_TYPES = ['video/mp4', 'video/webm', 'video/quicktime'];

    public function __construct(
        private readonly AssetsRepository $assetsRepository,
        private readonly EntityManagerInterface $entityManager,
        private readonly LockFactory $lockFactory,
        private readonly WebVideoTranscoder $transcoder,
        private readonly ImageProcessorService $imageProcessor,
        private readonly ParameterBagInterface $parameterBag,
        private readonly Filesystem $filesystem,
    ) {
    }

    public function __invoke(ProcessWebVideo $message): void
    {
        $lock = $this->lockFactory->createLock('web-video-rendition-' . $message->assetId, 3600);
        if (!$lock->acquire(true)) {
            return;
        }

        $temporaryPosterPath = null;
        try {
            $asset = $this->assetsRepository->find($message->assetId);
            if (!$asset instanceof Assets || !in_array($asset->getMimeType(), self::SUPPORTED_MIME_TYPES, true)) {
                return;
            }

            $existingRendition = $this->findWebRendition($asset);
            if (!$message->force && $existingRendition !== null && is_readable((string) $existingRendition->getFilePath())) {
                $asset->setWebVideoStatus('ready')->setWebVideoError(null);
                $this->entityManager->flush();
                return;
            }

            $sourcePath = $asset->getFilePath();
            if (!is_string($sourcePath) || !is_readable($sourcePath)) {
                throw new \RuntimeException('The original video source is not readable.');
            }

            $asset->setWebVideoStatus('processing')->setWebVideoError(null);
            $this->entityManager->flush();

            $outputPath = sprintf('%s/%s-web.mp4', dirname($sourcePath), pathinfo($sourcePath, PATHINFO_FILENAME));
            $this->transcoder->transcode($sourcePath, $outputPath);
            $temporaryPosterPath = sprintf('%s/web-video-poster-%s.jpg', sys_get_temp_dir(), bin2hex(random_bytes(12)));
            $this->transcoder->extractPoster($outputPath, $temporaryPosterPath);

            $rendition = $existingRendition ?? $this->createRendition($asset);
            $rendition->setFilePath($outputPath)
                ->setMimeType('video/mp4')
                ->setFileSize((int) filesize($outputPath))
                ->setThumbnailPath($this->writeThumbnail($temporaryPosterPath, $outputPath));

            $this->entityManager->persist($rendition);
            $asset->setWebVideoStatus('ready')->setWebVideoError(null);
            $this->entityManager->flush();
        } catch (\Throwable $exception) {
            if (isset($asset) && $asset instanceof Assets) {
                $asset->setWebVideoStatus('failed')->setWebVideoError($exception->getMessage());
                $this->entityManager->flush();
            }

            throw $exception;
        } finally {
            if (is_string($temporaryPosterPath) && $this->filesystem->exists($temporaryPosterPath)) {
                $this->filesystem->remove($temporaryPosterPath);
            }
            $lock->release();
        }
    }

    private function findWebRendition(Assets $asset): ?Assets
    {
        foreach ($asset->getChildren() as $child) {
            if ($child->getAssetVersionTypeEnum() === AssetVersionTypeEnum::WEB_VIDEO) {
                return $child;
            }
        }

        return null;
    }

    private function createRendition(Assets $asset): Assets
    {
        $rendition = new Assets();
        $rendition->setParent($asset)
            ->setAssetVersionTypeEnum(AssetVersionTypeEnum::WEB_VIDEO)
            ->setName($asset->getName())
            ->setDescription($asset->getDescription())
            ->setUploader($asset->getUploader());

        if ($asset->getStatus() !== null) {
            $rendition->setStatus($asset->getStatus());
        }
        if ($asset->getColorSpace() !== null) {
            $rendition->setColorSpace($asset->getColorSpace());
        }

        foreach ($asset->getBrand() as $brand) {
            $rendition->addBrand($brand);
        }
        foreach ($asset->getCategories() as $category) {
            $rendition->addCategory($category);
        }
        foreach ($asset->getCollections() as $collection) {
            $rendition->addCollection($collection);
        }
        foreach ($asset->getTags() as $tag) {
            $rendition->addTag($tag);
        }

        return $rendition;
    }

    private function writeThumbnail(string $posterPath, string $videoPath): ?string
    {
        $thumbnailBinary = $this->imageProcessor->makeThumbnail($posterPath, 700, 700);
        if ($thumbnailBinary === null) {
            return null;
        }

        $filename = basename($videoPath);
        $thumbnailDir = (string) $this->parameterBag->get('thumbnail_dir');
        $directory = sprintf('%s/%s/%s', $thumbnailDir, strtolower($filename[0]), strtolower($filename[1] ?? $filename[0]));
        $thumbnailPath = sprintf('%s/%s.webp', $directory, pathinfo($filename, PATHINFO_FILENAME));
        $this->filesystem->mkdir($directory);
        $this->filesystem->dumpFile($thumbnailPath, $thumbnailBinary);

        return $thumbnailPath;
    }
}
