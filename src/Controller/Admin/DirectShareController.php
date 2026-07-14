<?php

namespace App\Controller\Admin;

use App\Message\ProcessDirectShare;
use App\Security\TusUploadTokenManager;
use App\Tus\Cache\PerUploadFileStore;
use App\Tus\OptimizedTusServer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Routing\Attribute\Route;
use TusPhp\Events\TusEvent;

#[Route('/admin/direct-share')]
class DirectShareController extends AbstractController
{
    public function __construct(
        private MessageBusInterface $messageBus,
        private TusUploadTokenManager $uploadTokenManager,
    )
    {
    }

    #[Route('/', name: 'admin_direct_share_index', methods: ['GET'])]
    public function index(): Response
    {
        return $this->render('admin/direct_share/index.html.twig', [
            'uploadAuthToken' => $this->uploadTokenManager->createForUser($this->getUser()),
        ]);
    }

    #[Route(
        "/upload/{fileId?}",
        name: 'admin_direct_share_upload',
        requirements: ['fileId' => '.*'],
        methods: ['POST', 'HEAD', 'PATCH', 'DELETE', 'OPTIONS']
    )]
    public function upload(Request $request): Response
    {
        $userId = $this->getUser()?->getId();
        $cacheDir = rtrim($this->getParameter('direct_uploads_dir'), DIRECTORY_SEPARATOR) . '/.tus-cache';

        if ($request->hasSession()) {
            $request->getSession()->save();
        }

        $server = new OptimizedTusServer(
            new PerUploadFileStore($cacheDir)
        );
        $server
            ->setUploadDir($this->getParameter('direct_uploads_dir')) // Use a separate temp directory
            ->setApiPath('/admin/direct-share/upload');

        $server->event()->addListener('tus-server.upload.complete', function (TusEvent $event) use ($userId) {
            $this->onUploadComplete($event, $userId);
        });

        return $server->serve();
    }

    public function onUploadComplete(TusEvent $event, ?int $userId): void
    {
        $this->messageBus->dispatch(new ProcessDirectShare(
            fileMetaData: $event->getFile()->details(),
            uploadKey: $event->getFile()->getKey(),
            userId: $userId
        ));
    }
}
