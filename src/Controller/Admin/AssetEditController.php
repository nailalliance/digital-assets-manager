<?php

namespace App\Controller\Admin;

use App\Entity\Assets\Assets;
use App\Entity\Assets\ItemCodes;
use App\Form\AssetType;
use App\Repository\Assets\AssetsRepository;
use App\Repository\Assets\BrandsRepository;
use App\Repository\Assets\ItemCodesRepository;
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
        ItemCodesRepository $itemCodesRepository
    ): Response
    {
        $form = $this->createForm(AssetType::class, $asset);

        $existingCodes = [];
        foreach ($asset->getItemCodes() as $itemCode) {
            $existingCodes[] = $itemCode->getCode();
        }
        $form->get('itemCodes')->setData(join(', ', $existingCodes));

        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()) {

            $itemCodesString = $form->get('itemCodes')->getData();

            $asset->getItemCodes()->clear();

            if (!empty($itemCodesString)) {
                $codes = array_map('trim', explode(',', $itemCodesString));
                $uniqueCodes = array_unique(array_filter($codes));

                foreach ($uniqueCodes as $code) {
                    $itemCode = $itemCodesRepository->findOneBy(['code' => $code]);

                    if (!$itemCode) {
                        $itemCode = new ItemCodes();
                        $itemCode->setCode($code);
                        $entityManager->persist($itemCode);
                    }

                    $asset->addItemCode($itemCode);
                }
            }

            $entityManager->persist($asset);

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
