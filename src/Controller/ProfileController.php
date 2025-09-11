<?php

namespace App\Controller;

use App\Entity\ApiToken;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[IsGranted('IS_AUTHENTICATED_FULLY')]
class ProfileController extends AbstractController
{
    #[Route('/profile', name: 'app_profile')]
    public function index(): Response
    {
        return $this->render('profile/index.html.twig');
    }

    #[Route('/profile/api-tokens', name: 'app_profile_api_token_create', methods: ['POST'])]
    public function createApiToken(EntityManagerInterface $entityManager): Response
    {
        /** @var User $user */
        $user = $this->getUser();
        $token = new ApiToken($user);
        $tokenString = bin2hex(random_bytes(32));
        $token->setToken(hash('sha256', $tokenString));

        $imageTokenString = bin2hex(random_bytes(16));
        $token->setImageToken($imageTokenString);

        $entityManager->persist($token);
        $entityManager->flush();

        $this->addFlash('success', 'New API token generated successfully. Store it securely, as you will not be able to see it again.');
        $this->addFlash('new_api_token', $tokenString);

        return $this->redirectToRoute('app_profile');
    }
}
