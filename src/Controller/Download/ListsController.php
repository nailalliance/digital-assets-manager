<?php

namespace App\Controller\Download;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class ListsController extends AbstractController
{
    #[Route('/download/lists', name: 'app_download_lists')]
    public function index(): Response
    {
        return $this->render('download/lists/index.html.twig', [
            'controller_name' => 'BagsController',
        ]);
    }
}
