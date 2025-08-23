<?php

namespace App\Controller;

use App\Repository\Assets\AssetsRepository;
use App\Repository\Assets\BrandsRepository;
use App\Repository\Assets\CategoriesRepository;
use App\Repository\Assets\CollectionsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
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

        // --- End of New Logic ---

        return $this->render('home/index.html.twig', [
            'recentAssets' => $assetsRepository->findBy(['status' => 'active'], ['createdAt' => 'DESC'], 12),
            'categories' => $categoriesRepository->findWithActiveAssets(),
            'collections' => $collectionsRepository->findWithActiveAssets(),
            'parentBrands' => $parentsWithChildren,
            'childBrands' => $brandFilters['children'],
        ]);
    }
}
