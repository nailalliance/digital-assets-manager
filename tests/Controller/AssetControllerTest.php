<?php

namespace App\Tests\Controller;

use App\Controller\AssetController;
use App\Entity\Assets\Assets;
use App\Entity\User;
use App\Service\EditorFontCatalog;
use App\Service\ImageProcessorService;
use Doctrine\ORM\EntityManagerInterface;
use PHPUnit\Framework\MockObject\MockObject;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Symfony\Bundle\FrameworkBundle\Test\TestBrowserToken;
use Symfony\Component\HttpFoundation\Response;
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

        static::getContainer()->get('security.untracked_token_storage')->setToken(null);
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

    public function testIndexShowsClipPathSelectForJpegAssets(): void
    {
        $controller = $this->createController();
        $response = $controller->index($this->createAsset(142, 'image/jpeg'), $this->createMock(EntityManagerInterface::class));

        $this->assertSame(200, $response->getStatusCode());
        $this->assertStringContainsString('Use JPG Clip Path if Available', $response->getContent());
        $this->assertStringContainsString('Clip Path', $response->getContent());
    }

    public function testIndexOmitsClipPathSelectForNonJpegImages(): void
    {
        $controller = $this->createController();
        $response = $controller->index($this->createAsset(143, 'image/png'), $this->createMock(EntityManagerInterface::class));

        $this->assertSame(200, $response->getStatusCode());
        $this->assertStringNotContainsString('Use JPG Clip Path if Available', $response->getContent());
        $this->assertStringNotContainsString('Clip Path', $response->getContent());
    }

    public function testEditorRendersForSupportedImages(): void
    {
        $controller = $this->createController();
        $response = $controller->editor(
            $this->createAsset(91, 'image/webp'),
            static::getContainer()->get(EditorFontCatalog::class)
        );

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

        $response = $controller->editor(
            $this->createAsset(105, 'application/pdf'),
            static::getContainer()->get(EditorFontCatalog::class)
        );

        $this->assertSame(302, $response->getStatusCode());
        $this->assertSame('/assets/105', $response->headers->get('Location'));
        $this->assertSame(
            ['This asset type is not supported by the canvas editor yet.'],
            $request->getSession()->getFlashBag()->peek('warning')
        );
    }

    public function testDownloadWebUsesLargestClipPathForJpegWhenRequested(): void
    {
        self::bootKernel();
        $this->authenticateTestUser();

        $controller = new AssetController();
        $controller->setContainer(static::getContainer());

        $asset = $this->createAsset(188, 'image/jpeg');
        $imageProcessor = $this->createMock(ImageProcessorService::class);
        $imageProcessor
            ->expects($this->once())
            ->method('exportFile')
            ->with('/tmp/editor-test', 1500, 1500, 0, 'jpg', true)
            ->willReturn('jpeg-binary');

        $request = new Request([
            'web_download' => [
                'size' => '1500',
                'padding' => 'no',
                'format' => 'jpg',
                'clipPathMode' => 'largest',
            ],
        ]);

        $response = $controller->downloadWeb($asset, $request, $imageProcessor);

        $this->assertInstanceOf(Response::class, $response);
        $this->assertSame(200, $response->getStatusCode());
        $this->assertSame('jpeg-binary', $response->getContent());
        $this->assertSame('image/jpg', $response->headers->get('Content-Type'));
    }

    public function testDownloadWebUsesDefaultProcessingForNonJpegAssets(): void
    {
        self::bootKernel();
        $this->authenticateTestUser();

        $controller = new AssetController();
        $controller->setContainer(static::getContainer());

        $asset = $this->createAsset(189, 'image/png');
        $imageProcessor = $this->createMock(ImageProcessorService::class);
        $imageProcessor
            ->expects($this->once())
            ->method('exportFile')
            ->with('/tmp/editor-test', 2000, 2000, 50, 'png', false)
            ->willReturn('png-binary');

        $request = new Request([
            'web_download' => [
                'size' => '2000',
                'padding' => 'yes',
                'format' => 'png',
                'clipPathMode' => 'largest',
            ],
        ]);

        $response = $controller->downloadWeb($asset, $request, $imageProcessor);

        $this->assertInstanceOf(Response::class, $response);
        $this->assertSame(200, $response->getStatusCode());
        $this->assertSame('png-binary', $response->getContent());
        $this->assertSame('image/png', $response->headers->get('Content-Type'));
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

    private function authenticateTestUser(): void
    {
        $user = (new User())
            ->setId(1)
            ->setMyNailAllianceId(1)
            ->setUsername('asset-controller-test')
            ->setName('Asset Controller Test')
            ->setRoles(['ROLE_USER']);

        static::getContainer()->get('security.untracked_token_storage')->setToken(
            new TestBrowserToken($user->getRoles(), $user, 'main')
        );
    }
}
