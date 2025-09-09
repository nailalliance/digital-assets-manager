<?php

namespace App\Controller\Admin;

use App\Entity\Assets\AssetStatusEnum;
use App\Repository\Assets\AssetsRepository;
use App\Repository\Assets\BrandsRepository;
use App\Repository\Assets\CategoriesRepository;
use App\Repository\Assets\CollectionsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/admin/assets')]
class AssetsAdminController extends AbstractController
{
    #[Route('/', name: 'admin_assets_index')]
    public function index(
        Request $request,
        AssetsRepository $assetsRepository,
        BrandsRepository $brandsRepository,
        CategoriesRepository $categoriesRepository,
        CollectionsRepository $collectionsRepository
    ): Response
    {
        $offset = max(0, $request->query->getInt('offset', 0));
        $searchQuery = $request->query->get('q');
        $brandId = $request->query->getInt('brand');
        $categoryId = $request->query->getInt('category');
        $collectionId = $request->query->getInt('collection');
        $status = $request->query->get('status');

        if ($brandId === 0) {
            $brandId = null;
        }
        if ($categoryId === 0) {
            $categoryId = null;
        }
        if ($collectionId === 0) {
            $collectionId = null;
        }

        if ($status === '') {
            $status = null;
        }

        if (!empty($status))
        {
            $status = AssetStatusEnum::from($status);
        }

        $paginator = $assetsRepository->findForAdminList(
            $offset,
            $searchQuery,
            $brandId,
            $categoryId,
            $collectionId,
            $status
        );

        $totalAssets = count($paginator);

        $collections = $collectionsRepository->findBy([], [
            'year' => 'DESC',
            'name' => 'ASC',
        ])

        return $this->render('admin/assets/index.html.twig', [
            'offset' => $offset,
            'assets' => iterator_to_array($paginator),
            'previous' => $offset - AssetsRepository::ADMIN_PAGINATOR_PER_PAGE,
            'next' => min($totalAssets, $offset + AssetsRepository::ADMIN_PAGINATOR_PER_PAGE),
            'total' => $totalAssets,
            'brands' => $brandsRepository->findBy([], ['name' => 'ASC']),
            'categories' => $categoriesRepository->findBy([], ['name' => 'ASC']),
            'collections' => $collections,
            'statuses' => AssetStatusEnum::cases(),
            'currentFilters' => $request->query->all(),
        ]);
    }
}
