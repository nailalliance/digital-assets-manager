<?php

namespace App\Controller\Admin;

use App\Entity\Assets\Assets;
use App\Message\ProcessAssetUpload;
use Psr\Cache\CacheItemPoolInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Routing\Attribute\Route;
use TusPhp\Events\TusEvent;
use TusPhp\Tus\Server;

class UploadController extends AbstractController
{
    private ?string $cacheItemKeyName = null;

    public function __construct(
        private CacheItemPoolInterface $cache,
        private MessageBusInterface $messageBus
    )
    {}

    #[Route('/admin/assets/upload', name: 'app_asset_upload', methods: ['GET'])]
    public function index(): Response
    {
        return $this->render('admin/asset_upload/index.html.twig', [
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
        return $this->handleTusRequest($request, $fileId, null);
    }

    #[Route(
        "/admin/assets/{id}/upload/{fileId?}", // New route for existing assets
        name: 'app_asset_update_file',
        requirements: ['fileId' => '.*'],
        methods: ['POST', 'HEAD', 'PATCH', 'DELETE', 'OPTIONS'],
    )]
    public function postToAsset(Request $request, Assets $asset, ?string $fileId): Response
    {
        return $this->handleTusRequest($request, $fileId, $asset->getId());
    }

    private function handleTusRequest(
       Request $request,
       ?string $fileId,
       ?int $assetId
    ): Response
    {
        $this->setCacheItemKeyName($fileId);

        $server = new Server("file");

        $apiPath = $assetId
            ? $this->generateUrl('app_asset_update_file', ['id' => $assetId])
            : $this->generateUrl('app_asset_upload');

        $server
            ->setUploadDir($this->getParameter('upload_dir'))
            ->setApiPath($apiPath);

        $server->event()->addListener('tus-server.upload.complete', function (TusEvent $event) use ($assetId) {
            $this->onUploadComplete($event, $assetId);
        });

        $response = $server->serve();

        if ($request->isMethod(Request::METHOD_PATCH) && $this->cacheItemKeyName) {
            $cacheItem = $this->cache->getItem($this->cacheItemKeyName);

            if ($cacheItem->isHit()) {
                $response->headers->set('X-Asset-Id', $cacheItem->get());
                $response->headers->set('Access-Control-Expose-Headers', 'X-Asset-Id');

                $this->cache->deleteItem($this->cacheItemKeyName);
            }
        }

        return $response->send();
    }

    public function onUploadComplete(TusEvent $event, ?int $assetId): void
    {
        $this->messageBus->dispatch(new ProcessAssetUpload(
            fileMetaData: $event->getFile()->details(),
            uploadKey: $event->getFile()->getKey(),
            userId: $this->getUser()->getId(),
            cacheItemKeyName: $this->cacheItemKeyName,
            assetId: $assetId
        ));
    }

    private function setCacheItemKeyName(?string $cacheItemKeyName): void
    {
        $this->cacheItemKeyName = "tus_asset_id_{$cacheItemKeyName}";
    }
}
