<?php

namespace App\Controller\Admin;

use App\Repository\Downloads\OneTimeLinksRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

final class DirectShareStatusController extends AbstractController
{
    #[Route('/admin/direct-share/status/{uploadKey}', name: 'app_direct_share_status_check')]
    public function index(
        string $uploadKey,
        OneTimeLinksRepository $oneTimeLinksRepository,
        UrlGeneratorInterface $urlGenerator
    ): JsonResponse {
        // Find the OneTimeLink using the unique key from the Tus upload
        $oneTimeLink = $oneTimeLinksRepository->findOneBy(['tusUploadKey' => $uploadKey]);

        if ($oneTimeLink) {
            return $this->json([
                'status' => 'complete',
                'url' => $urlGenerator->generate(
                    'public_download_list',
                    ['token' => $oneTimeLink->getToken()],
                    UrlGeneratorInterface::ABSOLUTE_URL
                ),
            ]);
        }

        return $this->json(['status' => 'processing'], 202);
    }
}
