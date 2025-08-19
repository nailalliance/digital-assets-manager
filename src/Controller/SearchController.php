<?php

namespace App\Controller;

use App\Entity\Assets\AssetStatusEnum;
use App\Repository\Assets\AssetsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class SearchController extends AbstractController
{
    #[Route('/search', name: 'app_search')]
    public function index(AssetsRepository $assetsRepository): Response
    {

        $assets = $assetsRepository->findBy(['status' => AssetStatusEnum::ACTIVE]);

        return $this->render('search/index.html.twig', [
            'assets' => $assets,
        ]);
    }
}
