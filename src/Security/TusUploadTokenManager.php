<?php

namespace App\Security;

use App\Entity\User;

final readonly class TusUploadTokenManager
{
    private const TTL_SECONDS = 3600;

    public function __construct(
        private string $appSecret
    ) {
    }

    public function createForUser(User $user): string
    {
        $payload = $this->encode([
            'uid' => $user->getId(),
            'exp' => time() + self::TTL_SECONDS,
        ]);

        $signature = $this->sign($payload);

        return $payload . '.' . $signature;
    }

    public function validate(string $token): ?int
    {
        $parts = explode('.', $token, 2);
        if (count($parts) !== 2) {
            return null;
        }

        [$payload, $signature] = $parts;

        if (!hash_equals($this->sign($payload), $signature)) {
            return null;
        }

        $data = $this->decode($payload);
        if (!is_array($data) || !isset($data['uid'], $data['exp'])) {
            return null;
        }

        if (!is_numeric($data['uid']) || !is_numeric($data['exp'])) {
            return null;
        }

        if ((int) $data['exp'] < time()) {
            return null;
        }

        return (int) $data['uid'];
    }

    private function sign(string $payload): string
    {
        return $this->base64UrlEncode(hash_hmac('sha256', $payload, $this->appSecret, true));
    }

    private function encode(array $payload): string
    {
        return $this->base64UrlEncode((string) json_encode($payload, JSON_THROW_ON_ERROR));
    }

    private function decode(string $payload): ?array
    {
        $decoded = $this->base64UrlDecode($payload);
        if ($decoded === null) {
            return null;
        }

        try {
            $data = json_decode($decoded, true, 512, JSON_THROW_ON_ERROR);
        } catch (\JsonException) {
            return null;
        }

        return is_array($data) ? $data : null;
    }

    private function base64UrlEncode(string $data): string
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    private function base64UrlDecode(string $data): ?string
    {
        $decoded = base64_decode(strtr($data, '-_', '+/') . str_repeat('=', (4 - strlen($data) % 4) % 4), true);

        return $decoded === false ? null : $decoded;
    }
}
