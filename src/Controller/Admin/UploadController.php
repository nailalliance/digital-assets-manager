<?php

namespace App\Controller\Admin;

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
        $this->messageBus->dispatch(new ProcessAssetUpload(
            fileMetaData: $event->getFile()->details(),
            uploadKey: $event->getFile()->getKey(),
            userId: $this->getUser()->getId(),
            cacheItemKeyName: $this->cacheItemKeyName
        ));
    }

    private function setCacheItemKeyName(?string $cacheItemKeyName): void
    {
        $this->cacheItemKeyName = "tus_asset_id_{$cacheItemKeyName}";
    }
}
