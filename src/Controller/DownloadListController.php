<?php

namespace App\Controller;

use App\Entity\Assets\Assets;
use App\Entity\Downloads\Lists;
use App\Entity\Downloads\Logs;
use App\Entity\Downloads\OneTimeLinks;
use App\Entity\User;
use App\Service\CanvasEditorScriptRenderer;
use App\Service\DownloadProgressService;
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
        CanvasEditorScriptRenderer $canvasEditorScriptRenderer,
        DownloadProgressService $downloadProgressService,
    ): Response {
        $rawScript = trim((string) $request->request->get('script', ''));
        $assets = $downloadListService->getAssets();
        $downloadToken = $this->resolveDownloadToken((string) $request->request->get('downloadToken', ''));

        if ($rawScript === '') {
            return $this->scriptedZipFailureResponse(
                $request,
                $downloadProgressService,
                $downloadToken,
                $rawScript,
                'Paste an editor script before downloading.'
            );
        }

        if ($assets === []) {
            return $this->scriptedZipFailureResponse(
                $request,
                $downloadProgressService,
                $downloadToken,
                $rawScript,
                'Your download bag is empty.',
                'warning',
                Response::HTTP_BAD_REQUEST
            );
        }

        try {
            $parsedScript = $canvasEditorScriptRenderer->parseScript($rawScript);
        } catch (\InvalidArgumentException $exception) {
            return $this->scriptedZipFailureResponse(
                $request,
                $downloadProgressService,
                $downloadToken,
                $rawScript,
                $exception->getMessage()
            );
        }

        $entries = [];
        $issues = [];
        $downloadableAssets = [];
        $renderableAssets = [];
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

            $renderableAssets[] = $asset;
            $downloadableAssets[] = $asset;
        }

        if ($renderableAssets === []) {
            return $this->scriptedZipFailureResponse(
                $request,
                $downloadProgressService,
                $downloadToken,
                $rawScript,
                'No supported assets in the download bag could be rendered with that script.'
            );
        }

        if ($downloadToken !== null) {
            $downloadProgressService->initialize($downloadToken, count($renderableAssets), count($issues));
        }

        $processedCount = 0;
        $renderableTotal = count($renderableAssets);
        $openStreams = [];
        $streamCompleted = false;

        foreach ($renderableAssets as $asset) {
            $extension = $canvasEditorScriptRenderer->getOutputExtensionForMimeType((string) $asset->getMimeType());
            $archiveName = $this->createUniqueArchiveName(
                $this->buildScriptedArchiveName($asset, $extension),
                $archiveNameCounts
            );

            $entries[] = [
                'archiveName' => $archiveName,
                'callback' => function () use (
                    $asset,
                    $parsedScript,
                    $canvasEditorScriptRenderer,
                    $downloadProgressService,
                    $downloadToken,
                    &$processedCount,
                    $renderableTotal,
                    &$openStreams,
                    &$streamCompleted
                ) {
                    $assetName = $asset->getName() ?? 'Asset';

                    if ($downloadToken !== null) {
                        $downloadProgressService->advance(
                            $downloadToken,
                            $processedCount,
                            $renderableTotal,
                            sprintf('Rendering %d of %d: %s', $processedCount + 1, $renderableTotal, $assetName)
                        );
                    }

                    try {
                        $renderedAsset = $canvasEditorScriptRenderer->renderAssetToStream($asset, $parsedScript);
                        $stream = $renderedAsset['stream'];

                        if (is_resource($stream)) {
                            $openStreams[] = $stream;
                        }

                        $processedCount++;
                        $streamCompleted = $processedCount === $renderableTotal;

                        if ($downloadToken !== null) {
                            $downloadProgressService->advance(
                                $downloadToken,
                                $processedCount,
                                $renderableTotal,
                                sprintf('Rendered %d of %d assets.', $processedCount, $renderableTotal)
                            );
                        }

                        return $stream;
                    } catch (\Throwable $exception) {
                        if ($downloadToken !== null) {
                            $downloadProgressService->fail(
                                $downloadToken,
                                sprintf('%s could not be rendered: %s', $assetName, $exception->getMessage())
                            );
                        }

                        throw $exception;
                    }
                },
            ];
        }

        if ($issues !== []) {
            $entries[] = [
                'archiveName' => 'README-scripted-download.txt',
                'content' => $this->buildScriptedDownloadReport($downloadableAssets, $issues),
            ];
        }

        $ipAddress = $request->getClientIp() ?? 'unknown';
        $user = $this->getUser();

        return $zipDownloadResponseFactory->createStreaming(
            'download_bag_edited_' . date('Y-m-d') . '.zip',
            $entries,
            null,
            function () use (
                $downloadableAssets,
                $entityManager,
                $ipAddress,
                $user,
                &$openStreams,
                &$streamCompleted,
                $downloadProgressService,
                $downloadToken
            ): void {
                foreach ($openStreams as $stream) {
                    if (is_resource($stream)) {
                        fclose($stream);
                    }
                }

                if (!$streamCompleted) {
                    if (
                        $downloadToken !== null
                        && ($downloadProgressService->get($downloadToken)['status'] ?? 'running') === 'running'
                    ) {
                        $downloadProgressService->fail($downloadToken, 'The edited ZIP could not be completed.');
                    }

                    return;
                }

                try {
                    foreach ($downloadableAssets as $asset) {
                        $log = new Logs();
                        $log->setAsset($asset);
                        $log->setUser($user);
                        $log->setIpAddress($ipAddress);
                        $entityManager->persist($log);
                    }

                    $entityManager->flush();
                } finally {
                    if ($downloadToken !== null) {
                        $downloadProgressService->complete($downloadToken);
                    }
                }
            }
        );
    }

    #[Route('/zip/scripted/status/{token}', name: 'download_list_zip_scripted_status', methods: ['GET'])]
    public function scriptedZipStatus(string $token, DownloadProgressService $downloadProgressService): JsonResponse
    {
        if ($this->resolveDownloadToken($token) === null) {
            return $this->json([
                'status' => 'failed',
                'message' => 'The download token is invalid.',
            ], Response::HTTP_BAD_REQUEST);
        }

        return $this->json($downloadProgressService->get($token) ?? [
            'status' => 'pending',
            'total' => 0,
            'processed' => 0,
            'skipped' => 0,
            'message' => 'Waiting for the edited download to start...',
        ]);
    }

    #[Route('/zip/scripted/status/{token}', name: 'download_list_zip_scripted_status_clear', methods: ['DELETE'])]
    public function clearScriptedZipStatus(string $token, DownloadProgressService $downloadProgressService): Response
    {
        if ($this->resolveDownloadToken($token) === null) {
            return new Response(null, Response::HTTP_BAD_REQUEST);
        }

        $downloadProgressService->clear($token);

        return new Response(null, Response::HTTP_NO_CONTENT);
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
            $this->addFlash('warning', 'No accessible assets could be added to your download bag.');
        } elseif ($addedCount < count($assetIds)) {
            $this->addFlash('warning', 'Some selected assets are not accessible to you and were skipped.');
        }

        return $this->redirect($request->headers->get('referer', $this->generateUrl('home')));
    }

    private function scriptedZipFailureResponse(
        Request $request,
        DownloadProgressService $downloadProgressService,
        ?string $downloadToken,
        string $rawScript,
        string $message,
        string $flashType = 'error',
        int $statusCode = Response::HTTP_UNPROCESSABLE_ENTITY,
    ): Response {
        if ($downloadToken !== null) {
            $downloadProgressService->fail($downloadToken, $message);

            return new Response($message, $statusCode, [
                'Content-Type' => 'text/plain; charset=UTF-8',
            ]);
        }

        $this->rememberScriptDraft($request, $rawScript);
        $this->addFlash($flashType, $message);

        return $this->redirectToRoute('download_list_index');
    }

    private function rememberScriptDraft(Request $request, string $rawScript): void
    {
        $request->getSession()->set('download_list_script_draft', $rawScript);
    }

    private function resolveDownloadToken(string $token): ?string
    {
        $token = trim($token);

        if ($token === '') {
            return null;
        }

        return preg_match('/^[A-Za-z0-9._-]{12,120}$/', $token) === 1 ? $token : null;
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
