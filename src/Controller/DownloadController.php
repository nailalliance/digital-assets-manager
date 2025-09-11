<?php

namespace App\Controller;

use App\Entity\Assets\Assets;
use App\Entity\Downloads\Logs as DownloadLogs;
use App\Entity\User;
use App\Repository\ApiTokenRepository;
use App\Security\Voter\AssetVoter;
use App\Service\UserRoleChecker;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class DownloadController extends AbstractController
{
    #[Route('/asset/{id}/download', name: 'asset_download')]
    #[IsGranted('ASSET_VIEW', subject: 'asset')]
    public function index(
        Assets                 $asset,
        Request                $request,
        EntityManagerInterface $entityManager
    ): BinaryFileResponse
    {
        $filePath = $asset->getFilePath();

        if (!file_exists($filePath)) {
            throw $this->createNotFoundException('File not found');
        }

        /** @var User $user */
        $user = $this->getUser();

        $log = new DownloadLogs();
        $log->setAsset($asset)
            ->setUser($user)
            ->setIpAddress($request->getClientIp());

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

    #[Route('/asset/{id}/stream', name: 'asset_stream')]
    #[IsGranted(AssetVoter::VIEW, subject: 'asset')]
    public function streamVideo(Assets $asset): BinaryFileResponse
    {
        $response = new BinaryFileResponse($asset->getFilePath());
        $response->setContentDisposition(
            ResponseHeaderBag::DISPOSITION_INLINE,
            $asset->getName()
        );

        return $response;
    }

    #[Route('/asset/{imageToken}/file/{filename}', name: 'asset_stream_adobe')]
    public function streamAssetForUser(
        ApiTokenRepository $tokenRepository,
        UserRoleChecker $userRoleChecker,
        string $imageToken,
        string $filename
    ): BinaryFileResponse
    {
        $apiToken = $tokenRepository->findOneBy(['imageToken' => $imageToken]);

        if (!$apiToken) {
            throw $this->createAccessDeniedException('Access Denied.');
        }

        $user = $apiToken->getOwner();

        if (!$userRoleChecker->hasRole($user, 'ROLE_FTP_DESIGNER'))
        {
            throw $this->createAccessDeniedException('Access Denied.');
        }

        $firstLetter = strtolower(substr($filename, 0, 1));
        $secondLetter = strtolower(substr($filename, 1, 1));
        $fileDir = $this->getParameter('upload_dir');

        $fullPath = sprintf(
            '%s/%s/%s/%s',
            $fileDir,
            $firstLetter,
            $secondLetter,
            $filename
        );

        // 2. Check if the reconstructed file path exists
        if (!file_exists($fullPath)) {
            throw $this->createNotFoundException('File not found.');
        }

        // 3. Serve the file
        $response = new BinaryFileResponse($fullPath);
        $response->setContentDisposition(ResponseHeaderBag::DISPOSITION_INLINE);

        return $response;
    }
}
