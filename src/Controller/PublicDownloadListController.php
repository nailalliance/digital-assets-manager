<?php

namespace App\Controller;

use App\Entity\Assets\Assets;
use App\Entity\Downloads\Logs;
use App\Entity\Downloads\OneTimeLinks;
use App\Service\ImageProcessorService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Doctrine\Attribute\MapEntity;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Symfony\Component\Routing\Annotation\Route;
use ZipStream\ZipStream;

class PublicDownloadListController extends AbstractController
{
    #[Route('/share/{token}', name: 'public_download_list')]
    public function index(
        #[MapEntity(mapping: ['token' => 'token'])]
        OneTimeLinks $oneTimeLink
    ): Response {
        if (!$this->isGranted('IS_AUTHENTICATED_FULLY'))
        {
            if ($oneTimeLink->getExpirationDate() < new \DateTimeImmutable('now', new \DateTimeZone('UTC'))) {
                throw $this->createNotFoundException('This link has expired.');
            }
        }

        if (!is_null($oneTimeLink->getDownloadList()) && !$oneTimeLink->getDownloadList()->getStatus())
        {
            throw $this->createNotFoundException('This link has expired.');
        }

        // Pass the entire OneTimeLinks object to the template
        return $this->render('public_download_list/index.html.twig', [
            'oneTimeLink' => $oneTimeLink,
        ]);
    }

    #[Route('/share/{token}/zip', name: 'public_download_list_zip')]
    public function zip(
        #[MapEntity(mapping: ['token' => 'token'])]
        OneTimeLinks $oneTimeLink,
        EntityManagerInterface $entityManager,
        RequestStack $requestStack
    ): StreamedResponse {
        if (!$this->isGranted('IS_AUTHENTICATED_FULLY'))
        {
            if ($oneTimeLink->getExpirationDate() < new \DateTimeImmutable('now', new \DateTimeZone('UTC'))) {
                throw $this->createNotFoundException('This link has expired.');
            }
        }

        $downloadList = $oneTimeLink->getDownloadList();
        $temporaryFiles = $oneTimeLink->getTemporaryFiles();
        $request = $requestStack->getCurrentRequest();

        // Determine the filename for the zip archive
        $zipFileName = 'shared_assets.zip';
        if ($downloadList && $downloadList->getName()) {
            $zipFileName = preg_replace('/[^a-zA-Z0-9\-\_]/', '', $downloadList->getName()) . '.zip';
        }

        $response = new StreamedResponse(function() use ($downloadList, $temporaryFiles, $zipFileName, $entityManager, $request, $oneTimeLink) {
            $zip = new ZipStream(outputName: $zipFileName);

            // Handle assets from a permanent DownloadList
            if ($downloadList) {
                foreach ($downloadList->getAssets() as $asset) {
                    if (file_exists($asset->getFilePath())) {
                        $log = new Logs();
                        $log->setAsset($asset);
                        $log->setIpAddress($request->getClientIp());
                        $log->setOneTimeLink($oneTimeLink);
                        $entityManager->persist($log);

                        $zip->addFileFromPath(basename($asset->getFilePath()), $asset->getFilePath());
                    }
                }
            }
            // Handle files from a temporary Direct Share
            elseif (!empty($temporaryFiles)) {
                foreach ($temporaryFiles as $fileData) {
                    if (file_exists($fileData['path'])) {
                        $zip->addFileFromPath($fileData['originalName'], $fileData['path']);
                    }
                }
            }

            $entityManager->flush();

            $zip->finish();
        });

        return $response;
    }

    /**
     * Securely serves a thumbnail for a public download list.
     */
    #[Route('/share/{token}/thumbnail/{asset_id}', name: 'public_asset_thumbnail')]
    public function publicThumbnail(
        #[MapEntity(mapping: ['token' => 'token'])]
        OneTimeLinks $oneTimeLink,
        #[MapEntity(id: 'asset_id')]
        Assets $asset
    ): BinaryFileResponse {
        // 1. Check if the main link has expired
        if ($oneTimeLink->getExpirationDate() < new \DateTimeImmutable('now', new \DateTimeZone('UTC'))) {
            throw $this->createNotFoundException('This link has expired.');
        }

        // 2. CRITICAL SECURITY CHECK: Ensure the requested asset is actually in this share list
        $downloadList = $oneTimeLink->getDownloadList();
        if (!$downloadList || !$downloadList->getAssets()->contains($asset)) {
            throw $this->createAccessDeniedException();
        }

        // 3. Check if the thumbnail file exists
        $thumbnailPath = $asset->getThumbnailPath();
        if (!$thumbnailPath || !file_exists($thumbnailPath)) {
            throw $this->createNotFoundException('Thumbnail not found.');
        }

        // 4. Securely serve the file
        return new BinaryFileResponse($thumbnailPath);
    }

    #[Route('/share/{token}/image/{width}x{height}/{padding}/{filename}.{extension}', name: 'public_image_padded', requirements: ['width' => '\d+', 'height' => '\d+', 'padding' => '\d+', 'extension' => 'jpg|png|webp'])]
    #[Route('/share/{token}/image/{width}x{height}/{filename}.{extension}', name: 'public_image', requirements: ['width' => '\d+', 'height' => '\d+', 'extension' => 'jpg|png|webp'], defaults: ['padding' => 0])]
    public function publicImage(
        #[MapEntity(mapping: ['token' => 'token'])]
        OneTimeLinks $oneTimeLink,
        ImageProcessorService $imageProcessor,
        int $width,
        int $height,
        int $padding,
        string $filename,
        string $extension
    ): Response {
        if (!$this->isGranted('IS_AUTHENTICATED_FULLY')) {
            if ($oneTimeLink->getExpirationDate() < new \DateTimeImmutable('now', new \DateTimeZone('UTC'))) {
                throw $this->createNotFoundException('This link has expired.');
            }
        }

        $sourcePath = null;
        $downloadList = $oneTimeLink->getDownloadList();
        $temporaryFiles = $oneTimeLink->getTemporaryFiles();

        if ($downloadList) {
            foreach ($downloadList->getAssets() as $asset) {
                if (pathinfo($asset->getFilePath(), PATHINFO_FILENAME) === $filename) {
                    $sourcePath = $asset->getFilePath();
                    break;
                }
            }
        } elseif (!empty($temporaryFiles)) {
            foreach ($temporaryFiles as $fileData) {
                if (pathinfo($fileData['originalName'], PATHINFO_FILENAME) === $filename) {
                    $sourcePath = $fileData['path'];
                    break;
                }
            }
        }

        if (!$sourcePath) {
            throw $this->createNotFoundException('Image not found in this share link.');
        }

        $imageBinary = $imageProcessor->exportFile($sourcePath, $width, $height, $padding, $extension);

        if (!$imageBinary) {
            throw $this->createNotFoundException('Could not process image.');
        }

        return new Response($imageBinary, 200, [
            'Content-Type' => 'image/' . $extension,
        ]);
    }
}
