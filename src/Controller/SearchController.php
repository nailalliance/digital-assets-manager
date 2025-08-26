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

        $page = $request->query->get('page', 1);
        $limit = $request->query->get('limit', 20);

        if (!in_array($limit, [20, 50, 100])) {
            $limit = 20;
        }

        $offset = ($page - 1) * $limit;

        $assets = [];
        $totalAssets = 0;

        // Prioritize keyword search over filters
        if (!empty($query)) {
            $searchResult = $searchService->search($query, $limit, $offset);
            $assets = $searchResult['hits'];
            $totalAssets = $searchResult['total'];
        } else {
            // If no keyword search, use filters
            $searchResult = $assetsRepository->findByFilters(
                $selectedCategoryId,
                $selectedCollectionId,
                $selectedBrandIds,
                $limit,
                $offset
            );
            $assets = $searchResult['hits'];
            $totalAssets = $searchResult['total'];
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
            'paginator' => [
                'currentPage' => $page,
                'limit' => $limit,
                'totalPages' => ceil($totalAssets / $limit),
                'totalItems' => $totalAssets,
            ]
        ]);
    }
}
