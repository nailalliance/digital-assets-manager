<?php

namespace App\Controller;

use DateTimeImmutable;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class AssetController extends AbstractController
{
    #[Route('/assets/{id}', name: 'app_asset')]
    public function index(): Response
    {

        return $this->render('asset/index.html.twig', [
            'asset' => [
                "name" => "",
                "itemCode" => "",
                "description" => "",
                "brand" => [
                    "name" => "",
                ],
                "mimeType" => "",
                "fileSize" => 1024,
                "embargoDate" => new DateTimeImmutable(),
                "expirationDate" => new DateTimeImmutable(),
                "categories" => [],
                "tags" => [],
            ],
        ]);
    }
}
