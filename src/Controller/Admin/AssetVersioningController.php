<?php

namespace App\Controller\Admin;

use App\Entity\Assets\Assets;
use App\Entity\Assets\AssetVersionTypeEnum;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/admin/assets')]
class AssetVersioningController extends AbstractController
{
    #[Route('/{id}/duplicate/editable', name: 'admin_asset_duplicate_editable', methods: ['GET'])]
    public function duplicateAsEditable(Assets $parentAsset, EntityManagerInterface $entityManager): Response
    {
        return $this->duplicateAsset($parentAsset, AssetVersionTypeEnum::EDITABLE, $entityManager);
    }

    #[Route('/{id}/duplicate/cmyk', name: 'admin_asset_duplicate_cmyk', methods: ['POST'])]
    public function duplicateAsCmyk(Assets $parentAsset, EntityManagerInterface $entityManager): Response
    {
        return $this->duplicateAsset($parentAsset, AssetVersionTypeEnum::CMYK_VERSION, $entityManager);
    }

    private function duplicateAsset(Assets $parentAsset, AssetVersionTypeEnum $versionType, EntityManagerInterface $entityManager): Response
    {
        $this->denyAccessUnlessGranted('ROLE_FTP_DESIGNER');

        $childAsset = new Assets();
        $childAsset->setParent($parentAsset);
        $childAsset->setAssetVersionTypeEnum($versionType);

        // Clone properties from the parent
        $childAsset->setName($parentAsset->getName());
        $childAsset->setDescription($parentAsset->getDescription());
        $childAsset->setStatus($parentAsset->getStatus());
        $childAsset->setThumbnailPath($parentAsset->getThumbnailPath());
        $childAsset->setUploader($this->getUser()); // Set current user as uploader of the new version

        $childAsset->setFilePath("");
        $childAsset->setMimeType("");
        $childAsset->setFileSize(0);

        // Clone many-to-many relationships
        foreach ($parentAsset->getBrand() as $brand) {
            $childAsset->addBrand($brand);
        }
        foreach ($parentAsset->getCategories() as $category) {
            $childAsset->addCategory($category);
        }
        foreach ($parentAsset->getCollections() as $collection) {
            $childAsset->addCollection($collection);
        }
        foreach ($parentAsset->getTags() as $tag) {
            $childAsset->addTag($tag);
        }

        $entityManager->persist($childAsset);
        $entityManager->flush();

        // $this->addFlash('success', sprintf('New %s created. Please upload the new file and complete the details.', $versionType->value));
        // Redirect to the new child asset's edit page
        return $this->redirectToRoute('admin_asset_edit', ['id' => $childAsset->getId()]);
    }
}
