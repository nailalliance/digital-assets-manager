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
        $limit = $request->query->get('limit', 50);

        if (!in_array($limit, [20, 50, 100])) {
            $limit = 50;
        }

        $offset = ($page - 1) * $limit;

        $assetIdsFromSearch = null;
        $totalAssets = 0;

        // If there's a search query, get the initial set of IDs from Meilisearch
        if (!empty($query)) {
            $searchResult = $searchService->search($query, 1000, 0); // Get a larger set of IDs
            $assetIdsFromSearch = array_map(fn($hit) => $hit->getId(), $searchResult['hits']);
            $totalAssets = $searchResult['total'] ?? 0;

            // If the search returns no results, we can stop here.
            if (empty($assetIdsFromSearch)) {
                $assets = [];
            }
        }

        // Fetch the final, filtered, and paginated assets from the database
        // If there was a search, this will apply further filters to the search results.
        // If there was no search, this will just filter all assets.
        if (!isset($assets)) {
            $paginator = $assetsRepository->findByFilters(
                $selectedCategoryId,
                $selectedCollectionId,
                $selectedBrandIds,
                $limit,
                $offset,
                $assetIdsFromSearch
            );
            $assets = iterator_to_array($paginator);
            if (empty($query)) { // Only count from paginator if not a keyword search
                $totalAssets = count($paginator);
            }
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
