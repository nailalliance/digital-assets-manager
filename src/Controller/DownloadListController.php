<?php

namespace App\Controller;

use App\Entity\Assets\Assets;
use App\Entity\Downloads\Lists;
use App\Entity\Downloads\Logs;
use App\Entity\Downloads\OneTimeLinks;
use App\Entity\User;
use App\Service\CanvasEditorScriptRenderer;
use App\Service\DownloadListService;
use App\Service\ZipDownloadResponseFactory;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Uid\Uuid;


#[Route('/download-list')]
class DownloadListController extends AbstractController
{
    /**
     * Displays the contents of the download list.
     */
    #[Route('/', name: 'download_list_index')]
    public function index(DownloadListService $downloadListService, RequestStack $requestStack): Response
    {
        $session = $requestStack->getSession();
        $scriptDraft = $session->get('download_list_script_draft');
        $session->remove('download_list_script_draft');

        return $this->render('download_list/index.html.twig', [
            'assets' => $downloadListService->getAssets(),
            'scriptDraft' => is_string($scriptDraft) ? $scriptDraft : '',
        ]);
    }

    /**
     * Adds an asset to the download list.
     */
    #[Route('/add/{id}', name: 'download_list_add', methods: ['POST'])]
    public function add(Assets $asset, DownloadListService $downloadListService, Request $request): Response
    {
        if ($downloadListService->add($asset->getId())) {
            $this->addFlash('success', sprintf('"%s" has been added to your download bag.', $asset->getName()));
        } else {
            $this->addFlash('warning', 'You do not have access to that asset.');
        }

        // Redirect back to the page the user came from
        return $this->redirect($request->headers->get('referer', $this->generateUrl('home')));
    }

    /**
     * Adds an asset to the download list.
     */
    #[Route('/add/{id}/json', name: 'download_list_add_json', methods: ['POST'])]
    public function addJson(Assets $asset, DownloadListService $downloadListService): Response
    {
        if (!$downloadListService->add($asset->getId())) {
            return $this->json([
                'success' => false,
                'message' => 'You do not have access to that asset.',
                'downloadCount' => $downloadListService->getCount(),
            ], Response::HTTP_FORBIDDEN);
        }

        $this->addFlash('success', sprintf('"%s" has been added to your download bag.', $asset->getName()));

        return $this->json([
            'success' => true,
            'downloadCount' => $downloadListService->getCount()
        ]);
    }

    /**
     * Removes an asset from the download list.
     */
    #[Route('/remove/{id}', name: 'download_list_remove', methods: ['POST'])]
    public function remove(Assets $asset, DownloadListService $downloadListService): Response
    {
        $downloadListService->remove($asset->getId());

        $this->addFlash('notice', sprintf('"%s" has been removed from your download bag.', $asset->getName()));

        return $this->redirectToRoute('download_list_index');
    }

    /**
     * Creates a permanent DownloadList and a temporary OneTimeLink for sharing.
     */
    #[Route('/share', name: 'download_list_share', methods: ['POST'])]
    public function share(
        Request $request,
        DownloadListService $downloadListService,
        EntityManagerInterface $entityManager
    ): JsonResponse {
        // Ensure only designers can create share links
        $this->denyAccessUnlessGranted('ROLE_FTP_DESIGNER');

        $assets = $downloadListService->getAssets();

        if (empty($assets)) {
            return $this->json(['error' => 'Your download bag is empty.'], Response::HTTP_BAD_REQUEST);
        }

        // Get the list name
        $listName = $request->request->get('listName');

        // Create a new DownloadList entity
        $downloadList = new Lists();
        $user = $this->getUser();
        $downloadList->setCreator($user);

        if (!empty($listName)) {
            $downloadList->setName($listName);
        }

        foreach ($assets as $asset) {
            $downloadList->addAsset($asset);
        }

        // Create the one-time link
        $oneTimeLink = new OneTimeLinks();
        $oneTimeLink->setToken(Uuid::v4()->toBase32());
        $oneTimeLink->setDownloadList($downloadList);
        // Set expiration for 30 days from now
        $oneTimeLink->setExpirationDate(new \DateTimeImmutable('+30 days', new \DateTimeZone('UTC')));

        $entityManager->persist($downloadList);
        $entityManager->persist($oneTimeLink);
        $entityManager->flush();

        // Return the URL for the new link
        return $this->json([
            'token' => $oneTimeLink->getToken(),
            'expirationDate' => $oneTimeLink->getExpirationDate()->format('F j, Y'),
            'url' => $this->generateUrl(
                'public_download_list',
                ['token' => $oneTimeLink->getToken()],
                UrlGeneratorInterface::ABSOLUTE_URL ),
        ]);
    }

