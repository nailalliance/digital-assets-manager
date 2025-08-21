<?php

namespace App\Controller\Admin;

use App\Entity\Assets\Assets;
use App\Entity\Assets\ItemCodes;
use App\Form\AssetType;
use App\Repository\Assets\BrandsRepository;
use App\Repository\Assets\ItemCodesRepository;
use App\Service\UniqueFilePathGenerator;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;
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
        Filesystem $filesystem,
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

        if ($form->isSubmitted() && $form->isValid()) {

            /** @var ?UploadedFile $thumbnailFile */
            $thumbnailFile = $form->get('thumbnail')->getData();

                // Only process if a new thumbnail was actually uploaded
                if ($thumbnailFile) {
                    $targetWidth = 300;
                    $targetHeight = 300;

                    // FIX: Get the base thumbnail directory from your parameters
                    $thumbnailDir = $this->getParameter('thumbnail_dir');

                    // It's better to use the sanitized name for the final path construction
                    $originalFileName = pathinfo($thumbnailFile->getClientOriginalName(), PATHINFO_FILENAME);
                    $safeFilename = str_replace(' ', '-', $originalFileName);
                    $safeFilename = preg_replace('/[^A-Za-z0-9\-\_\.]/', '', $safeFilename);

                    $firstLetter = strtolower(mb_substr($safeFilename, 0, 1));
                    $secondLetter = strtolower(mb_substr($safeFilename, 1, 1));

                    $finalDir = sprintf('%s/%s/%s', $thumbnailDir, $firstLetter, $secondLetter);

                    if (!is_dir($finalDir)) {
                        mkdir($finalDir, 0755, true);
                    }

                    $thumbnailPath = UniqueFilePathGenerator::get($finalDir, $safeFilename . '.webp');

                    if (class_exists('Imagick')) {
                        try {
                            $image = new \Imagick($thumbnailFile->getRealPath());
                            $image->thumbnailImage($targetWidth, $targetHeight, true, true);

                            $canvas = new \Imagick();
                            $canvas->newImage($targetWidth, $targetHeight, 'white', 'webp');

                            $x = ($targetWidth - $image->getImageWidth()) / 2;
                            $y = ($targetHeight - $image->getImageHeight()) / 2;

                            $canvas->compositeImage($image, \Imagick::COMPOSITE_OVER, $x, $y);
                            $canvas->writeImage($thumbnailPath);

                            $asset->setThumbnailPath($thumbnailPath);

                            $image->clear();
                            $canvas->clear();
                        } catch (\ImagickException $e) {
                            $this->addFlash('warning', 'Could not create thumbnail.');
                        }
                    } else {
                        try {
                            $thumbnailFile->move(
                                dirname($thumbnailPath),
                                basename($thumbnailPath)
                            );

                            $asset->setThumbnailPath($thumbnailPath);
                        } catch (FileException $e) {
                            $this->addFlash('warning', 'Could not save the uploaded thumbnail.');
                        }
                    }
            }

            $entityManager->persist($asset);
            $entityManager->flush();

            $this->addFlash('success', 'Asset updated successfully.');

            return $this->redirectToRoute('admin_asset_edit', ['id' => $asset->getId()]);
        }

        $parentBrands = $brandsRepository->findBy(['brands' => null]);

        return $this->render('asset/edit.html.twig', [
            'asset' => $asset,
            'editForm' => $form->createView(),
            'parentBrands' => $parentBrands,
        ]);
    }
}
