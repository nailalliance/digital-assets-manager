<?php

namespace App\Controller\Download;

use App\Entity\Downloads\Lists;
use App\Repository\Downloads\ListsRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/download/lists')]
final class ListsController extends AbstractController
{
    #[Route('/', name: 'app_download_lists')]
    public function index(Request $request, ListsRepository $listsRepository): Response
    {
        $query = $request->query->get('q', '');
        $offset = max(0, $request->query->getInt('offset', 0));

        $paginator = $listsRepository->findPaginated($query, $offset);

        return $this->render('download/lists/index.html.twig', [
            'lists' => $paginator,
            'previous' => $offset - ListsRepository::PAGINATOR_PER_PAGE,
            'next' => min(count($paginator), $offset + ListsRepository::PAGINATOR_PER_PAGE),
            'query' => $query,
        ]);
    }

    #[Route('/{id}/rename', name: 'app_download_lists_rename', methods: ['POST'])]
    #[IsGranted('ROLE_FTP_DESIGNER')]
    public function rename(Request $request, Lists $list, EntityManagerInterface $entityManager): Response
    {
        $newName = $request->request->get('name');
        if ($this->isCsrfTokenValid('rename'.$list->getId(), $request->request->get('_token')) && !empty($newName))
        {
            $list->setName($newName);
            $entityManager->persist($list);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_download_lists');
    }

    #[Route('/{id}/update-expiration', name: 'app_download_lists_update_expiration', methods: ['POST'])]
    #[IsGranted('ROLE_FTP_DESIGNER')]
    public function updateExpiration(Request $request, Lists $list, EntityManagerInterface $entityManager): Response
    {
        $oneTimeLink = $list->getOneTimeLinks()->first();
        $newDateString = $request->request->get('expirationDate');

        if ($oneTimeLink && $this->isCsrfTokenValid('expire'.$list->getId(), $request->request->get('_token')) && !empty($newDateString)) {
            $newDate = new \DateTimeImmutable($newDateString);
            $today = new \DateTimeImmutable('today');
            $maxDate = new \DateTimeImmutable('+30 days');

            // Validate the date is within the allowed range
            if ($newDate >= $today && $newDate <= $maxDate) {
                $oneTimeLink->setExpirationDate($newDate);
                $entityManager->persist($oneTimeLink);
                $entityManager->flush();
            }
        }

        return $this->redirectToRoute('app_download_lists');
    }

    #[Route('/{id}/delete', name: 'app_download_lists_delete', methods: ['POST'])]
    #[IsGranted('ROLE_FTP_ADMIN')]
    public function delete(Request $request, Lists $list, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$list->getId(), $request->request->get('_token')) && !empty($list->getId()))
        {
            $entityManager->remove($list);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_download_lists');
    }

    #[Route('/{id}/hide', name: 'app_download_lists_hide', methods: ['POST'])]
    #[IsGranted('ROLE_FTP_DESIGNER')]
    public function hide(Request $request, Lists $list, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('hide'.$list->getId(), $request->request->get('_token'))) {
            // Instead of removing, set the status to false
            $list->setStatus(false);
            $entityManager->persist($list);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_download_lists');
    }
}
