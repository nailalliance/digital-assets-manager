<?php

namespace App\Controller;

use App\Entity\Assets\Assets;
use App\Entity\Downloads\Lists;
use App\Entity\Downloads\Logs;
use App\Entity\Downloads\OneTimeLinks;
use App\Entity\User;
use App\Service\DownloadListService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
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

        return $this->json([
            'success' => true,
            'downloadCount' => $downloadListService->getCount()
        ]);

        // // Redirect back to the page the user came from
        // return $this->redirect($request->headers->get('referer', $this->generateUrl('home')));
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
        Request $request,
        DownloadListService $downloadListService,
        EntityManagerInterface $entityManager
    ): JsonResponse {
        // Ensure only designers can create share links
        $this->denyAccessUnlessGranted('ROLE_FTP_DESIGNER');

        $assets = $downloadListService->getAssets();

        if (empty($assets)) {
            return $this->json(['error' => 'Your download bag is empty.'], Response::HTTP_BAD_REQUEST);
        }

        // Get the list name
        $listName = $request->request->get('listName');

        // Create a new DownloadList entity
        $downloadList = new Lists();
        $user = $this->getUser();
        $downloadList->setCreator($user);

        if (!empty($listName)) {
            $downloadList->setName($listName);
        }

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
    public function zip(
        DownloadListService $downloadListService,
        EntityManagerInterface $entityManager,
        RequestStack $requestStack
    ): StreamedResponse {
        $assets = $downloadListService->getAssets();
        $zipFileName = 'download_bag_' . date('Y-m-d') . '.zip';
        $request = $requestStack->getCurrentRequest();
        $user = $this->getUser();

        $response = new StreamedResponse(function() use ($assets, $zipFileName, $entityManager, $request, $user) {
            $zip = new ZipStream(outputName: $zipFileName);

            foreach ($assets as $asset) {
                if (file_exists($asset->getFilePath())) {
                    // Log the download event for each asset
                    $log = new Logs();
                    $log->setAsset($asset);
                    $log->setUser($user);
                    $log->setIpAddress($request->getClientIp());
                    $entityManager->persist($log);

                    // Add the file to the zip stream
                    $zip->addFileFromPath(basename($asset->getFilePath()), $asset->getFilePath());
                }
            }

            // Save all the new log entries to the database
            $entityManager->flush();

            $zip->finish();
        });

        return $response;
    }

    #[Route('/add-multiple', name: 'download_list_add_multiple', methods: ['POST'])]
    public function addMultiple(Request $request, DownloadListService $downloadListService): Response
    {
        $assetIdsString = $request->request->get('asset_ids', '');
        $assetIds = array_filter(explode(',', $assetIdsString));

        if (empty($assetIds)) {
            $this->addFlash('warning', 'No assets were selected to add.');
            return $this->redirect($request->headers->get('referer', $this->generateUrl('home')));
        }

        foreach ($assetIds as $id) {
            $downloadListService->add((int) $id);
        }

        $this->addFlash('success', sprintf('%d assets have been added to your download bag.', count($assetIds)));

        return $this->redirect($request->headers->get('referer', $this->generateUrl('home')));
    }
}
