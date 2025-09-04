<?php

namespace App\Security;

use App\Service\UserPorter;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Http\Authenticator\AbstractLoginFormAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\CsrfTokenBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\RememberMeBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;
use Symfony\Component\Security\Http\SecurityRequestAttributes;
use Symfony\Component\Security\Http\Util\TargetPathTrait;

class LoginAuthenticator extends AbstractLoginFormAuthenticator
{
    use TargetPathTrait;

    public function __construct(
        private UrlGeneratorInterface $urlGenerator,
        private KernelInterface $kernel,
        private UserPorter $userPorter,
    )
    {
    }
    /**
     * @inheritDoc
     */
    protected function getLoginUrl(Request $request): string
    {
        return $this->urlGenerator->generate('app_login');
    }

    /**
     * @inheritDoc
     */
    public function authenticate(Request $request): Passport
    {
        $credentials = [
            'username' => $request->request->get('_username', ''),
            'password' => $request->request->get('_password', ''),
            'csrf_token' => $request->request->get('_csrf_token'),
        ];

        $request->getSession()->set(
            SecurityRequestAttributes::LAST_USERNAME,
            $credentials['username']
        );

        try {
            $httpClientParams = [];

            if ($this->kernel->getEnvironment() === 'dev') {
                $httpClientParams = [
                    'verify_peer' => false,
                    'verify_host' => false,
                ];
            }

            $httpClient = HttpClient::create($httpClientParams);

            $myNAUserReq = $httpClient->request('POST', $_ENV['MYNAILALLIANCE_URL'] . '/remote/login', [
                'json' => [
                    'security' => [
                        'credentials' => [
                            'login' => $credentials['username'],
                            'password' => $credentials['password'],
                        ]
                    ]
                ]
            ]);

            if ($myNAUserReq->getStatusCode() !== 200) {
                throw new AuthenticationException('Incorrect username or password');
            }

            $myNAUser = $myNAUserReq->toArray();

        } catch (\Exception $e) {
            throw new AuthenticationException('Failed to validate SSO token.');
        }

        $passport = new SelfValidatingPassport(
            new UserBadge($credentials['username'], function ($identifier) use ($myNAUser) {
                return $this->userPorter->port($myNAUser);
            }),
            [
                new CsrfTokenBadge('authenticate', $credentials['csrf_token']),
                new RememberMeBadge(),
            ]
        );

        return $passport;
    }

    /**
     * @inheritDoc
     */
    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        // 3. Check for a saved target path
        if ($targetPath = $this->getTargetPath($request->getSession(), $firewallName)) {
            return new RedirectResponse($targetPath);
        }

        // 4. If no target path, redirect to a default route
        return new RedirectResponse($this->urlGenerator->generate('home'));
    }
}
