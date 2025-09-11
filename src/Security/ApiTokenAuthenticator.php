<?php

namespace App\Security;

use App\Repository\ApiTokenRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;

class ApiTokenAuthenticator extends AbstractAuthenticator
{
    public function __construct(
        private ApiTokenRepository $apiTokenRepository
    )
    {}

    /**
     * @inheritDoc
     */
    public function supports(Request $request): ?bool
    {
        return str_starts_with($request->getPathInfo(), '/api/') && $request->headers->has('X-AUTH-TOKEN');
        // var_dump($request->headers);
        // die();
        // return $request->headers->has('Authorization');
    }

    /**
     * @inheritDoc
     */
    public function authenticate(Request $request): Passport
    {
        // $authorizationHeader = $request->headers->get('Authorization');
        // $apiToken = str_replace('Bearer ', '', $authorizationHeader);
        $authorizationHeader = $request->headers->get('X-AUTH-TOKEN');
        $apiToken = $authorizationHeader;

        if (empty($apiToken)) {
            throw new CustomUserMessageAuthenticationException('Missing authorization header');
        }

        $tokenEntity = $this->apiTokenRepository->findOneBy(['token' => hash('sha256', $apiToken)]);

        if (!$tokenEntity) {
            throw new CustomUserMessageAuthenticationException('Invalid API token');
        }

        return new SelfValidatingPassport(
            new UserBadge($tokenEntity->getOwner()->getUserIdentifier())
        );
    }

    /**
     * @inheritDoc
     */
    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        return null;
    }

    /**
     * @inheritDoc
     */
    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
    {
        return new Response('Authentication Failed', Response::HTTP_UNAUTHORIZED);
    }
}
