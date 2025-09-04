<?php

namespace App\Controller;

use App\Entity\Boards\Board;
use App\Entity\Boards\BoardItem;
use App\Entity\User;
use App\Form\BoardType;
use App\Repository\Assets\AssetsRepository;
use App\Repository\Boards\BoardRepository;
use App\Security\Voter\BoardVoter;
use App\Service\SearchService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/boards')]
class BoardsController extends AbstractController
{
    #[Route('/', name: 'app_boards_index', methods: ['GET'])]
    #[IsGranted('ROLE_FTP_DESIGNER')]
    public function index(BoardRepository $boardRepository): Response
    {
        return $this->render('boards/index.html.twig', [
            'boards' => $boardRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_boards_new', methods: ['GET', 'POST'])]
    #[IsGranted('ROLE_FTP_DESIGNER')]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $board = new Board();
        $form = $this->createForm(BoardType::class, $board);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $user = $this->getUser();
            $board->setOwner($user);
            $entityManager->persist($board);
            $entityManager->flush();

            return $this->redirectToRoute('app_boards_show', ['id' => $board->getId()], Response::HTTP_SEE_OTHER);
        }

        return $this->render('boards/new.html.twig', [
            'board' => $board,
            'form' => $form->createView(),
        ]);
    }

    #[Route('/{id}', name: 'app_boards_show', methods: ['GET'])]
    public function show(Board $board): Response
    {
        $this->denyAccessUnlessGranted(BoardVoter::VIEW, $board);

        return $this->render('boards/show.html.twig', [
            'board' => $board,
        ]);
    }

    #[Route('/assets/search', name: 'app_boards_asset_search', methods: ['GET'])]
    public function searchAssets(Request $request, SearchService $searchService, UrlGeneratorInterface $urlGenerator): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_FTP_DESIGNER');

        $query = $request->query->get('q', '');
        $assets = $searchService->search($query, 1000, 0);

        $assets = $assets['hits'];

        $data = array_map(function ($asset) use ($urlGenerator) {
            return [
                'id' => $asset->getId(),
                'name' => $asset->getName(),
                // 'thumbnail_path' => '/files-thumbs/' . $asset->getThumbnailPath(), // Adjust this path if needed
                'thumbnail_path' => $urlGenerator->generate('asset_thumbnail', ['filename' => basename($asset->getThumbnailPath())])
            ];
        }, $assets);

        return $this->json($data);
    }

    #[Route('/{id}/items', name: 'app_boards_get_items', methods: ['GET'])]
    public function getBoardItems(Board $board, UrlGeneratorInterface $urlGenerator): JsonResponse
    {
        $this->denyAccessUnlessGranted(BoardVoter::VIEW, $board);

        $itemsData = [];

        foreach ($board->getItems() as $item) {
            $content = $item->getContent();
            if ($item->getType() === 'asset' && isset($content['assetId']))
            {
                $content['thumbnailUrl'] = $urlGenerator->generate('asset_thumbnail_by_id', ['id' => $content['assetId']]);
            }

            $itemsData[] = [
                'id' => $item->getId(),
                'type' => $item->getType(),
                'pos_x' => $item->getPosX(),
                'pos_y' => $item->getPosY(),
                'width' => $item->getWidth(),
                'height' => $item->getHeight(),
                'content' => $content,
                'zIndex' => $item->getZIndex(),
            ];
        }

        return $this->json($itemsData);
    }

    #[Route('/{id}/save', name: 'app_boards_save', methods: ['POST'])]
    public function saveBoard(Request $request, Board $board, EntityManagerInterface $entityManager, AssetsRepository $assetRepository, UrlGeneratorInterface $urlGenerator): JsonResponse
    {
        $this->denyAccessUnlessGranted(BoardVoter::EDIT, $board);

        $data = json_decode($request->getContent(), true);
        if (!isset($data['items'])) {
            return $this->json(['status' => 'error', 'message' => 'Invalid data'], Response::HTTP_BAD_REQUEST);
        }

        $incomingItemsData = $data['items'];
        $existingItems = $board->getItems()->toArray();
        $existingItemsById = [];
        foreach ($existingItems as $item) {
            $existingItemsById[$item->getId()] = $item;
        }

        $processedIds = [];
        $responseItems = [];

        foreach ($incomingItemsData as $itemData) {
            $itemId = $itemData['id'];
            $tempId = null;
            $boardItem = null;

            if (is_numeric($itemId) && isset($existingItemsById[$itemId])) {
                $boardItem = $existingItemsById[$itemId];
                $processedIds[] = (int)$itemId;
            } else {
                $boardItem = new BoardItem();
                $boardItem->setBoard($board);
                $entityManager->persist($boardItem);
                $board->addItem($boardItem);
                $tempId = $itemId;
            }

            $boardItem->setType($itemData['type']);
            $boardItem->setPosX((int)$itemData['x']);
            $boardItem->setPosY((int)$itemData['y']);
            $boardItem->setWidth((int)$itemData['width']);
            $boardItem->setHeight((int)$itemData['height']);
            $boardItem->setZIndex((int)($itemData['zIndex'] ?? 0)); // Save zIndex
            $boardItem->setContent($itemData['content']);

            // We need to flush here to get the new ID for new items
            $entityManager->flush();

            $content = $boardItem->getContent();
            if ($boardItem->getType() === 'asset' && isset($content['assetId'])) {
                $content['thumbnailUrl'] = $urlGenerator->generate('asset_thumbnail_by_id', ['id' => $content['assetId']]);
            }

            $responseItem = [
                'id' => $boardItem->getId(),
                'type' => $boardItem->getType(),
                'pos_x' => $boardItem->getPosX(),
                'pos_y' => $boardItem->getPosY(),
                'width' => $boardItem->getWidth(),
                'height' => $boardItem->getHeight(),
                'content' => $content,
                'zIndex' => $boardItem->getZIndex(),
            ];
            if ($tempId) {
                $responseItem['tempId'] = $tempId;
            }
            $responseItems[] = $responseItem;
        }

        foreach ($existingItemsById as $id => $itemToRemove) {
            if (!in_array($id, $processedIds, true)) {
                $board->removeItem($itemToRemove);
                $entityManager->remove($itemToRemove);
            }
        }

        $entityManager->flush();

        return $this->json($responseItems);
    }
}
