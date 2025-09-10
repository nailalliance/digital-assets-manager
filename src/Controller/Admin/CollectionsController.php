<?php

namespace App\Controller\Admin;

use App\Entity\Assets\Collections;
use App\Form\CollectionsType;
use App\Repository\Assets\CollectionsRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/admin/collections')]
class CollectionsController extends AbstractController
{
    #[Route('/', name: 'admin_collections_index', methods: ['GET'])]
    public function index(CollectionsRepository $collectionsRepository): Response
    {
        return $this->render('admin/collections/index.html.twig', [
            'collections' => $collectionsRepository->findBy([], ['year' => 'DESC', 'id' => 'ASC']),
        ]);
    }

    #[Route('/new', name: 'admin_collections_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $collection = new Collections();
        $form = $this->createForm(CollectionsType::class, $collection);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($collection);
            $entityManager->flush();

            return $this->redirectToRoute('admin_collections_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('admin/collections/new.html.twig', [
            'collection' => $collection,
            'form' => $form,
        ]);
    }

    #[Route('/{id}/edit', name: 'admin_collections_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Collections $collection, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(CollectionsType::class, $collection);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('admin_collections_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('admin/collections/edit.html.twig', [
            'collection' => $collection,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'admin_collections_delete', methods: ['POST'])]
    public function delete(Request $request, Collections $collection, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$collection->getId(), $request->request->get('_token'))) {
            $entityManager->remove($collection);
            $entityManager->flush();
        }

        return $this->redirectToRoute('admin_collections_index', [], Response::HTTP_SEE_OTHER);
    }
}
