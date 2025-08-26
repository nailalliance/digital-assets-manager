<?php

namespace App\Security;

use App\Entity\User; // Assuming your User entity is in this namespace
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class SsoTokenAuthenticator extends AbstractAuthenticator
{
    public function __construct(
        private readonly EntityManagerInterface $entityManager,
        private readonly UrlGeneratorInterface $urlGenerator,
        private KernelInterface $kernel
    ) {
    }

    /**
     * Called on every request to decide if this authenticator should be used.
     */
    public function supports(Request $request): ?bool
    {
        // This authenticator only activates if the 'sso_token' query parameter is present
        return $request->query->has('sso_token');
    }

    /**
     * The core authentication logic.
     */
    public function authenticate(Request $request): Passport
    {
        $ssoToken = $request->query->get('sso_token');
        if (null === $ssoToken) {
            throw new AuthenticationException('No SSO token provided.');
        }

        try {
            $httpClientParams = [];

            if ($this->kernel->getEnvironment() === 'dev') {
                $httpClientParams = [
                    'verify_peer' => false,
                    'verify_host' => false,
                ];
            }

            $httpClient = HttpClient::create($httpClientParams);

            // Make a server-to-server call to Project 2 to validate the token
            $response = $httpClient->request('POST', $_ENV['MYNAILALLIANCE_URL'] . '/api/validate-sso-token', [
                'headers' => [
                    // This API key must match the one expected by Project 2
                    'X-API-KEY' => $_ENV['SSO_API_KEY'],
                ],
                'json' => ['sso_token' => $ssoToken],
            ]);

            if ($response->getStatusCode() !== 200) {
                throw new AuthenticationException('SSO token is invalid or expired.');
            }

            $userData = $response->toArray();

        } catch (\Exception $e) {
            throw new AuthenticationException('Failed to validate SSO token.');
        }

        // Create a Passport. The UserBadge contains the logic to load or create the user.
        return new SelfValidatingPassport(
            new UserBadge($userData['user'], function ($userIdentifier) use ($userData) {
                // 1. Try to find the user in Project 1's database by email
                /** @var \App\Entity\User $userEntity */
                $userEntity = $this->entityManager->getRepository(\App\Entity\User::class)->find($userData['id']);

                if (empty($userEntity)) {
                    $userEntity = new \App\Entity\User();
                    $userEntity->setId($userData['id']);
                }

                $userEntity->setUsername($userIdentifier)
                    ->setRoles($userData['roles'])
                    ->setName($userData['name'])
                ;
                $this->entityManager->persist($userEntity);
                $this->entityManager->flush();

                // $user = new User();
                // $user->setId($userData['id']);
                // $user->setUsername($identifier);
                // $user->setRoles($userData['roles']);
                return $userEntity;
            })
        );
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        // On success, redirect to the homepage.
        // You could also redirect to a "target path" if one is stored in the session.
        return new RedirectResponse($this->urlGenerator->generate('home'));
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
    {
        // Handle the authentication failure. You could redirect to a login page with an error.
        $request->getSession()->getFlashBag()->add('error', 'Single Sign-On failed. Please try again.');

        return new RedirectResponse($this->urlGenerator->generate('app_login')); // Assuming you have a standard login route
    }
}
