<?php

namespace App\Controller;

use App\Entity\Assets\Brands;
use App\Entity\User;
use App\Repository\Assets\AssetsRepository;
use App\Repository\Assets\BrandsRepository;
use App\Repository\Assets\CategoriesRepository;
use App\Repository\Assets\CollectionsRepository;
use App\Security\Voter\BrandVoter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class HomeController extends AbstractController
{
    #[Route('/brand/{id?}', name: 'app_home_brand')]
    #[Route('/home/{id?}', name: 'app_home')]
    #[Route('/', name: 'home')]
    public function index(
        ?Brands $brand, // The selected parent brand (optional)
        AssetsRepository $assetsRepository,
        BrandsRepository $brandsRepository,
        CategoriesRepository $categoriesRepository,
        CollectionsRepository $collectionsRepository,
        Security $security,
    ): Response {
        // Always fetch the top-level brands for the navigation buttons
        $parentBrands = $brandsRepository->findBy(['brands' => null]);

        /** @var User $user */
        $user = $this->getUser();

        if ($user && !$security->isGranted('ROLE_FTP_DESIGNER'))
        {
            $allowedBrandIds = $user->getRestrictedBrands()->map(fn ($brand) => $brand->getId())->toArray();

            if (!empty($allowedBrandIds)) {
                $parentBrands = array_values(array_filter($parentBrands, function ($brand) use ($allowedBrandIds) {
                    if (!in_array($brand->getId(), $allowedBrandIds))
                    {
                        return null;
                    }
                    return $brand;
                }));
            } else {
                $parentBrands = [];
            }
        }

        $recentAssets = [];
        $categories = [];
        $collections = [];
        $childBrands = [];

        // If a brand has been selected, fetch its related content
        if ($brand) {
            $this->denyAccessUnlessGranted(BrandVoter::VIEW, $brand);
            // Create an array of the parent brand and all its children
            $brandFamilyIds = [$brand->getId()];
            foreach ($brand->getParent() as $child) {
                $brandFamilyIds[] = $child->getId();
            }

            $recentAssets = $assetsRepository->findRecentByBrandFamily($brandFamilyIds, 12);
            $categories = $categoriesRepository->findActiveByBrandFamily($brandFamilyIds);
            $collections = $collectionsRepository->findActiveByBrandFamily($brandFamilyIds);
            $childBrands = $brand->getParent(); // Get the children of the selected brand
        }

        return $this->render('home/index.html.twig', [
            'parentBrands' => $parentBrands,
            'selectedBrand' => $brand,
            'childBrands' => $childBrands,
            'recentAssets' => $recentAssets,
            'categories' => $categories,
            'collections' => $collections,
        ]);
    }

    /**
     * This action is called via AJAX to fetch all content related to a parent brand.
     */
    #[Route('/home/brand-content/{id}', name: 'home_brand_content')]
    public function getBrandContent(
        Brands $brand,
        BrandsRepository $brandsRepository,
        AssetsRepository $assetsRepository,
        CategoriesRepository $categoriesRepository,
        CollectionsRepository $collectionsRepository
    ): JsonResponse {
        // Fetch all child brand IDs, including the parent's ID
        /** @var Brands[] $children */
        $children = $brandsRepository->findBy(['brands' => $brand->getId()]);

        // $brandIds = $children->map(fn($child) => $child->getId())->toArray();
        $brandIds = array_map(fn($child) => $child->getId(), $children);
        $brandIds[] = $brand->getId();

        // Fetch the data filtered by the brand family
        $recentAssets = $assetsRepository->findRecentByBrandFamily($brandIds, 12);
        $collections = $collectionsRepository->findActiveByBrandFamily($brandIds);
        $categories = $categoriesRepository->findActiveByBrandFamily($brandIds);

        // Render the partial templates and return them as JSON
        return $this->json([
            'brands' => $this->renderView('home/_brands_grid.html.twig', ['brands' => $children]),
            'recentAssets' => $this->renderView('home/_recent_assets.html.twig', ['recentAssets' => $recentAssets]),
            'collections' => $this->renderView('home/_collections_grid.html.twig', ['collections' => $collections]),
            'categories' => $this->renderView('home/_categories_grid.html.twig', ['categories' => $categories]),
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
