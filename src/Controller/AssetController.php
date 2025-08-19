<?php

namespace App\Controller;

use App\Entity\Assets\Assets;
use DateTimeImmutable;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class AssetController extends AbstractController
{
    #[Route('/assets/{id}', name: 'app_asset')]
    public function index(Assets $assets): Response
    {

        return $this->render('asset/index.html.twig', [
            'asset' => $assets,
        ]);
    }
}
