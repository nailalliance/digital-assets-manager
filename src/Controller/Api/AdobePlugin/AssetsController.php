<?php

namespace App\Controller\Api\AdobePlugin;

use App\Entity\Assets\Assets;
use App\Entity\User;
use App\Repository\Assets\AssetsRepository;

use App\Service\SearchService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api/adobe_plugin/assets')]
class AssetsController extends AbstractController
{
    #[Route('', name: 'app_api_adobe_plugin_assets_index', methods: ['GET'])]
    public function index(
        Request $request,
        SearchService $searchService,
        SerializerInterface $serializer
    ): JsonResponse
    {
        $searchTerm = $request->query->get('q', '');
        $mimeType = $request->query->get('mime_type');
        $page = $request->query->getInt('page', 1);
        $limit = $request->query->getInt('limit', 100);

        $assets = $searchService->search($searchTerm, 1000, 0);

        $assets = array_filter($assets['hits'], function (Assets $asset) use ($mimeType) {
            if (empty($mimeType)) {
                return true;
            }
            return $asset->getMimeType() === $mimeType;
        });

        $totalItems = count($assets);

        $assets = array_slice($assets, $page * $limit, $limit);

        /** @var User $user */
        $user = $this->getUser();

        $assets = array_map(function (Assets $asset) use ($user) {
            $asset->setThumbnailPath(
                $this->generateUrl(
                    'asset_thumbnail_adobe',
                    [
                        'imageToken' => $user->getApiTokens()[0]->getImageToken(),
                        'filename' => basename($asset->getThumbnailPath())
                    ],
                    UrlGeneratorInterface::ABSOLUTE_URL
                )
            );
            $asset->setFilePath(
                $this->generateUrl('asset_stream', ['id' => $asset->getId()], UrlGeneratorInterface::ABSOLUTE_URL)
            );
            return $asset;
        }, $assets);

        $data = [
            'items' => $assets,
            'pagination' => [
                'currentPage' => $page,
                'itemsPerPage' => $limit,
                'totalItems' => $totalItems,
                'totalPages' => ceil($totalItems / $limit),
            ]
        ];

        $json = $serializer->serialize($data, 'json', ['groups' => 'api_adobe_plugin']);

        return new JsonResponse($json, JsonResponse::HTTP_OK, [], true);
    }

    #[Route('/{id}', name: 'app_api_adobe_plugin_assets_show', methods: ['GET'])]
    public function show(Assets $asset, SerializerInterface $serializer): JsonResponse
    {
        $json = $serializer->serialize($asset, 'json', ['groups' => 'api_adobe_plugin_detail']);

        return new JsonResponse($json, JsonResponse::HTTP_OK, [], true);
    }
}
