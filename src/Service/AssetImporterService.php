<?php

namespace App\Service;

use App\Entity\Assets\Assets;
use App\Entity\Assets\Brands;
use App\Entity\Assets\Categories;
use App\Entity\Assets\Collections;
use App\Entity\Assets\ColorSpaceEnum;
use App\Entity\Assets\ItemCodes;
use App\Entity\Assets\Tags;
use App\Entity\Assets\AssetStatusEnum;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Filesystem\Exception\IOException;
use Symfony\Component\Filesystem\Filesystem;

class AssetImporterService
{
    private string $uploadDir;
    private string $thumbnailDir;

    public function __construct(
        private readonly EntityManagerInterface $entityManager,
        private readonly Filesystem $filesystem,
        private readonly ParameterBagInterface $params
    ) {
        $this->uploadDir = $this->params->get('upload_dir');
        $this->thumbnailDir = $this->params->get('thumbnail_dir');
    }

    /**
     * Imports an array of asset data into the DAM.
     *
     * @param array $assetsData
     * @return array An array of the newly created Asset IDs.
     */
    public function import(array $assetsData): array
    {
        $createdAssetIds = [];

        foreach ($assetsData as $data) {
            // Skip this record if the filePath is missing or null.
            if (empty($data['filePath'])) {
                continue;
            }

            // Start the transaction manually
            $this->entityManager->getConnection()->beginTransaction();
            try {
                $assetDetails = $this->processAssetFile($data['filePath']);
                $thumbnailPath = $this->processThumbnailFile($data['thumbnailPath'], $assetDetails['safeFilename']);

                $asset = new Assets();
                $asset->setName($data['name']);
                $asset->setDescription($data['description'] ?? null);
                $asset->setFilePath($assetDetails['path']);
                $asset->setThumbnailPath($thumbnailPath);
                $asset->setMimeType($assetDetails['mimeType']);
                $asset->setFileSize($assetDetails['fileSize']);
                $asset->setColorSpace($assetDetails['colorSpace']);
                $asset->setStatus($data['status'] ? AssetStatusEnum::from($data['status']) : AssetStatusEnum::INACTIVE);

                if (!empty($data['embargoDate'])) {
                    $asset->setEmbargoDate(new \DateTimeImmutable($data['embargoDate']));
                }
                if (!empty($data['expirationDate'])) {
                    $asset->setExpirationDate(new \DateTimeImmutable($data['expirationDate']));
                }

                if (!empty($data['uploadedby'])) {
                    $uploader = $this->entityManager->getReference(User::class, $data['uploadedby']);
                    if ($uploader) {
                        $asset->setUploader($uploader);
                    }
                }

                $this->handleCollections($asset, $data['collection'] ?? null, $data['collection_year'] ?? null);

                $this->handleRelationships($asset, ItemCodes::class, 'itemCode', $data['itemcode'] ?? null, 'code');
                $this->handleRelationships($asset, Brands::class, 'brand', $data['brand'] ?? null, 'name');
                $this->handleRelationships($asset, Categories::class, 'category', $data['category'] ?? null, 'name');
                $this->handleRelationships($asset, Tags::class, 'tag', $data['tag'] ?? null, 'name');

                $this->entityManager->persist($asset);

                // Manually flush to trigger any potential errors
                $this->entityManager->flush();

                // If we get here, everything was successful, so commit the transaction
                $this->entityManager->getConnection()->commit();

                $createdAssetIds[] = $asset->getId();

            } catch (\Throwable $e) {
                // If any error occurs, roll back the transaction
                $this->entityManager->getConnection()->rollBack();

                // CRITICAL: Re-throw the exception so we can see it in the console
                throw $e;
            }
        }

        return $createdAssetIds;
    }

    private function processAssetFile(string $sourcePath): array
    {
        if (!$this->filesystem->exists($sourcePath)) {
            throw new \Exception("Source file does not exist: {$sourcePath}");
        }

        $originalFilename = basename($sourcePath);
        $safeFilename = preg_replace('/[^A-Za-z0-9\-\_\.]/', '-', $originalFilename);

        $firstLetter = strtolower(mb_substr($safeFilename, 0, 1));
        $secondLetter = strtolower(mb_substr($safeFilename, 1, 1));
        $finalDir = sprintf('%s/%s/%s', $this->uploadDir, $firstLetter, $secondLetter);
        $this->filesystem->mkdir($finalDir);

        $finalFilePath = $this->getUniqueFilePath($finalDir, $safeFilename);
        $this->filesystem->copy($sourcePath, $finalFilePath);

        $colorSpace = ColorSpaceEnum::RGB;
        if (class_exists('Imagick') && str_starts_with(mime_content_type($finalFilePath), 'image/')) {
            try {
                $image = new \Imagick($finalFilePath);
                if ($image->getImageColorspace() === \Imagick::COLORSPACE_CMYK) {
                    $colorSpace = ColorSpaceEnum::CMYK;
                }
            } catch (\ImagickException $e) {}
        }

        return [
            'path' => $finalFilePath,
            'safeFilename' => $safeFilename,
            'fileSize' => filesize($finalFilePath),
            'mimeType' => mime_content_type($finalFilePath),
            'colorSpace' => $colorSpace,
        ];
    }

