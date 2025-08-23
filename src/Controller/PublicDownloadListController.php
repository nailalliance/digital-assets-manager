<?php

namespace App\Controller;

use App\Entity\Downloads\OneTimeLinks;
use Symfony\Bridge\Doctrine\Attribute\MapEntity;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
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
        if ($oneTimeLink->getExpirationDate() < new \DateTimeImmutable('now', new \DateTimeZone('UTC'))) {
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
        OneTimeLinks $oneTimeLink
    ): StreamedResponse {
        if ($oneTimeLink->getExpirationDate() < new \DateTimeImmutable('now', new \DateTimeZone('UTC'))) {
            throw $this->createNotFoundException('This link has expired.');
        }

        $downloadList = $oneTimeLink->getDownloadList();
        $temporaryFiles = $oneTimeLink->getTemporaryFiles();

        // Determine the filename for the zip archive
        $zipFileName = 'shared_assets.zip';
        if ($downloadList && $downloadList->getName()) {
            $zipFileName = preg_replace('/[^a-zA-Z0-9\-\_]/', '', $downloadList->getName()) . '.zip';
        }

        $response = new StreamedResponse(function() use ($downloadList, $temporaryFiles, $zipFileName) {
            $zip = new ZipStream(outputName: $zipFileName);

            // Handle assets from a permanent DownloadList
            if ($downloadList) {
                foreach ($downloadList->getAssets() as $asset) {
                    if (file_exists($asset->getFilePath())) {
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

            $zip->finish();
        });

        return $response;
    }
}