    /**
     * Handles downloading all assets in the user's session bag as a single zip file.
     */
    #[Route('/zip', name: 'download_list_zip', methods: ['GET'])]
    public function zip(
        DownloadListService $downloadListService,
        EntityManagerInterface $entityManager,
        RequestStack $requestStack,
        ZipDownloadResponseFactory $zipDownloadResponseFactory
    ): StreamedResponse {
        $assets = $downloadListService->getAssets();
        $zipFileName = 'download_bag_' . date('Y-m-d') . '.zip';
        $request = $requestStack->getCurrentRequest();
        $user = $this->getUser();
        $downloadableAssets = [];
        $entries = [];

        foreach ($assets as $asset) {
            $filePath = $asset->getFilePath();

            if (!is_readable($filePath)) {
                continue;
            }

            $downloadableAssets[] = $asset;
            $entries[] = [
                'archiveName' => basename($filePath),
                'sourcePath' => $filePath,
            ];
        }

        return $zipDownloadResponseFactory->create(
            $zipFileName,
            $entries,
            function () use ($downloadableAssets, $entityManager, $request, $user): void {
                $ipAddress = $request?->getClientIp() ?? 'unknown';

                foreach ($downloadableAssets as $asset) {
                    $log = new Logs();
                    $log->setAsset($asset);
                    $log->setUser($user);
                    $log->setIpAddress($ipAddress);
                    $entityManager->persist($log);
                }

                $entityManager->flush();
            }
        );
    }

    #[Route('/zip/scripted', name: 'download_list_zip_scripted', methods: ['POST'])]
    public function scriptedZip(
        Request $request,
        DownloadListService $downloadListService,
        EntityManagerInterface $entityManager,
        ZipDownloadResponseFactory $zipDownloadResponseFactory,
        CanvasEditorScriptRenderer $canvasEditorScriptRenderer
    ): Response {
        $rawScript = trim((string) $request->request->get('script', ''));
        $assets = $downloadListService->getAssets();

        if ($rawScript === '') {
            $this->rememberScriptDraft($request, $rawScript);
            $this->addFlash('error', 'Paste an editor script before downloading.');

            return $this->redirectToRoute('download_list_index');
        }

        if ($assets === []) {
            $this->rememberScriptDraft($request, $rawScript);
            $this->addFlash('warning', 'Your download bag is empty.');

            return $this->redirectToRoute('download_list_index');
        }

        try {
            $parsedScript = $canvasEditorScriptRenderer->parseScript($rawScript);
        } catch (\InvalidArgumentException $exception) {
            $this->rememberScriptDraft($request, $rawScript);
            $this->addFlash('error', $exception->getMessage());

            return $this->redirectToRoute('download_list_index');
        }

        $entries = [];
        $issues = [];
        $temporaryFiles = [];
        $downloadableAssets = [];
        $archiveNameCounts = [];

        foreach ($assets as $asset) {
            $mimeType = $asset->getMimeType();
            $sourcePath = $asset->getFilePath();

            if (!$canvasEditorScriptRenderer->supportsMimeType($mimeType)) {
                $issues[] = sprintf(
                    '%s was skipped because %s is not supported by scripted bag downloads.',
                    $asset->getName() ?? 'An asset',
                    $mimeType ?? 'its mime type'
                );
                continue;
            }

            if (!is_string($sourcePath) || !is_readable($sourcePath)) {
                $issues[] = sprintf(
                    '%s was skipped because the source file is not readable.',
                    $asset->getName() ?? 'An asset'
                );
                continue;
            }

            try {
                $renderedFile = $canvasEditorScriptRenderer->renderAssetToTempFile($asset, $parsedScript);
                $temporaryFiles[] = $renderedFile['path'];
                $downloadableAssets[] = $asset;
                $entries[] = [
                    'archiveName' => $this->createUniqueArchiveName(
                        $this->buildScriptedArchiveName($asset, $renderedFile['extension']),
                        $archiveNameCounts
                    ),
                    'sourcePath' => $renderedFile['path'],
                ];
            } catch (\Throwable $exception) {
                $issues[] = sprintf(
                    '%s could not be rendered: %s',
                    $asset->getName() ?? 'An asset',
                    $exception->getMessage()
                );
            }
        }

        if ($entries === []) {
            $this->rememberScriptDraft($request, $rawScript);
            $this->addFlash('error', 'No supported assets in the download bag could be rendered with that script.');

            return $this->redirectToRoute('download_list_index');
        }

        if ($issues !== []) {
            $entries[] = [
                'archiveName' => 'README-scripted-download.txt',
                'content' => $this->buildScriptedDownloadReport($downloadableAssets, $issues),
            ];
        }

        $ipAddress = $request->getClientIp() ?? 'unknown';
        $user = $this->getUser();

        return $zipDownloadResponseFactory->create(
            'download_bag_edited_' . date('Y-m-d') . '.zip',
            $entries,
            function () use ($downloadableAssets, $entityManager, $ipAddress, $user): void {
                foreach ($downloadableAssets as $asset) {
                    $log = new Logs();
                    $log->setAsset($asset);
                    $log->setUser($user);
                    $log->setIpAddress($ipAddress);
                    $entityManager->persist($log);
                }

                $entityManager->flush();
            },
            function () use ($temporaryFiles): void {
                foreach ($temporaryFiles as $temporaryFile) {
                    if (is_string($temporaryFile) && is_file($temporaryFile)) {
                        @unlink($temporaryFile);
                    }
                }
            }
        );
    }

