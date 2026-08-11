<?php

namespace App\Controller\Admin;

use App\Entity\SiteNotification;
use App\Form\SiteNotificationType;
use App\Repository\SiteNotificationRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Clock\ClockInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/admin/notifications')]
#[IsGranted('ROLE_FTP_ADMIN')]
final class SiteNotificationController extends AbstractController
{
    #[Route('/', name: 'admin_notifications_index', methods: ['GET'])]
    public function index(SiteNotificationRepository $notificationRepository, ClockInterface $clock): Response
    {
        return $this->render('admin/notifications/index.html.twig', [
            'notifications' => $notificationRepository->findBy([], ['startsAt' => 'DESC']),
            'now' => $clock->now()->setTimezone(new \DateTimeZone('UTC')),
        ]);
    }

    #[Route('/new', name: 'admin_notifications_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager, ClockInterface $clock): Response
    {
        $now = $clock->now()->setTimezone(new \DateTimeZone('UTC'));
        $notification = (new SiteNotification())
            ->setStartsAt($now)
            ->setEndsAt($now->modify('+1 day'));
        $form = $this->createForm(SiteNotificationType::class, $notification);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($notification);
            $entityManager->flush();

            $this->addFlash('success', 'Notification created.');

            return $this->redirectToRoute('admin_notifications_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('admin/notifications/new.html.twig', [
            'form' => $form,
        ]);
    }

    #[Route('/{id}/edit', name: 'admin_notifications_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, SiteNotification $notification, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(SiteNotificationType::class, $notification);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            $this->addFlash('success', 'Notification updated.');

            return $this->redirectToRoute('admin_notifications_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('admin/notifications/edit.html.twig', [
            'notification' => $notification,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'admin_notifications_delete', methods: ['POST'])]
    public function delete(Request $request, SiteNotification $notification, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete-notification-'.$notification->getId(), $request->request->getString('_token'))) {
            $entityManager->remove($notification);
            $entityManager->flush();
            $this->addFlash('success', 'Notification deleted.');
        }

        return $this->redirectToRoute('admin_notifications_index', [], Response::HTTP_SEE_OTHER);
    }
}
