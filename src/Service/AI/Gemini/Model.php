<?php

namespace App\Service\AI\Gemini;

use App\Service\AI\BrandEnum;
use App\Service\AI\ModelInterface;
use Gemini;
use Gemini\Client;
use Gemini\Data\Content;
use Gemini\Data\GenerationConfig;
use Gemini\Enums\ResponseModality;
use Gemini\Enums\Role;
use Gemini\Resources\GenerativeModel;
use function file_get_contents;
use const DIRECTORY_SEPARATOR;

class Model implements ModelInterface
{
    const GEMINI_2_0_FLASH = 'gemini-2.0-flash';
    const GEMINI_2_5_FLASH_IMAGE = 'gemini-2.5-flash-image';
    const GEMINI_2_5_PRO = 'gemini-2.5-pro';

    private Client $client;

    public function __construct(
        string $geminiApiKey,
        private readonly string $cagDir
    )
    {
        $this->client = Gemini::client($geminiApiKey);
    }

    public function createTextModelWithCachedContentFor(BrandEnum $brand): GenerativeModel
    {
        $cache = file_get_contents($this->cagDir . DIRECTORY_SEPARATOR . $brand->value);

        $cachedContent = $this->client->cachedContents()->create(
            model: self::GEMINI_2_0_FLASH,
            ttl: '300s',
            displayName: $brand->name,
            parts: Content::parse(part: $cache, role: Role::USER)
        );

        return $this->client->generativeModel(self::GEMINI_2_0_FLASH)
            ->withCachedContent($cachedContent->cachedContent->name)
            ->withGenerationConfig($this->getTextConfig());
    }

    public function createTextModel(): GenerativeModel
    {
        return $this->client->generativeModel(self::GEMINI_2_0_FLASH)
            ->withGenerationConfig($this->getTextConfig());
    }

    public function createTextProModelWithCachedContentFor(BrandEnum $brand): GenerativeModel
    {
        $cache = file_get_contents($this->cagDir . DIRECTORY_SEPARATOR . $brand->value);

        $cachedContent = $this->client->cachedContents()->create(
            model: self::GEMINI_2_5_PRO,
            ttl: '300s',
            displayName: $brand->name,
            parts: Content::parse(part: $cache, role: Role::USER)
        );

        return $this->client->generativeModel(self::GEMINI_2_5_PRO)
            ->withCachedContent($cachedContent->cachedContent->name)
            ->withGenerationConfig($this->getTextConfig());
    }

    public function createImageModel(): GenerativeModel
    {
        return $this->client->generativeModel(self::GEMINI_2_0_FLASH)
            ->withGenerationConfig($this->getTextConfig());
    }

    private function getTextConfig(): GenerationConfig
    {
        return new GenerationConfig(
            maxOutputTokens: 800,
            temperature: 1,
            topP: 0.8,
            topK: 10,
            responseModalities: [ResponseModality::TEXT]
        );
    }

    private function getImageConfig(): GenerationConfig
    {
        return new GenerationConfig(
            maxOutputTokens: 800,
            temperature: 1,
            topP: 0.8,
            topK: 10,
            responseModalities: [
                ResponseModality::TEXT,
                ResponseModality::IMAGE
            ]
        );
    }
}