    #[Route('/add-multiple', name: 'download_list_add_multiple', methods: ['POST'])]
    public function addMultiple(Request $request, DownloadListService $downloadListService): Response
    {
        $assetIdsString = $request->request->get('asset_ids', '');
        $assetIds = array_filter(explode(',', $assetIdsString));

        if (empty($assetIds)) {
            $this->addFlash('warning', 'No assets were selected to add.');
            return $this->redirect($request->headers->get('referer', $this->generateUrl('home')));
        }

        $addedCount = 0;

        foreach ($assetIds as $id) {
            if ($downloadListService->add((int) $id)) {
                $addedCount++;
            }
        }

        if ($addedCount === 0) {
            $this->addFlash('warning', 'No accessible assets were added to your download bag.');
        } elseif ($addedCount < count($assetIds)) {
            $this->addFlash('warning', sprintf('%d assets were added. Some selected assets are not accessible to you.', $addedCount));
        } else {
            $this->addFlash('success', sprintf('%d assets have been added to your download bag.', $addedCount));
        }

        return $this->redirect($request->headers->get('referer', $this->generateUrl('home')));
    }

    private function rememberScriptDraft(Request $request, string $rawScript): void
    {
        $request->getSession()->set('download_list_script_draft', $rawScript);
    }

    private function buildScriptedArchiveName(Assets $asset, string $extension): string
    {
        $filePath = (string) $asset->getFilePath();
        $filename = pathinfo($filePath, \PATHINFO_FILENAME);
        $safeBaseName = preg_replace('/[^a-zA-Z0-9\-_]+/', '-', $filename) ?: 'asset-edited';

        return $safeBaseName . '-edited.' . $extension;
    }

    /**
     * @param array<string, int> $archiveNameCounts
     */
    private function createUniqueArchiveName(string $archiveName, array &$archiveNameCounts): string
    {
        $archiveNameCounts[$archiveName] = ($archiveNameCounts[$archiveName] ?? 0) + 1;
        $occurrence = $archiveNameCounts[$archiveName];

        if ($occurrence === 1) {
            return $archiveName;
        }

        $extension = pathinfo($archiveName, \PATHINFO_EXTENSION);
        $baseName = pathinfo($archiveName, \PATHINFO_FILENAME);

        return $extension !== ''
            ? sprintf('%s-%d.%s', $baseName, $occurrence, $extension)
            : sprintf('%s-%d', $baseName, $occurrence);
    }

    /**
     * @param Assets[] $downloadableAssets
     * @param list<string> $issues
     */
    private function buildScriptedDownloadReport(array $downloadableAssets, array $issues): string
    {
        $lines = [
            'Canvas script download summary',
            '==============================',
            '',
            sprintf('Rendered assets: %d', count($downloadableAssets)),
            sprintf('Skipped or failed assets: %d', count($issues)),
            '',
        ];

        foreach ($issues as $issue) {
            $lines[] = '- ' . $issue;
        }

        return implode("\n", $lines) . "\n";
    }
}
