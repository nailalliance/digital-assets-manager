<?php

namespace App\Controller;

use App\Entity\Assets\Assets;
use App\Entity\Assets\AssetStatusEnum;
use App\Entity\Assets\AssetVersionTypeEnum;
use App\Entity\User;
use App\Form\WebDownloadType;
use App\Security\Voter\AssetVoter;
use App\Service\EditorFontCatalog;
use App\Service\ImageProcessorService;
use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\HeaderUtils;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\UX\Turbo\TurboBundle;

final class AssetController extends AbstractController
{
    private const EDITOR_SUPPORTED_MIME_TYPES = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/gif',
    ];

    #[Route('/assets/{id}', name: 'app_asset')]
    #[IsGranted(AssetVoter::VIEW, subject: 'assets')]
    public function index(Assets $assets, EntityManagerInterface $entityManager): Response
    {
        $primaryAsset = $assets->getParent() ?? $assets;

        $children = $primaryAsset->getChildren();

        $editableChild = null;
        $cmykChild = null;

        foreach ($children as $child) {
            if ($child->getAssetVersionTypeEnum() === AssetVersionTypeEnum::EDITABLE)
            {
                $editableChild = $child;
            }
            if ($child->getAssetVersionTypeEnum() === AssetVersionTypeEnum::CMYK_VERSION)
            {
                $cmykChild = $child;
            }
        }

        $webDownloadForm = $this->createForm(WebDownloadType::class, null, [
            'action' => $this->generateUrl('asset_download_web', ['id' => $assets->getId()]),
        ]);

        return $this->render('asset/index.html.twig', [
            'asset' => $assets,
            'webDownloadForm' => $webDownloadForm->createView(),
            'primaryAsset' => $primaryAsset,
            'editableChild' => $editableChild,
            'cmykChild' => $cmykChild,
            'canEditImage' => $this->canEditImage($assets),
        ]);
    }

    #[Route('/assets/{id}/editor', name: 'app_asset_editor', methods: ['GET'])]
    #[IsGranted(AssetVoter::VIEW, subject: 'asset')]
    public function editor(Assets $asset, EditorFontCatalog $editorFontCatalog): Response
    {
        if (!$this->canEditImage($asset)) {
            $this->addFlash('warning', 'This asset type is not supported by the canvas editor yet.');

            return $this->redirectToRoute('app_asset', ['id' => $asset->getId()]);
        }

        return $this->render('asset/editor.html.twig', [
            'asset' => $asset,
            'fontFamilies' => $editorFontCatalog->getSelectableFontFamilies(),
            'customFonts' => array_map(
                fn (array $fontFace): array => [
                    'key' => $fontFace['key'],
                    'family' => $fontFace['family'],
                    'weight' => $fontFace['weight'],
                    'style' => $fontFace['style'],
                    'format' => $fontFace['cssFormat'],
                    'url' => $this->generateUrl('app_asset_editor_font', ['fontKey' => $fontFace['key']]),
                ],
                $editorFontCatalog->getCustomFontFaces()
            ),
        ]);
    }

    #[Route('/assets/editor/fonts/{fontKey}', name: 'app_asset_editor_font', methods: ['GET'])]
    public function editorFont(string $fontKey, EditorFontCatalog $editorFontCatalog): BinaryFileResponse
    {
        $fontFace = $editorFontCatalog->findFontFaceByKey($fontKey);
        if ($fontFace === null) {
            throw $this->createNotFoundException('Editor font not found.');
        }

        $response = new BinaryFileResponse($fontFace['path']);
        $response->headers->set('Content-Type', $fontFace['mimeType']);
        $response->setContentDisposition(
            ResponseHeaderBag::DISPOSITION_INLINE,
            basename($fontFace['relativePath'])
        );
        $response->setAutoEtag();
        $response->setAutoLastModified();

        return $response;
    }

    /**
     * Handles the "Download for Web" form submission and streams the processed image.
     */
    #[Route('/assets/{id}/download-web', name: 'asset_download_web', methods: ['GET'])]
    #[IsGranted(AssetVoter::VIEW, subject: 'asset')]
    public function downloadWeb(Assets $asset, Request $request, ImageProcessorService $imageProcessor): Response
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

        $data = $request->query->all('web_download');

        $size = (int)($data['size'] ?? 1500);
        $addPadding = ($data['padding'] ?? 'no') === 'yes';
        $format = $data['format'] ?? 'webp';

        $padding = 0;
        if ($addPadding) {
            $padding = ($size === 1500) ? 38 : 50;
        }

        if (!in_array($asset->getMimeType(), ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf'])) {
            $this->addFlash('warning', 'This asset is not a downloadable image.');
            return $this->redirectToRoute('app_asset', ['id' => $asset->getId()]);
        }

        try {
            $imageData = $imageProcessor->exportFile(
                $asset->getFilePath(),
                $size,
                $size,
                $padding,
                $format
            );

            $itemCodes = $asset->getItemCodes()->map(fn($item) => $item->getCode())->toArray();
            $filenameBase = !empty($itemCodes) ? implode('-', $itemCodes) . '-' . $asset->getName() : $asset->getName();
            $safeFilename = preg_replace('/[^a-zA-Z0-9\-\_]/', '', $filenameBase);

            $response = new Response($imageData);
            $disposition = $response->headers->makeDisposition(
                ResponseHeaderBag::DISPOSITION_ATTACHMENT,
                $safeFilename . '.' . $format
            );
            $response->headers->set('Content-Disposition', $disposition);
            $response->headers->set('Content-Type', 'image/' . $format);

            return $response;

        } catch (\Exception $e) {
            $this->addFlash('error', 'There was an error processing the image: ' . $e->getMessage());
            return $this->redirectToRoute('app_asset', ['id' => $asset->getId()]);
        }
    }

    #[Route('/assets/{id}/quick-look', name: 'app_asset_quick_look', methods: ['GET'])]
    #[IsGranted(AssetVoter::VIEW, subject: 'assets')]
    public function quickLook(Assets $assets, Request $request): Response
    {
        return $this->render('asset/_quick_look.html.twig', [
            'asset' => $assets,
        ]);
    }

    #[Route('/assets/{id}/pdf', name: 'asset_pdf_preview', methods: ['GET'])]
    #[IsGranted(AssetVoter::VIEW, subject: 'asset')]
    public function pdfPreview(Assets $asset): Response
    {
        return $this->render('asset/_pdf.html.twig', ['asset' => $asset]);
    }

    private function canEditImage(Assets $asset): bool
    {
        return in_array($asset->getMimeType(), self::EDITOR_SUPPORTED_MIME_TYPES, true);
    }
}
