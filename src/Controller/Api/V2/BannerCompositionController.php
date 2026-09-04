<?php

namespace App\Controller\Api\V2;

use App\Entity\Assets\Assets;
use App\Repository\Assets\AssetsRepository;
use App\Security\Voter\AssetVoter;
use App\Service\Banner\BannerCompositionCacheService;
use App\Service\Banner\BannerLayoutCatalog;
use App\Service\Banner\BannerSeed;
use App\Service\Banner\Exception\AssetSourceNotFoundException;
use App\Service\Banner\Exception\BannerInputException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/v2/banner-compositions')]
final class BannerCompositionController extends AbstractController
{
    #[Route('', name: 'api_v2_banner_composition_create', methods: ['POST'])]
    public function create(
        Request $request,
        AssetsRepository $assetsRepository,
        BannerLayoutCatalog $layoutCatalog,
        BannerCompositionCacheService $cacheService,
    ): Response {
        try {
            $payload = $request->toArray();
        } catch (\Throwable) {
            return $this->error('Request body must contain valid JSON.', Response::HTTP_BAD_REQUEST);
        }

        $validationError = $this->validatePayload($payload, $layoutCatalog);
        if ($validationError !== null) {
            return $this->error($validationError, Response::HTTP_BAD_REQUEST);
        }

        /** @var list<int> $assetIds */
        $assetIds = $payload['asset_ids'];
        $layout = $payload['layout'];
        $format = $payload['format'] ?? 'webp';
        $requestedSeed = $payload['seed'] ?? null;
        $seed = BannerSeed::resolve($assetIds, $layout, $requestedSeed);

        $resolvedAssets = $assetsRepository->findBy(['id' => $assetIds]);
        $assetsById = [];
        foreach ($resolvedAssets as $asset) {
            $assetsById[$asset->getId()] = $asset;
        }

        $missingIds = array_values(array_filter(
            $assetIds,
            static fn (int $id): bool => !isset($assetsById[$id])
        ));
        if ($missingIds !== []) {
            return $this->error('One or more requested assets were not found.', Response::HTTP_NOT_FOUND, [
                'asset_ids' => $missingIds,
            ]);
        }

        /** @var list<Assets> $assets */
        $assets = array_map(static fn (int $id): Assets => $assetsById[$id], $assetIds);
        foreach ($assets as $asset) {
            if (!$this->isGranted(AssetVoter::VIEW, $asset)) {
                return $this->error('One or more requested assets are not accessible.', Response::HTTP_FORBIDDEN);
            }
        }

        try {
            $entry = $cacheService->getOrCreate($assets, $layout, $format, $seed);
        } catch (AssetSourceNotFoundException $exception) {
            return $this->error($exception->getMessage(), Response::HTTP_NOT_FOUND);
        } catch (BannerInputException $exception) {
            return $this->error($exception->getMessage(), Response::HTTP_UNPROCESSABLE_ENTITY);
        } catch (\Throwable) {
            return $this->error('The banner could not be rendered.', Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $response = new BinaryFileResponse($entry->path);
        $response->headers->set('Content-Type', $format === 'webp' ? 'image/webp' : 'image/jpeg');
        $response->headers->set('X-Banner-Seed', (string) $entry->seed);
        $response->headers->set('X-Banner-Cache', $entry->cacheHit ? 'HIT' : 'MISS');
        $response->setContentDisposition(
            ResponseHeaderBag::DISPOSITION_INLINE,
            sprintf('banner-%s.%s', $layout, $format)
        );
        $response->setPrivate();
        $response->setMaxAge(86400);
        $response->setEtag($entry->etag);

        if ($response->isNotModified($request)) {
            return $response;
        }

        return $response;
    }

    /** @param array<string, mixed> $payload */
    private function validatePayload(array $payload, BannerLayoutCatalog $layoutCatalog): ?string
    {
        $assetIds = $payload['asset_ids'] ?? null;
        if (!is_array($assetIds) || !array_is_list($assetIds) || count($assetIds) < 1 || count($assetIds) > 12) {
            return 'asset_ids must be a JSON array containing between 1 and 12 IDs.';
        }
        foreach ($assetIds as $assetId) {
            if (!is_int($assetId) || $assetId < 1) {
                return 'Every asset ID must be a positive integer.';
            }
        }
        if (count(array_unique($assetIds, SORT_NUMERIC)) !== count($assetIds)) {
            return 'asset_ids must not contain duplicates.';
        }

        $layout = $payload['layout'] ?? null;
        if (!is_string($layout) || !$layoutCatalog->supports($layout)) {
            return 'layout must be desktop or mobile.';
        }

        $format = $payload['format'] ?? 'webp';
        if (!is_string($format) || !in_array($format, ['webp', 'jpg'], true)) {
            return 'format must be webp or jpg.';
        }

        $seed = $payload['seed'] ?? null;
        if ($seed !== null && (!is_int($seed) || $seed < 0 || $seed > 2_147_483_647)) {
            return 'seed must be an integer between 0 and 2147483647.';
        }

        return null;
    }

    /** @param array<string, mixed> $details */
    private function error(string $message, int $status, array $details = []): JsonResponse
    {
        return $this->json([
            'error' => $message,
            ...($details === [] ? [] : ['details' => $details]),
        ], $status);
    }
}
