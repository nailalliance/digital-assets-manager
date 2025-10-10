<?php

namespace App\Controller\Api\Admin;

use App\Repository\Assets\CategoriesRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[IsGranted("ROLE_ADMIN")]
class Categories extends AbstractController
{
    #[Route('/api/admin/categories', name: 'api_admin_categories_index', methods: ['GET'])]
    public function getCategories(CategoriesRepository $categoriesRepository): JsonResponse
    {
        $categoresEntities = $categoriesRepository->findBy([], ['name' => 'ASC']);

        $categories = [];

        foreach ($categoresEntities as $categoresEntity) {
            $categories[] = [
                'id' => $categoresEntity->getId(),
                'name' => $categoresEntity->getName(),
                'status' => $categoresEntity->getStatus(),
            ];
        }

        return $this->json($categories);
    }
}
