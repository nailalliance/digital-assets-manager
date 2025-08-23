<?php

namespace App\Controller;

use App\Repository\Assets\AssetsRepository;
use App\Repository\Assets\BrandsRepository;
use App\Repository\Assets\CategoriesRepository;
use App\Repository\Assets\CollectionsRepository;
use App\Service\SearchService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SearchController extends AbstractController
{
    #[Route('/search', name: 'app_search')]
    public function index(
        Request $request,
        SearchService $searchService,
        AssetsRepository $assetsRepository,
        BrandsRepository $brandsRepository,
        CategoriesRepository $categoriesRepository,
        CollectionsRepository $collectionsRepository
    ): Response {
        $query = $request->query->get('q', '');
        $selectedBrandIds = $request->query->all('brand_ids');
        $selectedCategoryId = $request->query->get('category_id');
        $selectedCollectionId = $request->query->get('collection_id');

        $assets = [];

        // Prioritize keyword search over filters
        if (!empty($query)) {
            $assets = $searchService->search($query);
        } else {
            // If no keyword search, use filters
            $assets = $assetsRepository->findByFilters(
                $selectedCategoryId,
                $selectedCollectionId,
                $selectedBrandIds
            );
        }

        // $assets = $searchService->search($query);

        $activeBrands = [];
        $activeCategories = [];
        $activeCollections = [];

        foreach ($assets as $asset) {
            foreach ($asset->getBrand() as $brand) {
                $activeBrands[$brand->getId()] = $brand;
            }
            foreach ($asset->getCategories() as $category) {
                $activeCategories[$category->getId()] = $category;
            }
            foreach ($asset->getCollections() as $collection) {
                $activeCollections[$collection->getId()] = $collection;
            }
        }

        // Structure brands into a parent/child hierarchy
        $brandFilters = ['parents' => [], 'children' => []];
        foreach ($activeBrands as $brand) {
            if ($brand->getBrands() === null) { // This is a parent brand
                $brandFilters['parents'][$brand->getId()] = $brand;
            } else { // This is a child brand
                $parent = $brand->getBrands();
                // Ensure the parent is in the list, even if no assets are directly tagged with it
                $brandFilters['parents'][$parent->getId()] = $parent;
                $brandFilters['children'][$parent->getId()][] = $brand;
            }
        }

        return $this->render('search/index.html.twig', [
            'assets' => $assets,
            'query' => $query,
            'brandFilters' => $brandFilters,
            'activeCategories' => $activeCategories,
            'activeCollections' => $activeCollections,
            'selectedBrandIds' => $selectedBrandIds,
            'selectedCategoryId' => $selectedCategoryId,
            'selectedCollectionId' => $selectedCollectionId,
        ]);
    }
}
