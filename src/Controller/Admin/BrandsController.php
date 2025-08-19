<?php

namespace App\Controller\Admin;

use App\Entity\Assets\Brands;
use App\Form\BrandsType;
use App\Repository\Assets\BrandsRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/admin/brands')]
final class BrandsController extends AbstractController
{
    #[Route('/', name: 'admin_brands_index', methods: ['GET'])]
    public function index(Request $request, BrandsRepository $brandsRepository): Response
    {
        $sortBy = $request->query->get('sort', 'name');
        $direction = $request->query->get('direction', 'asc');
        $parentBrandId = $request->query->get('parent_brand');

        $queryBuilder = $brandsRepository->createQueryBuilder('b')
            ->leftJoin('b.brands', 'p')
            ->addSelect('p')
        ;

        if ($parentBrandId) {
            $queryBuilder->andWhere('b.brands = :parentBrandId')
                ->setParameter('parentBrandId', $parentBrandId);
        }

        if (in_array($sortBy, ['name', 'parentName']))
        {
            $sortField = $sortBy === 'parentName' ? 'p.name' : 'p.name, b.name';
            $queryBuilder->orderBy($sortField, $direction);
        }

        $brands = $queryBuilder->getQuery()->getResult();

        $parentBrands = $brandsRepository->findBy(['brands' => null]);

        return $this->render('admin/brands/index.html.twig', [
            'brands' => $brands,
            'all_brands' => $parentBrands,
            'current_sort' => $sortBy,
            'current_direction' => $direction,
            'current_parent_filter' => $parentBrandId,
        ]);
    }

    #[Route('/new', name: 'admin_brands_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $brand = new Brands();
        $form = $this->createForm(BrandsType::class, $brand);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($brand);
            $entityManager->flush();

            return $this->redirectToRoute('admin_brands_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('admin/brands/new.html.twig', [
            'brand' => $brand,
            'form' => $form->createView(),
        ]);
    }

    #[Route('/{id}/edit', name: 'admin_brands_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Brands $brand, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(BrandsType::class, $brand);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($brand);
            $entityManager->flush();
            return $this->redirectToRoute('admin_brands_index', [], Response::HTTP_SEE_OTHER);
        }
        return $this->render('admin/brands/edit.html.twig', [
            'brand' => $brand,
            'form' => $form->createView(),
        ]);
    }

    #[Route('/{id}', name: 'admin_brands_delete', methods: ['POST'])]
    public function delete(Request $request, Brands $brand, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$brand->getId(), $request->request->get('_token'))) {
            $entityManager->remove($brand);
            $entityManager->flush();
        }

        return $this->redirectToRoute('admin_brands_index', [], Response::HTTP_SEE_OTHER);
    }
}
