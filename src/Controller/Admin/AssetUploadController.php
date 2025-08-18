<?php

namespace App\Controller\Admin;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class AssetUploadController extends AbstractController
{
    #[Route('/admin/assets/upload', name: 'app_asset_upload')]
    public function index(): Response
    {
        return $this->render('admin/asset_upload/index.html.twig', [
            'controller_name' => 'AssetUploadController',
        ]);
    }
}