    private function processThumbnailFile(?string $sourcePath, string $assetSafeFilename): ?string
    {
        if (empty($sourcePath) || !$this->filesystem->exists($sourcePath)) {
            return null;
        }

        $targetWidth = 300;
        $targetHeight = 300;

        // 1. Create the subdirectory structure based on the main asset's filename
        $firstLetter = strtolower(mb_substr($assetSafeFilename, 0, 1));
        $secondLetter = strtolower(mb_substr($assetSafeFilename, 1, 1));
        $finalDir = sprintf('%s/%s/%s', $this->thumbnailDir, $firstLetter, $secondLetter);
        $this->filesystem->mkdir($finalDir);

        // 2. Determine the final path for the thumbnail
        $thumbnailFilename = pathinfo($assetSafeFilename, PATHINFO_FILENAME) . '_thumb.webp';
        $finalThumbnailPath = $this->getUniqueFilePath($finalDir, $thumbnailFilename);

        // 3. Process with Imagick if available
        if (class_exists('Imagick')) {
            try {
                $image = new \Imagick($sourcePath);
                $image->thumbnailImage($targetWidth, $targetHeight, true, true);
                $canvas = new \Imagick();
                $canvas->newImage($targetWidth, $targetHeight, 'white', 'webp');
                $x = ($targetWidth - $image->getImageWidth()) / 2;
                $y = ($targetHeight - $image->getImageHeight()) / 2;
                $canvas->compositeImage($image, \Imagick::COMPOSITE_OVER, $x, $y);
                $canvas->writeImage($finalThumbnailPath);

                return $finalThumbnailPath;
            } catch (\ImagickException $e) {
                // If Imagick fails, fall through to the simple copy method
            }
        }

        // 4. Fallback: If Imagick is not available or failed, just copy the file
        try {
            $this->filesystem->copy($sourcePath, $finalThumbnailPath);
            return $finalThumbnailPath;
        } catch (IOException $e) {
            // Could not copy the file
            return null;
        }
    }

    private function handleCollections(Assets $asset, ?string $collectionName, ?string $collectionYear): void
    {
        if (empty($collectionName)) {
            return;
        }

        $repository = $this->entityManager->getRepository(Collections::class);

        // Find an existing collection by both name and year
        $collection = $repository->findOneBy([
            'name' => $collectionName,
            'year' => $collectionYear
        ]);

        // If it doesn't exist, create a new one
        if (!$collection) {
            $collection = new Collections();
            $collection->setName($collectionName);
            $collection->setYear((int)$collectionYear); // Cast year to integer
            $this->entityManager->persist($collection);
        }

        $asset->addCollection($collection);
    }

    private function handleRelationships(Assets $asset, string $entityClass, string $property, ?string $commaSeparatedValues, string $searchField): void
    {
        if (empty($commaSeparatedValues)) {
            return;
        }

        $repository = $this->entityManager->getRepository($entityClass);
        $adderMethod = 'add' . ucfirst($property);

        $values = array_unique(array_filter(array_map('trim', explode(',', $commaSeparatedValues))));

        foreach ($values as $value) {
            $entity = $repository->findOneBy([$searchField => $value]);

            if (!$entity) {
                $entity = new $entityClass();
                $setter = 'set' . ucfirst($searchField);
                $entity->$setter($value);
                $this->entityManager->persist($entity);
            }
            $asset->$adderMethod($entity);
        }
    }

    private function getUniqueFilePath(string $directory, string $filename): string
    {
        $filePath = $directory . '/' . $filename;
        if (!$this->filesystem->exists($filePath)) {
            return $filePath;
        }

        $originalName = pathinfo($filename, PATHINFO_FILENAME);
        $extension = pathinfo($filename, PATHINFO_EXTENSION);

        for ($i = 2; $i <= 2000; ++$i) {
            $newName = sprintf('%s(%d).%s', $originalName, $i, $extension);
            $newPath = $directory . '/' . $newName;
            if (!$this->filesystem->exists($newPath)) {
                return $newPath;
            }
        }

        throw new IOException("Could not find a unique filename for \"{$filename}\" after 2000 attempts.");
    }
}
