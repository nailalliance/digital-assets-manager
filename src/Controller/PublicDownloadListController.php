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
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
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

        if (!empty($temporaryFiles)) {
            $filename = "";
            foreach ($temporaryFiles as $fileData) {
                $filename = $fileData['originalName'];
                // TODO: For now, this will only download one file, so I will break here.
                // In future, this needs to change.
                break;
            }

            $response = new StreamedResponse(function () use (&$filename, $temporaryFiles) {
                foreach ($temporaryFiles as $fileData) {
                    if (file_exists($fileData['path'])) {
                        $file = $fileData['path'];
                        $filename = $fileData['originalName'];
                        $stream = fopen($file, 'rb');

                        while (!feof($stream)) {
                            print(fread($stream, 8 * 1024));
                            flush();
                        }
                        fclose($stream);
                    }
                    // TODO: For now, this will only download one file, so I will break here.
                    // In future, this needs to change.
                    break;
                }
            });

            $response->headers->set('Content-Type', 'application/octet-stream');
            $response->headers->set('Content-Disposition', 'attachment; filename="'.$filename.'"');

            return $response;
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
            // // Handle files from a temporary Direct Share
            // elseif (!empty($temporaryFiles)) {
            //     foreach ($temporaryFiles as $fileData) {
            //         if (file_exists($fileData['path'])) {
            //             // $zip->addFileFromPath($fileData['originalName'], $fileData['path']);
            //             $file = $fileData['path'];
            //             $stream = fopen($file, 'rb');
            //
            //             while (!feof($stream)) {
            //                 $zip->addFileFromStream(
            //                     fileName: $fileData['originalName'],
            //                     stream: $stream,
            //                 );
            //             }
            //             fclose($stream);
            //         }
            //     }
            // }

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

    #[Route('/share/{token}/image/{assetId}/{width}x{height}/{padding}/{filename}.{extension}', name: 'public_image_padded', requirements: ['assetId' => '\d+', 'width' => '\d+', 'height' => '\d+', 'padding' => '\d+', 'extension' => 'jpg|png|webp'])]
    #[Route('/share/{token}/image/{assetId}/{width}x{height}/{filename}.{extension}', name: 'public_image', requirements: ['assetId' => '\d+', 'width' => '\d+', 'height' => '\d+', 'extension' => 'jpg|png|webp'], defaults: ['padding' => 0])]
    public function publicImage(
        #[MapEntity(mapping: ['token' => 'token'])]
        OneTimeLinks $oneTimeLink,
        #[MapEntity(id: 'assetId')]
        Assets $asset,
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

        // CRITICAL SECURITY CHECK: Ensure the asset from the URL is actually in this share list
        $downloadList = $oneTimeLink->getDownloadList();
        $temporaryFiles = $oneTimeLink->getTemporaryFiles();
        $isAuthorized = false;

        if ($downloadList && $downloadList->getAssets()->contains($asset)) {
            $isAuthorized = true;
        } elseif (!empty($temporaryFiles)) {
            // This check is more complex for temporary files as they aren't entities.
            // A more robust implementation might store asset IDs even for temp files.
            // For now, we'll assume the asset ID lookup is for permanent assets.
        }

        if (!$isAuthorized) {
            throw $this->createAccessDeniedException('This asset is not part of this share link.');
        }

        $sourcePath = $asset->getFilePath();

        if (!$sourcePath || !file_exists($sourcePath)) {
            throw $this->createNotFoundException('Source file not found.');
        }

        $imageBinary = $imageProcessor->exportFile($sourcePath, $width, $height, $padding, $extension);

        if (!$imageBinary) {
            throw $this->createNotFoundException('Could not process image.');
        }

        $response = new Response($imageBinary);
        $disposition = $response->headers->makeDisposition(
            ResponseHeaderBag::DISPOSITION_INLINE,
            $filename . '.' . $extension
        );
        $response->headers->set('Content-Disposition', $disposition);
        $response->headers->set('Content-Type', 'image/' . $extension);

        return $response;
    }
}
