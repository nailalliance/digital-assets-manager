<?php

namespace App\Controller;

use App\Entity\Assets\Assets;
use App\Entity\Downloads\Logs as DownloadLogs;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\Routing\Attribute\Route;

class DownloadController extends AbstractController
{
    #[Route('/asset/{id}/download', name: 'asset_download')]
    public function index(
        Assets $asset,
        Request $request,
        EntityManagerInterface $entityManager
    ): BinaryFileResponse
    {
        $filePath = $asset->getFilePath();

        if (!file_exists($filePath)) {
            throw $this->createNotFoundException('File not found');
        }

        $user = $entityManager->getRepository(User::class)->find($this->getUser()->getId());

        $log = new DownloadLogs();
        $log->setAsset($asset)
            ->setUser($user)
            ->setIpAddress($request->getClientIp())
        ;

        $entityManager->persist($log);
        $entityManager->flush();

        $response = new BinaryFileResponse($filePath);

        $filename = basename($filePath);

        $response->setContentDisposition(
            ResponseHeaderBag::DISPOSITION_ATTACHMENT,
            $filename
        );

        return $response;
    }
}
