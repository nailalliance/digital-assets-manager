<?php

namespace App\Controller;

use App\Entity\Assets\Assets;
use App\Form\WebDownloadType;
use App\Service\ImageProcessorService;
use DateTimeImmutable;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
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
    #[Route('/asset/{id}/download-web', name: 'asset_download_web', methods: ['POST'])]
    public function downloadWeb(Assets $asset, Request $request, ImageProcessorService $imageProcessor): Response
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

        $form = $this->createForm(WebDownloadType::class);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $data = $form->getData();
            $size = (int)$data['size'];
            $addPadding = $data['padding'] === 'yes';
            $format = $data['format'];

            $padding = 0;
            if ($addPadding) {
                $padding = ($size === 1500) ? 38 : 50;
            }

            if (!in_array($asset->getMimeType(), ['image/jpeg', 'image/png', 'image/webp', 'image/gif'])) {
                $this->addFlash('warning', 'This asset is not a downloadable image.');
                return $this->redirectToRoute('app_asset', ['id' => $asset->getId()]);
            }

            try {
                $imageData = $imageProcessor->exportFile(
                    $asset->getFilePath(),
                    $size,
                    $size,
                    $format,
                    $padding
                );

                $itemCodes = $asset->getItemCodes()->map(fn($item) => $item->getCode())->toArray();
                $filenameBase = !empty($itemCodes) ? implode('-', $itemCodes) . '-' . $asset->getName() : $asset->getName();
                $safeFilename = preg_replace('/[^a-zA-Z0-9\-\_]/', '', $filenameBase);
                $downloadFilename = sprintf('%s.%s', $safeFilename, $format);

                return new StreamedResponse(function() use ($imageData) {
                    echo $imageData;
                }, 200, [
                    'Content-Type' => 'image/' . ($format === 'jpg' ? 'jpeg' : $format),
                    'Content-Disposition' => ResponseHeaderBag::makeDisposition(
                        ResponseHeaderBag::DISPOSITION_ATTACHMENT,
                        $downloadFilename
                    ),
                ]);

            } catch (\Exception $e) {
                $this->addFlash('error', 'There was an error processing the image: ' . $e->getMessage());
                return $this->redirectToRoute('app_asset', ['id' => $asset->getId()]);
            }
        }

        $this->addFlash('error', 'Invalid download options.');
        return $this->redirectToRoute('app_asset', ['id' => $asset->getId()]);
    }
}
