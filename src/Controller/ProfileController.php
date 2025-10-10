<?php

namespace App\Controller;

use App\Entity\ApiToken;
use App\Entity\ApiTokenFor;
use App\Entity\User;
use App\Form\UserApiTokenType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[IsGranted('IS_AUTHENTICATED_FULLY')]
class ProfileController extends AbstractController
{
    #[Route('/profile', name: 'app_profile')]
    public function index(): Response
    {
        $apiTokens = [
            ApiTokenFor::ADOBE->value,
        ];

        if ($this->isGranted('ROLE_ADMIN')) {
            $apiTokens[] = ApiTokenFor::ADMIN->value;
        }

        return $this->render('profile/index.html.twig', [
            'apiTokens' => $apiTokens,
        ]);
    }

    #[Route('/profile/api-tokens/{tokenFor}', name: 'app_profile_api_token_create', methods: ['POST'])]
    public function createApiToken(EntityManagerInterface $entityManager, string $tokenFor): Response
    {
        /** @var User $user */
        $user = $this->getUser();

        try {
            $apiTokenFor = ApiTokenFor::from($tokenFor);
        } catch (\Exception $e) {
            throw $this->createAccessDeniedException();
        }

        if (!$this->isGranted('ROLE_ADMIN') && $apiTokenFor == ApiTokenFor::ADMIN) {
            throw $this->createAccessDeniedException();
        }

        $token = $entityManager->getRepository(ApiToken::class)->findOneBy([
            'owner' => $user,
            'service' => $apiTokenFor->value,
        ]);

        if (empty($token)) {
            $token = new ApiToken($user);
        }

        $tokenString = bin2hex(random_bytes(32));
        $token->setToken(hash('sha256', $tokenString));

        $imageTokenString = bin2hex(random_bytes(16));
        $token->setImageToken($imageTokenString);

        $token->setService($apiTokenFor);

        $entityManager->persist($token);
        $entityManager->flush();

        $this->addFlash('success', 'New API token generated successfully. Store it securely, as you will not be able to see it again.');
        $this->addFlash('new_api_token', $tokenString);

        return $this->redirectToRoute('app_profile');
    }
}
