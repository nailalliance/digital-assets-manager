<?php

namespace App\Controller\Api\Admin;

use App\Repository\Assets\BrandsRepository;
use App\Repository\Assets\CategoriesRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[IsGranted("ROLE_ADMIN")]
class Brands extends AbstractController
{
    #[Route('/api/admin/brands', name: 'api_admin_brands_index', methods: ['GET'])]
    public function getBrands(BrandsRepository $brandsRepository): JsonResponse
    {
        $brandsEntities = $brandsRepository->findBy([], ['name' => 'ASC']);

        $brands = [];

        foreach ($brandsEntities as $categoresEntity) {
            $brands[] = [
                'id' => $categoresEntity->getId(),
                'name' => $categoresEntity->getName(),
                'status' => $categoresEntity->getStatus(),
            ];
        }

        return $this->json($brands);
    }

    #[Route('/api/admin/brands/parents', name: 'api_admin_brands_parents_index', methods: ['GET'])]
    public function getParentBrands(BrandsRepository $brandsRepository): JsonResponse
    {
        $brandsEntities = $brandsRepository->findBy([
            'brands' => null,
        ], ['name' => 'ASC']);

        $brands = [];

        foreach ($brandsEntities as $categoresEntity) {
            $brands[] = [
                'id' => $categoresEntity->getId(),
                'name' => $categoresEntity->getName(),
                'status' => $categoresEntity->getStatus(),
            ];
        }

        return $this->json($brands);
    }
}
