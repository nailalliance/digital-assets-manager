<?php

namespace App\Tests\MessageHandler;

use App\Entity\Assets\Assets;
use App\Entity\Assets\Brands;
use App\Entity\Assets\Categories;
use App\Entity\Assets\Collections;
use App\Message\ProcessAssetUpload;
use App\MessageHandler\ProcessAssetUploadHandler;
use App\Repository\Assets\AssetsRepository;
use App\Service\ImageProcessorService;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\EntityManagerInterface;
use PHPUnit\Framework\TestCase;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Lock\LockFactory;
use Symfony\Component\Lock\SharedLockInterface;

class ProcessAssetUploadHandlerTest extends TestCase
{
    public function testItAppliesSharedTaxonomiesToANewAsset(): void
    {
        $filesystem = new Filesystem();
        $uploadDir = sys_get_temp_dir().'/asset-upload-handler-'.bin2hex(random_bytes(8));
        $sourcePath = $uploadDir.'/upload-key.bin';
        $filesystem->mkdir($uploadDir);
        $filesystem->dumpFile($sourcePath, 'asset contents');

        $brand = (new Brands())->setName('Brand');
        $category = (new Categories())->setName('Category');
        $collection = (new Collections())->setName('Collection')->setYear(2026);

        $brandRepository = $this->createMock(EntityRepository::class);
        $brandRepository->expects(self::once())
            ->method('findBy')
            ->with(['id' => [10, 11], 'status' => true])
            ->willReturn([$brand]);
        $categoryRepository = $this->createMock(EntityRepository::class);
        $categoryRepository->expects(self::once())
            ->method('findBy')
            ->with(['id' => [20], 'status' => true])
            ->willReturn([$category]);
        $collectionRepository = $this->createMock(EntityRepository::class);
        $collectionRepository->expects(self::once())
            ->method('findBy')
            ->with(['id' => [30], 'status' => true])
            ->willReturn([$collection]);

        $persistedAsset = null;
        $entityManager = $this->createMock(EntityManagerInterface::class);
        $entityManager->method('getRepository')->willReturnCallback(
            static fn (string $className): EntityRepository => match ($className) {
                Brands::class => $brandRepository,
                Categories::class => $categoryRepository,
                Collections::class => $collectionRepository,
            },
        );
        $entityManager->expects(self::once())
            ->method('persist')
            ->willReturnCallback(static function (object $entity) use (&$persistedAsset): void {
                $persistedAsset = $entity;
            });
        $entityManager->expects(self::once())->method('flush');

        $assetsRepository = $this->createMock(AssetsRepository::class);
        $assetsRepository->method('findOneBy')->willReturn(null);

        $lock = $this->createMock(SharedLockInterface::class);
        $lock->method('acquire')->with(true)->willReturn(true);
        $lock->expects(self::once())->method('release');
        $lockFactory = $this->createMock(LockFactory::class);
        $lockFactory->method('createLock')->willReturn($lock);

        $handler = new ProcessAssetUploadHandler(
            $entityManager,
            $assetsRepository,
            $lockFactory,
            $this->createStub(ImageProcessorService::class),
            $this->createStub(ParameterBagInterface::class),
            $filesystem,
            $uploadDir,
        );

        $handler(new ProcessAssetUpload(
            fileMetaData: [
                'file_path' => $sourcePath,
                'size' => 14,
                'metadata' => [
                    'filename' => 'upload-key.bin',
                    'original_filename' => 'example.bin',
                    'filetype' => 'application/octet-stream',
                    'brand_ids' => '10,11,10,invalid,-1',
                    'category_ids' => '20',
                    'collection_ids' => '30',
                ],
            ],
            uploadKey: 'upload-key',
            userId: null,
            cacheItemKeyName: null,
        ));

        self::assertInstanceOf(Assets::class, $persistedAsset);
        self::assertTrue($persistedAsset->getBrand()->contains($brand));
        self::assertTrue($persistedAsset->getCategories()->contains($category));
        self::assertTrue($persistedAsset->getCollections()->contains($collection));
        self::assertFileExists($uploadDir.'/e/x/example.bin');

        $filesystem->remove($uploadDir);
    }

    public function testItRestoresTheUploadWhenPersistenceFails(): void
    {
        $filesystem = new Filesystem();
        $uploadDir = sys_get_temp_dir().'/asset-upload-handler-'.bin2hex(random_bytes(8));
        $sourcePath = $uploadDir.'/upload-key.bin';
        $filesystem->mkdir($uploadDir);
        $filesystem->dumpFile($sourcePath, 'asset contents');

        $entityManager = $this->createMock(EntityManagerInterface::class);
        $entityManager->expects(self::once())->method('persist');
        $entityManager->expects(self::once())->method('flush')->willThrowException(new \RuntimeException('Flush failed'));

        $assetsRepository = $this->createMock(AssetsRepository::class);
        $assetsRepository->method('findOneBy')->willReturn(null);

        $lock = $this->createMock(SharedLockInterface::class);
        $lock->expects(self::once())->method('acquire')->with(true)->willReturn(true);
        $lock->expects(self::once())->method('release');
        $lockFactory = $this->createMock(LockFactory::class);
        $lockFactory->method('createLock')->willReturn($lock);

        $handler = new ProcessAssetUploadHandler(
            $entityManager,
            $assetsRepository,
            $lockFactory,
            $this->createStub(ImageProcessorService::class),
            $this->createStub(ParameterBagInterface::class),
            $filesystem,
            $uploadDir,
        );
        $message = new ProcessAssetUpload(
            fileMetaData: [
                'file_path' => $sourcePath,
                'size' => 14,
                'metadata' => [
                    'filename' => 'upload-key.bin',
                    'original_filename' => 'example.bin',
                    'filetype' => 'application/octet-stream',
                ],
            ],
            uploadKey: 'upload-key',
            userId: null,
            cacheItemKeyName: null,
        );

        try {
            $handler($message);
            self::fail('The persistence failure should be rethrown.');
        } catch (\RuntimeException $exception) {
            self::assertSame('Flush failed', $exception->getMessage());
        }

        self::assertFileExists($sourcePath);
        self::assertFileDoesNotExist($uploadDir.'/e/x/example.bin');

        $filesystem->remove($uploadDir);
    }
}
