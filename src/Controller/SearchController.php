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
        $assets = [];

        if (!empty($query)) {
            $searchResult = $searchService->search($query, 1000, 0);
            // $assetIdsFromSearch = $searchResult['ids'];
            // $totalAssets = $searchResult['total'];

            $allPossibleAssets = $searchResult['hits'];

            $assets = array_filter(
                $allPossibleAssets,
                function (Assets $asset) use (
                    $selectedBrandIds,
                    $selectedCategoryIds,
                    $selectedCollectionIds,
                    $brandsRepository,
                )
                {
                    $universe = 0;
                    $votes = 0;
                    $assetBrandHierarchyList = [];
                    if (!empty($selectedBrandIds) > 0) {
                        $universe += 1;

                        // get hierarchy
                        $brands = $asset->getBrand();
                        foreach ($brands as $brand) {
                            $assetBrandHierarchyList[] = $brand->getId();
                            if ($brand->getBrands() != null) {
                                $parent = $brand->getBrands();
                                $assetBrandHierarchyList[] = $parent->getId();
                                if ($parent->getBrands() != null) {
                                    $grandparent = $parent->getBrands();
                                    $assetBrandHierarchyList[] = $grandparent->getId();
                                }
                            }
                        }
                    }

                    if (!empty($selectedCategoryIds) > 0) {
                        $universe += 1;
                    }
                    if (!empty($selectedCollectionIds) > 0) {
                        $universe += 1;
                    }

                    if (
                        array_intersect(
                            // $asset->getBrand()->map(fn($brand) => $brand->getId())->toArray()
                            $assetBrandHierarchyList,
                            $selectedBrandIds
                        )
                    )
                    {
                        $votes += 1;
                    }

                    if (array_intersect(
                        $asset->getCategories()->map(fn($category) => $category->getId())->toArray(),
                        $selectedCategoryIds
                    ))
                    {
                        $votes += 1;
                    }

                    if (array_intersect(
                        $asset->getCollections()->map(fn($collection) => $collection->getId())->toArray(),
                        $selectedCollectionIds
                    ))
                    {
                        $votes += 1;
                    }

                    return $universe === $votes;
                }
            );

            $totalAssets = count($assets);
            $assets = array_slice($assets, $offset, $limit, false);


        }

        if (empty($query)) {
            $paginator = $assetsRepository->findByFilters(
                $selectedCategoryIds,
                $selectedCollectionIds,
                $selectedBrandIds,
                $selectedFileTypeGroup,
                $limit,
                $offset,
                null
            );
            $assets = iterator_to_array($paginator);
            $totalAssets = count($paginator);

            if (!isset($allPossibleAssets)) {
                $allPossibleAssets = iterator_to_array($assetsRepository->findByFilters(
                    $selectedCategoryIds,
                    $selectedCollectionIds,
                    $selectedBrandIds,
                    $selectedFileTypeGroup,
                    1000, 0, null
                ));
            }
        }

        $activeBrands = [];
        $activeCategories = [];
        $activeCollections = [];

        foreach ($allPossibleAssets as $asset) {
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

        $selectedBrandBreadcrombs = [];

        foreach ($brandFilters['children'] as $children)
        {
            /** @var Brands $child */
            foreach ($children as $child) {
                if (!in_array($child->getId(), $selectedBrandIds)) {
                    continue;
                }

                $childName = "";
                if ($child->getBrands()?->getBrands()) {
                    $childName .= $child->getBrands()->getBrands()->getName() . " / ";
                }
                if ($child->getBrands()) {
                    $childName .= $child->getBrands()->getName() . " / ";
                }
                $childName .= $child->getName();
                $selectedBrandBreadcrombs[] = $childName;
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
            'selectedBrandBreadcrombs' => $selectedBrandBreadcrombs,
            'paginator' => [
                'currentPage' => $page,
                'limit' => $limit,
                'totalPages' => ceil($totalAssets / $limit),
                'totalItems' => $totalAssets,
            ]
        ]);
    }
}
