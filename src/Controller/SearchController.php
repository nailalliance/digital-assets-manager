<?php

namespace App\Controller;

use App\Entity\Assets\Assets;
use App\Entity\Assets\Brands;
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
        $selectedFileTypeGroup = $request->query->get('file_type_group');

        $selectedCategoryIds = $request->query->all('category_ids');
        if ($request->query->has('category_id')) {
            $selectedCategoryIds[] = $request->query->get('category_id');
        }
        $selectedCollectionIds = $request->query->all('collection_ids');
        if ($request->query->has('collection_id')) {
            $selectedCollectionIds[] = $request->query->get('collection_id');
        }

        $page = $request->query->getInt('page', 1);
        $limit = $request->query->getInt('limit', 50);
        if (!in_array($limit, [20, 50, 100])) {
            $limit = 50;
        }
        $offset = ($page - 1) * $limit;

        $assetIdsFromSearch = null;

        if (!empty($query)) {
            $searchResult = $searchService->search($query, 1000, 0);
            $assetIdsFromSearch = $searchResult['ids'];
            $totalAssets = $searchResult['total'];

            $allPossibleAssets = $searchResult['hits'];

            if (empty($assetIdsFromSearch)) {
                $assets = [];
                $totalAssets = 0;
            }
        }

        if (!isset($assets)) {
            $paginator = $assetsRepository->findByFilters(
                $selectedCategoryIds,
                $selectedCollectionIds,
                $selectedBrandIds,
                $selectedFileTypeGroup,
                $limit,
                $offset,
                $assetIdsFromSearch
            );
            $assets = iterator_to_array($paginator);
            $totalAssets = count($paginator);

            if (!isset($allPossibleAssets)) {
                $allPossibleAssets = $assetsRepository->findByFilters(
                    $selectedCategoryIds,
                    $selectedCollectionIds,
                    $selectedBrandIds,
                    $selectedFileTypeGroup,
                    1000, 0, null
                );
            }
        }

        $activeBrands = [];
        $activeCategories = [];
        $activeCollections = [];

        foreach (iterator_to_array($allPossibleAssets) as $asset) {
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

        $brandFilters = ['parents' => [], 'children' => []];
        /** @var Brands $brand */
        foreach ($activeBrands as $brand) {
            if ($brand->getBrands() === null) {
                $brandFilters['parents'][$brand->getId()] = $brand;
            } else {
                $parent = $brand->getBrands();
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
            'selectedCategoryIds' => $selectedCategoryIds,
            'selectedCollectionIds' => $selectedCollectionIds,
            'selectedFileTypeGroup' => $selectedFileTypeGroup,
            'paginator' => [
                'currentPage' => $page,
                'limit' => $limit,
                'totalPages' => ceil($totalAssets / $limit),
                'totalItems' => $totalAssets,
            ]
        ]);
    }
}
