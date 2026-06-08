<?php

namespace App\Security\RequestMatcher;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestMatcherInterface;

final class TusUploadRequestMatcher implements RequestMatcherInterface
{
    public function matches(Request $request): bool
    {
        if (!in_array($request->getMethod(), ['POST', 'HEAD', 'PATCH', 'DELETE', 'OPTIONS'], true)) {
            return false;
        }

        $path = $request->getPathInfo();

        return preg_match('#^/admin/assets(?:/\d+)?/upload(?:/.*)?$#', $path) === 1
            || preg_match('#^/admin/direct-share/upload(?:/.*)?$#', $path) === 1;
    }
}
