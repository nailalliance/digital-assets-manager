<?php

namespace App\Controller\Admin;

use App\Entity\Assets\Assets;
use App\Entity\Assets\ColorSpaceEnum;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Imagick;
use Psr\Cache\CacheItemPoolInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Log\Logger;
use Symfony\Component\Routing\Attribute\Route;
use TusPhp\Events\TusEvent;
use TusPhp\Tus\Server;

class UploadController extends AbstractController
{
    private ?string $cacheItemKeyName = null;

    public function __construct(
        private EntityManagerInterface $entityManager,
        private CacheItemPoolInterface $cache
    )
    {}

    #[Route('/admin/assets/upload', name: 'app_asset_upload', methods: ['GET'])]
    public function index(EntityManagerInterface $entityManager): Response
    {
        return $this->render('admin/asset_upload/index.html.twig', [
            'controller_name' => 'AssetUploadController',
        ]);
    }

    #[Route(
        "/admin/assets/upload/{fileId?}",
        name: 'app_asset_upload_form',
        requirements: ['fileId' => '.*'],
        methods: ['POST', 'HEAD', 'PATCH', 'DELETE', 'OPTIONS'],
    )]
    public function post(Request $request, ?string $fileId): Response
    {
        $this->setCacheItemKeyName($fileId);

        $server = new Server("file");

        $server
            ->setUploadDir($this->getParameter('upload_dir'))
            ->setApiPath('/admin/assets/upload');

        $server->event()->addListener('tus-server.upload.complete', [$this, 'onUploadComplete']);

        $response = $server->serve();

        if ($request->isMethod(Request::METHOD_PATCH) && $this->cacheItemKeyName) {
            $cacheItem = $this->cache->getItem($this->cacheItemKeyName);

            if ($cacheItem->isHit()) {
                $assetId = $cacheItem->get();
                $response->headers->set('X-Asset-Id', $assetId);
                $response->headers->set('Access-Control-Expose-Headers', 'X-Asset-Id');

                $this->cache->deleteItem($this->cacheItemKeyName);
            }
        }

        return $response->send();
    }

    public function onUploadComplete(TusEvent $event): void
    {
        $fileMetaData = $event->getFile()->details();

        $originalFilename = $fileMetaData['metadata']['filename'];
        $filePath = $fileMetaData['file_path'];
        $fileSize = $fileMetaData['size'];
        $mimeType = $fileMetaData['metadata']['filetype'];

        $colorSpace = ColorSpaceEnum::RGB;

        try {
            $image = new Imagick($filePath);
            if ($image->getImageColorspace() !== Imagick::COLORSPACE_CMYK) {
                $colorSpace = ColorSpaceEnum::CMYK;
            }
        } catch (\ImagickException $e)
        {

        }

        try {
            $asset = new Assets();

            $asset->setName($originalFilename);
            $asset->setFilePath($filePath);
            $asset->setMimeType($mimeType);
            $asset->setFileSize($fileSize);
            $asset->setColorSpace($colorSpace);

            $user = $this->entityManager->getRepository(User::class)
                ->find($this->getUser()->getId());

            $asset->setUploader($user);

            $this->entityManager->persist($asset);
            $this->entityManager->flush();

            $cacheItem = $this->cache->getItem($this->cacheItemKeyName);
            $cacheItem->set($asset->getId());
            $cacheItem->expiresAfter(300);
            $this->cache->save($cacheItem);
        } catch (\Throwable $exception) {
            $logger = new Logger();
            $logger->error('Upload Error', [$exception->getMessage()]);
        }
    }

    private function setCacheItemKeyName(?string $cacheItemKeyName): void
    {
        $this->cacheItemKeyName = "tus_asset_id_{$cacheItemKeyName}";
    }
}
