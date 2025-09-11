<?php

namespace App\Controller\Api\V2;

use App\Repository\Assets\BrandsRepository;
use App\Repository\Assets\CategoriesRepository;
use App\Repository\Assets\CollectionsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/v2/taxonomy')]
class TaxonomyController extends AbstractController
{
    #[Route('/brands', name: 'api_v2_taxonomy_brands', methods: ['GET'])]
    public function getBrands(BrandsRepository $brandsRepository): JsonResponse
    {
        $brands = $brandsRepository->findAll();

        return $this->json($brands, 200, [], ['groups' => 'api_v2_taxonomy']);
    }

    #[Route('/categories', name: 'api_v2_taxonomy_categories', methods: ['GET'])]
    public function getCategories(CategoriesRepository $categoriesRepository): JsonResponse
    {
        $categories = $categoriesRepository->findAll();

        return $this->json($categories, 200, [], ['groups' => 'api_v2_taxonomy']);
    }

    #[Route('/collections', name: 'api_v2_taxonomy_collections', methods: ['GET'])]
    public function getCollections(CollectionsRepository $collectionsRepository): JsonResponse
    {
        $collections = $collectionsRepository->findBy([], ['year' => 'DESC', 'name' => 'ASC']);

        return $this->json($collections, 200, [], ['groups' => 'api_v2_taxonomy']);
    }
}
