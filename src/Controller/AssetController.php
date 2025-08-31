<?php

namespace App\Controller;

use App\Entity\Assets\Assets;
use App\Form\WebDownloadType;
use App\Service\ImageProcessorService;
use DateTimeImmutable;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\HeaderUtils;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Symfony\Component\Routing\Attribute\Route;

final class AssetController extends AbstractController
{
    #[Route('/assets/{id}', name: 'app_asset')]
    public function index(Assets $assets): Response
    {
        $webDownloadForm = $this->createForm(WebDownloadType::class, null, [
            'action' => $this->generateUrl('asset_download_web', ['id' => $assets->getId()]),
        ]);

        return $this->render('asset/index.html.twig', [
            'asset' => $assets,
            'webDownloadForm' => $webDownloadForm->createView(),
        ]);
    }

    /**
     * Handles the "Download for Web" form submission and streams the processed image.
     */
    #[Route('/asset/{id}/download-web', name: 'asset_download_web', methods: ['GET'])]
    public function downloadWeb(Assets $asset, Request $request, ImageProcessorService $imageProcessor): Response
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

        $size = $request->query->getInt('size', 1500);
        $addPadding = $request->query->get('padding') === 'yes';
        $format = $request->query->get('format', 'webp');

        dd($request->query->all(), $size, $addPadding, $format);

        $padding = 0;
        if ($addPadding) {
            $padding = ($size === 1500) ? 38 : 50;
        }

        if (!in_array($asset->getMimeType(), ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf'])) {
            $this->addFlash('warning', 'This asset is not a downloadable image.');
            return $this->redirectToRoute('app_asset', ['id' => $asset->getId()]);
        }

        try {
            $imageData = $imageProcessor->exportFile(
                $asset->getFilePath(),
                $size,
                $size,
                $padding,
                $format
            );

            $itemCodes = $asset->getItemCodes()->map(fn($item) => $item->getCode())->toArray();
            $filenameBase = !empty($itemCodes) ? implode('-', $itemCodes) . '-' . $asset->getName() : $asset->getName();
            $safeFilename = preg_replace('/[^a-zA-Z0-9\-\_]/', '', $filenameBase);

            $response = new Response($imageData);
            $disposition = $response->headers->makeDisposition(
                ResponseHeaderBag::DISPOSITION_ATTACHMENT,
                $safeFilename . '.' . $format
            );
            $response->headers->set('Content-Disposition', $disposition);
            $response->headers->set('Content-Type', 'image/' . $format);

            return $response;

        } catch (\Exception $e) {
            $this->addFlash('error', 'There was an error processing the image: ' . $e->getMessage());
            return $this->redirectToRoute('app_asset', ['id' => $asset->getId()]);
        }
    }
}
