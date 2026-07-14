<?php

namespace App\Tests\Controller;

use App\Controller\AssetController;
use App\Entity\Assets\Assets;
use Doctrine\ORM\EntityManagerInterface;
use PHPUnit\Framework\MockObject\MockObject;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\HttpFoundation\Session\Storage\MockArraySessionStorage;

class AssetControllerTest extends KernelTestCase
{
    protected function tearDown(): void
    {
        parent::tearDown();

        $requestStack = static::getContainer()->get('request_stack');
        while (null !== $requestStack->getCurrentRequest()) {
            $requestStack->pop();
        }
    }

    public function testIndexShowsEditImageCallToActionForSupportedImages(): void
    {
        $controller = $this->createController();
        $response = $controller->index($this->createAsset(42, 'image/png'), $this->createMock(EntityManagerInterface::class));

        $this->assertSame(200, $response->getStatusCode());
        $this->assertStringContainsString('Edit Image', $response->getContent());
        $this->assertStringContainsString('/assets/42/editor', $response->getContent());
    }

    public function testIndexOmitsEditImageCallToActionForUnsupportedAssets(): void
    {
        $controller = $this->createController();
        $response = $controller->index($this->createAsset(77, 'application/pdf'), $this->createMock(EntityManagerInterface::class));

        $this->assertSame(200, $response->getStatusCode());
        $this->assertStringNotContainsString('/assets/77/editor', $response->getContent());
        $this->assertStringNotContainsString('Edit Image', $response->getContent());
    }

    public function testEditorRendersForSupportedImages(): void
    {
        $controller = $this->createController();
        $response = $controller->editor($this->createAsset(91, 'image/webp'));

        $this->assertSame(200, $response->getStatusCode());
        $this->assertStringContainsString('data-controller="image-editor"', $response->getContent());
        $this->assertStringContainsString('/asset/91/stream', $response->getContent());
    }

    public function testEditorRedirectsUnsupportedAssetsBackToAssetPage(): void
    {
        $controller = $this->createController();
        $request = new Request();
        $request->setSession(new Session(new MockArraySessionStorage()));
        static::getContainer()->get('request_stack')->push($request);

        $response = $controller->editor($this->createAsset(105, 'application/pdf'));

        $this->assertSame(302, $response->getStatusCode());
        $this->assertSame('/assets/105', $response->headers->get('Location'));
        $this->assertSame(
            ['This asset type is not supported by the canvas editor yet.'],
            $request->getSession()->getFlashBag()->peek('warning')
        );
    }

    private function createController(): AssetController
    {
        self::bootKernel();

        $controller = new AssetController();
        $controller->setContainer(static::getContainer());

        return $controller;
    }

    private function createAsset(int $id, string $mimeType): Assets
    {
        $asset = new Assets();
        $asset->setName('Editor Test Asset');
        $asset->setMimeType($mimeType);
        $asset->setFilePath('/tmp/editor-test');
        $asset->setFileSize(1024);

        $reflection = new \ReflectionProperty($asset, 'id');
        $reflection->setValue($asset, $id);

        return $asset;
    }
}
