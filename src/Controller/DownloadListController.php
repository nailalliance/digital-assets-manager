<?php

namespace App\Controller;

use App\Entity\Assets\Assets;
use App\Entity\Downloads\Lists;
use App\Entity\Downloads\OneTimeLinks;
use App\Entity\User;
use App\Service\DownloadListService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Uid\Uuid;
use ZipStream\ZipStream;


#[Route('/download-list')]
class DownloadListController extends AbstractController
{
    /**
     * Displays the contents of the download list.
     */
    #[Route('/', name: 'download_list_index')]
    public function index(DownloadListService $downloadListService): Response
    {
        return $this->render('download_list/index.html.twig', [
            'assets' => $downloadListService->getAssets(),
        ]);
    }

    /**
     * Adds an asset to the download list.
     */
    #[Route('/add/{id}', name: 'download_list_add', methods: ['POST'])]
    public function add(Assets $asset, DownloadListService $downloadListService, Request $request): Response
    {
        $downloadListService->add($asset->getId());

        $this->addFlash('success', sprintf('"%s" has been added to your download bag.', $asset->getName()));

        // Redirect back to the page the user came from
        return $this->redirect($request->headers->get('referer', $this->generateUrl('home')));
    }

    /**
     * Removes an asset from the download list.
     */
    #[Route('/remove/{id}', name: 'download_list_remove', methods: ['POST'])]
    public function remove(Assets $asset, DownloadListService $downloadListService): Response
    {
        $downloadListService->remove($asset->getId());

        $this->addFlash('notice', sprintf('"%s" has been removed from your download bag.', $asset->getName()));

        return $this->redirectToRoute('download_list_index');
    }

    /**
     * Creates a permanent DownloadList and a temporary OneTimeLink for sharing.
     */
    #[Route('/share', name: 'download_list_share', methods: ['POST'])]
    public function share(
        DownloadListService $downloadListService,
        EntityManagerInterface $entityManager
    ): JsonResponse {
        // Ensure only designers can create share links
        $this->denyAccessUnlessGranted('ROLE_FTP_DESIGNER');

        $assets = $downloadListService->getAssets();

        if (empty($assets)) {
            return $this->json(['error' => 'Your download bag is empty.'], Response::HTTP_BAD_REQUEST);
        }

        // Create a new DownloadList entity
        $downloadList = new Lists();
        $user = $entityManager->getRepository(User::class)->find($this->getUser()->getId());
        $downloadList->setCreator($user);
        // For now, we'll treat all shared lists as named. You can add a form field later.
        $downloadList->setName('Shared on ' . date('Y-m-d'));

        foreach ($assets as $asset) {
            $downloadList->addAsset($asset);
        }

        // Create the one-time link
        $oneTimeLink = new OneTimeLinks();
        $oneTimeLink->setToken(Uuid::v4()->toBase32());
        $oneTimeLink->setDownloadList($downloadList);
        // Set expiration for 30 days from now
        $oneTimeLink->setExpirationDate(new \DateTimeImmutable('+30 days', new \DateTimeZone('UTC')));

        $entityManager->persist($downloadList);
        $entityManager->persist($oneTimeLink);
        $entityManager->flush();

        // Return the URL for the new link
        return $this->json([
            'url' => $this->generateUrl(
                'public_download_list',
                ['token' => $oneTimeLink->getToken()],
                UrlGeneratorInterface::ABSOLUTE_URL ),
        ]);
    }

    /**
     * Handles downloading all assets in the user's session bag as a single zip file.
     */
    #[Route('/zip', name: 'download_list_zip', methods: ['GET'])]
    public function zip(DownloadListService $downloadListService): StreamedResponse
    {
        $assets = $downloadListService->getAssets();
        $zipFileName = 'download_bag_' . date('Y-m-d') . '.zip';

        $response = new StreamedResponse(function() use ($assets, $zipFileName) {
            $zip = new ZipStream(outputName:  $zipFileName);

            foreach ($assets as $asset) {
                if (file_exists($asset->getFilePath())) {
                    $zip->addFileFromPath(basename($asset->getFilePath()), $asset->getFilePath());
                }
            }
            $zip->finish();
        });

        return $response;
    }
}
