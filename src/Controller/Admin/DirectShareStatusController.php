<?php

namespace App\Controller\Admin;

use App\Repository\Downloads\OneTimeLinksRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

final class DirectShareStatusController extends AbstractController
{
    #[Route('/admin/direct-share/status/{token}', name: 'app_direct_share_status_check')]
    public function index(
        string $token,
        Request $request,
        OneTimeLinksRepository $oneTimeLinksRepository,
        UrlGeneratorInterface $urlGenerator
    ): JsonResponse {
        $oneTimeLink = $oneTimeLinksRepository->findOneBy(['token' => $token]);

        if (!$oneTimeLink) {
            return $this->json(['status' => 'processing', 'processedCount' => 0], 202);
        }

        $expectedCount = $oneTimeLink->getExpectedFileCount() ?? max(0, (int) $request->query->get('expected', 0));
        $processedCount = $oneTimeLink->getTemporaryFileCount();
        $isComplete = $oneTimeLink->isUploadComplete()
            || ($expectedCount > 0 && $processedCount >= $expectedCount);

        if ($isComplete) {
            return $this->json([
                'status' => 'complete',
                'processedCount' => $processedCount,
                'expectedCount' => $expectedCount,
                'url' => $urlGenerator->generate(
                    'public_download_list',
                    ['token' => $oneTimeLink->getToken()],
                    UrlGeneratorInterface::ABSOLUTE_URL
                ),
            ]);
        }

        return $this->json([
            'status' => 'processing',
            'processedCount' => $processedCount,
            'expectedCount' => $expectedCount,
        ], 202);
    }
}
