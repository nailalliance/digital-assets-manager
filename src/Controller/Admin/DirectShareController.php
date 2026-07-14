<?php

namespace App\Controller\Admin;

use App\Message\ProcessDirectShare;
use App\Entity\Downloads\OneTimeLinks;
use App\Security\TusUploadTokenManager;
use App\Tus\Cache\PerUploadFileStore;
use App\Tus\OptimizedTusServer;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Uid\Uuid;
use TusPhp\Events\TusEvent;

#[Route('/admin/direct-share')]
class DirectShareController extends AbstractController
{
    public function __construct(
        private MessageBusInterface $messageBus,
        private TusUploadTokenManager $uploadTokenManager,
        private EntityManagerInterface $entityManager,
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

    #[Route('/session', name: 'admin_direct_share_session', methods: ['POST'])]
    public function createSession(): JsonResponse
    {
        $oneTimeLink = new OneTimeLinks();
        $oneTimeLink->setToken(Uuid::v4()->toBase32());
        $oneTimeLink->setExpirationDate(new \DateTimeImmutable('+30 days'));
        $oneTimeLink->setTemporaryFiles([]);

        if ($this->getUser() !== null) {
            $oneTimeLink->setCreator($this->getUser());
        }

        $this->entityManager->persist($oneTimeLink);
        $this->entityManager->flush();

        return $this->json([
            'token' => $oneTimeLink->getToken(),
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
        $fileMetaData = $event->getFile()->details();
        $shareToken = $fileMetaData['metadata']['share_token'] ?? $event->getFile()->getKey();

        $this->messageBus->dispatch(new ProcessDirectShare(
            fileMetaData: $fileMetaData,
            uploadKey: $event->getFile()->getKey(),
            shareToken: $shareToken,
            userId: $userId
        ));
    }
}
