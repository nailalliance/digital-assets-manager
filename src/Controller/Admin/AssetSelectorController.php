<?php

namespace App\Controller\Admin;

use App\Repository\Assets\AssetsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AssetSelectorController extends AbstractController
{
    #[Route('/admin/asset-selector/search', name: 'admin_asset_selector_search')]
    public function search(Request $request, AssetsRepository $assetsRepository): Response
    {
        $query = $request->query->get('q', '');
        $brandId = $request->query->get('brand_id');

        if (empty($brandId)) {
            throw $this->createNotFoundException();
        }

        $page = $request->query->getInt('page', 1);
        $limit = 20;
        $offset = ($page - 1) * $limit;

        // You would create this custom method in your repository
        $paginator = $assetsRepository->findForSelector((int)$brandId, $query, $limit, $offset);
        $totalAssets = count($paginator);

        return $this->render('admin/social_media_posts/_asset_selector_results.html.twig', [
            'assets' => $paginator,
            'paginator' => [
                'currentPage' => $page,
                'totalPages' => ceil($totalAssets / $limit),
            ]
        ]);
    }
}
