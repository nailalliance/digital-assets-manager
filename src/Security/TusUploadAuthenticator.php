<?php

namespace App\Security;

use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;

final class TusUploadAuthenticator extends AbstractAuthenticator
{
    public function __construct(
        private readonly TusUploadTokenManager $tokenManager,
        private readonly UserRepository $userRepository,
    ) {
    }

    public function supports(Request $request): ?bool
    {
        return $request->headers->has('X-UPLOAD-AUTH');
    }

    public function authenticate(Request $request): Passport
    {
        $token = $request->headers->get('X-UPLOAD-AUTH');
        if (empty($token)) {
            throw new CustomUserMessageAuthenticationException('Missing upload authentication token.');
        }

        $userId = $this->tokenManager->validate($token);
        if ($userId === null) {
            throw new CustomUserMessageAuthenticationException('Invalid or expired upload authentication token.');
        }

        return new SelfValidatingPassport(
            new UserBadge((string) $userId, fn (string $identifier) => $this->userRepository->find((int) $identifier))
        );
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        return null;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
    {
        return new Response('Authentication Failed', Response::HTTP_UNAUTHORIZED);
    }
}
