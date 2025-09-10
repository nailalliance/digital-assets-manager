<?php

namespace App\Controller\Admin;

use App\Entity\Assets\Assets;
use App\Entity\Assets\ItemCodes;
use App\Entity\Assets\Tags;
use App\Form\AssetType;
use App\Repository\Assets\BrandsRepository;
use App\Repository\Assets\ItemCodesRepository;
use App\Repository\Assets\TagsRepository;
use App\Service\ImageProcessorService;
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
        ItemCodesRepository $itemCodesRepository,
        TagsRepository $tagsRepository,
        ImageProcessorService $imageProcessor,
        Filesystem $filesystem
    ): Response
    {
        $form = $this->createForm(AssetType::class, $asset);

        $existingCodes = [];
        foreach ($asset->getItemCodes() as $itemCode) {
            $existingCodes[] = $itemCode->getCode();
        }
        $form->get('itemCodes')->setData(implode(', ', $existingCodes));

        $existingTags = [];
        foreach ($asset->getTags() as $tags) {
            $existingTags[] = $tags->getName();
        }
        $form->get('tags')->setData(implode(', ', $existingTags));

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            /** @var ?UploadedFile $thumbnailFile */
            $thumbnailFile = $form->get('thumbnail')->getData();

            if ($thumbnailFile) {
                $thumbnailDir = $this->getParameter('thumbnail_dir');
                $originalFileName = pathinfo($thumbnailFile->getClientOriginalName(), PATHINFO_FILENAME);
                $safeFilename = preg_replace('/[^A-Za-z0-9\-\_\.]/', '-', $originalFileName);

                $firstLetter = strtolower(mb_substr($safeFilename, 0, 1));
                $secondLetter = strtolower(mb_substr($safeFilename, 1, 1));
                $finalDir = sprintf('%s/%s/%s', $thumbnailDir, $firstLetter, $secondLetter);
                $filesystem->mkdir($finalDir);

                if (class_exists('Imagick')) {
                    $thumbnailBinary = $imageProcessor->makeThumbnail($thumbnailFile->getRealPath(), 700, 700);

                    if ($thumbnailBinary) {
                        $thumbnailPath = UniqueFilePathGenerator::get($finalDir, $safeFilename . '.webp');
                        $filesystem->dumpFile($thumbnailPath, $thumbnailBinary);
                        $asset->setThumbnailPath($thumbnailPath);
                    } else {
                        $this->addFlash('warning', 'Could not create thumbnail from the uploaded file.');
                    }
                } else {
                    // Fallback for when Imagick is not installed
                    try {
                        $newFilename = $safeFilename . '.' . $thumbnailFile->guessExtension();
                        $thumbnailPath = UniqueFilePathGenerator::get($finalDir, $newFilename);

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

            $tagsString = $form->get('tags')->getData();
            $asset->getTags()->clear();
            if (!empty($tagsString)) {
                $tags = array_map('trim', explode(',', $tagsString));
                $uniqueTags = array_unique(array_filter($tags));
                foreach ($uniqueTags as $tag) {
                    $itemTag = $tagsRepository->findOneBy(['name' => $tag]);
                    if (!$itemTag) {
                        $itemTag = new Tags();
                        $itemTag->setName($tag);
                        $entityManager->persist($itemTag);
                    }
                    $asset->addTag($itemTag);
                }
            }

            $entityManager->persist($asset);
            $entityManager->flush();

            $this->addFlash('success', 'Asset "' . $asset->getName() . '" ('.$asset->getId(). ') updated successfully.');
            // return $this->redirectToRoute('admin_asset_edit', ['id' => $asset->getId()]);
            return $this->redirectToRoute('admin_assets_index');
        }

        $parentBrands = $brandsRepository->findBy(['brands' => null]);

        return $this->render('asset/edit.html.twig', [
            'asset' => $asset,
            'editForm' => $form->createView(),
            'parentBrands' => $parentBrands,
        ]);
    }
}

