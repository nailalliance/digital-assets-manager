<?php

namespace App\Controller;

use App\Entity\ApiToken;
use App\Entity\Assets\Assets;
use App\Repository\ApiTokenRepository;
use App\Repository\UserRepository;
use App\Service\UserRoleChecker;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\Routing\Attribute\Route;

class ThumbnailController extends AbstractController
{
    #[Route('/thumbnail/{filename}', name: 'asset_thumbnail')]
    public function thumbnail(string $filename): BinaryFileResponse
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

        $firstLetter = strtolower(substr($filename, 0, 1));
        $secondLetter = strtolower(substr($filename, 1, 1));
        $thumbnailDir = $this->getParameter('thumbnail_dir');

        $fullPath = sprintf(
            '%s/%s/%s/%s',
            $thumbnailDir,
            $firstLetter,
            $secondLetter,
            $filename
        );

        // 2. Check if the reconstructed file path exists
        if (!file_exists($fullPath)) {
            throw $this->createNotFoundException('Thumbnail not found.');
        }

        // 3. Serve the file
        $response = new BinaryFileResponse($fullPath);
        $response->setContentDisposition(ResponseHeaderBag::DISPOSITION_INLINE);

        return $response;
    }

    #[Route('/thumbnail/{imageToken}/file/{filename}', name: 'asset_thumbnail_adobe')]
    public function thumbnailForUser(
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
        $thumbnailDir = $this->getParameter('thumbnail_dir');

        $fullPath = sprintf(
            '%s/%s/%s/%s',
            $thumbnailDir,
            $firstLetter,
            $secondLetter,
            $filename
        );

        // 2. Check if the reconstructed file path exists
        if (!file_exists($fullPath)) {
            throw $this->createNotFoundException('Thumbnail not found.');
        }

        // 3. Serve the file
        $response = new BinaryFileResponse($fullPath);
        $response->setContentDisposition(ResponseHeaderBag::DISPOSITION_INLINE);

        return $response;
    }

    #[Route('/thumbnailId/{id}', name: 'asset_thumbnail_by_id', requirements: ['id' => '\d+'])]
    public function thumbnailById(Assets $assets): BinaryFileResponse
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

        $fullPath = $assets->getThumbnailPath();

        // 2. Check if the reconstructed file path exists
        if (!file_exists($fullPath)) {
            throw $this->createNotFoundException('Thumbnail not found.');
        }

        // 3. Serve the file
        $response = new BinaryFileResponse($fullPath);
        $response->setContentDisposition(ResponseHeaderBag::DISPOSITION_INLINE);

        return $response;
    }
}
