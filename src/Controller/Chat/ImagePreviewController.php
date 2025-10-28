<?php

namespace App\Controller\Chat;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/ai-image')]
class ImagePreviewController extends AbstractController
{
    #[Route('/{filename}', name: 'asset_ai_image')]
    public function thumbnail(string $filename): BinaryFileResponse
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

        $firstLetter = strtolower(substr($filename, 0, 1));
        $secondLetter = strtolower(substr($filename, 1, 1));
        $aiDir = $this->getParameter('ai_dir');

        $fullPath = sprintf(
            '%s/%s/%s/%s',
            $aiDir,
            $firstLetter,
            $secondLetter,
            $filename
        );

        // 2. Check if the reconstructed file path exists
        if (!file_exists($fullPath)) {
            throw $this->createNotFoundException('Image not found.');
        }

        // 3. Serve the file
        $response = new BinaryFileResponse($fullPath);
        $response->setContentDisposition(ResponseHeaderBag::DISPOSITION_INLINE);

        return $response;
    }
}
