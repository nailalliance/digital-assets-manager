<?php

namespace App\Tests\Security;

use App\Entity\ApiToken;
use App\Entity\ApiTokenFor;
use App\Entity\User;
use App\Repository\ApiTokenRepository;
use App\Security\ApiTokenAuthenticator;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;

final class ApiTokenAuthenticatorTest extends TestCase
{
    public function testAdminServiceTokenCanAuthenticateAdminApiRequest(): void
    {
        $token = $this->token(ApiTokenFor::ADMIN);
        $repository = $this->repositoryFor('raw-token', $token);
        $authenticator = new ApiTokenAuthenticator($repository);

        $passport = $authenticator->authenticate(
            $this->request('/api/admin/categories', 'raw-token')
        );

        self::assertInstanceOf(SelfValidatingPassport::class, $passport);
    }

    public function testAdobeServiceTokenCannotAuthenticateAdminApiRequest(): void
    {
        $token = $this->token(ApiTokenFor::ADOBE);
        $repository = $this->repositoryFor('raw-token', $token);
        $authenticator = new ApiTokenAuthenticator($repository);

        $this->expectException(
            CustomUserMessageAuthenticationException::class
        );
        $this->expectExceptionMessage('An admin service token is required');

        $authenticator->authenticate(
            $this->request('/api/admin/categories', 'raw-token')
        );
    }

    private function token(ApiTokenFor $service): ApiToken
    {
        $owner = (new User())
            ->setUsername('service-owner@example.test')
            ->setRoles(['ROLE_SUPER_ADMIN']);

        return (new ApiToken($owner))->setService($service);
    }

    private function repositoryFor(
        string $rawToken,
        ApiToken $token
    ): ApiTokenRepository {
        $repository = $this->createMock(ApiTokenRepository::class);
        $repository->expects(self::once())
            ->method('findOneBy')
            ->with(['token' => hash('sha256', $rawToken)])
            ->willReturn($token);

        return $repository;
    }

    private function request(string $path, string $token): Request
    {
        $request = Request::create($path);
        $request->headers->set('X-AUTH-TOKEN', $token);

        return $request;
    }
}
