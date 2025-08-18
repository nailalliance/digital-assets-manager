<?php

namespace App\Controller\Download;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class ListController extends AbstractController
{
    #[Route('/download/list', name: 'app_download_list')]
    public function index(): Response
    {
        return $this->render('download/list/index.html.twig', [
            'controller_name' => 'BagController',
        ]);
    }
}
