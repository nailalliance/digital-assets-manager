<?php

namespace App\Controller;

use App\Entity\Assets\Brands;
use App\Repository\Assets\AssetsRepository;
use App\Repository\Assets\BrandsRepository;
use App\Repository\Assets\CategoriesRepository;
use App\Repository\Assets\CollectionsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class HomeController extends AbstractController
{
    #[Route('/home', name: 'app_home')]
    #[Route('/', name: 'home')]
    public function index(
        AssetsRepository $assetsRepository,
        BrandsRepository $brandsRepository,
        CategoriesRepository $categoriesRepository,
        CollectionsRepository $collectionsRepository
    ): Response
    {
        // --- Start of New Logic ---

        // Fetch all brands that have at least one active asset
        $activeBrands = $brandsRepository->findWithActiveAssets();

        // Structure brands into a parent/child hierarchy
        $brandFilters = ['parents' => [], 'children' => []];
        foreach ($activeBrands as $brand) {
            if ($brand->getBrands() === null) { // This is a potential parent brand
                $brandFilters['parents'][$brand->getId()] = $brand;
            } else { // This is a child brand
                $parent = $brand->getBrands();
                $brandFilters['parents'][$parent->getId()] = $parent; // Ensure parent is in the list
                $brandFilters['children'][$parent->getId()][] = $brand;
            }
        }

        // Filter out parent brands that have no children
        $parentsWithChildren = array_filter(
            $brandFilters['parents'],
            fn($brand) => isset($brandFilters['children'][$brand->getId()])
        );

        return $this->render('home/index.html.twig', [
            'recentAssets' => $assetsRepository->findBy(['status' => 'active'], ['createdAt' => 'DESC'], 12),
            'categories' => $categoriesRepository->findWithActiveAssets(),
            'collections' => $collectionsRepository->findWithActiveAssets(),
            'parentBrands' => $parentsWithChildren,
            'childBrands' => $brandFilters['children'],
        ]);
    }

    #[Route('/filters/categories-for-brand/{id}', name: 'app_filters_get_categories_for_brand')]
    public function getCategoriesForBrand(
        Brands $brand,
        CategoriesRepository $categoriesRepository
    ): JsonResponse {
        $categories = $categoriesRepository->findActiveByParentBrand($brand);

        return new JsonResponse([
            'content' => $this->renderView('home/_category_list.html.twig', ['categories' => $categories])
        ]);
    }

    #[Route('/filters/collections-for-brand/{id}', name: 'app_filters_get_collections_for_brand')]
    public function getCollectionsForBrand(
        Brands $brand,
        CollectionsRepository $collectionsRepository
    ): JsonResponse {
        $collections = $collectionsRepository->findActiveByParentBrand($brand);

        return new JsonResponse([
            'content' => $this->renderView('home/_collection_list.html.twig', ['collections' => $collections])
        ]);
    }
}
