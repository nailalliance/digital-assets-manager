<?php

namespace App\Controller\Admin;

use App\Entity\Assets\Assets;
use App\Form\AssetType;
use App\Repository\Assets\AssetsRepository;
use App\Repository\Assets\BrandsRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class AssetEditController extends AbstractController
{
    #[Route('/assets/{id}/edit', name: 'admin_asset_edit')]
    public function index(
        Assets $asset,
        Request $request,
        EntityManagerInterface $entityManager,
        BrandsRepository $brandsRepository,
    ): Response
    {
        $form = $this->createForm(AssetType::class, $asset);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            $this->addFlash('success', 'Asset updated successfully.');

            return $this->redirectToRoute('app_asset', ['id' => $asset->getId()]);
        }

        $parentBrands = $brandsRepository->findBy(['brands' => null]);

        return $this->render('asset/edit.html.twig', [
            'asset' => $asset,
            'editForm' => $form->createView(),
            'parentBrands' => $parentBrands,
        ]);
    }
}
