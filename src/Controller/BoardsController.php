<?php

namespace App\Controller;

use App\Entity\Boards\Board;
use App\Entity\User;
use App\Form\BoardType;
use App\Repository\Assets\AssetsRepository;
use App\Repository\Boards\BoardRepository;
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
            $user = $entityManager->getRepository(User::class)->find($this->getUser());
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
    #[IsGranted('ROLE_FTP_DESIGNER')]
    public function show(Board $board): Response
    {
        return $this->render('boards/show.html.twig', [
            'board' => $board,
        ]);
    }

    #[Route('/assets/search', name: 'app_boards_asset_search', methods: ['GET'])]
    public function searchAssets(Request $request, SearchService $searchService, UrlGeneratorInterface $urlGenerator): JsonResponse
    {
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
}
