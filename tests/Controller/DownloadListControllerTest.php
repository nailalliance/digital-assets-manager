<?php

namespace App\Tests\Controller;

use App\Controller\DownloadListController;
use App\Entity\Assets\Assets;
use App\Service\CanvasEditorScriptRenderer;
use App\Service\DownloadListService;
use App\Service\DownloadProgressService;
use App\Service\ZipDownloadResponseFactory;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\HttpFoundation\Session\Storage\MockArraySessionStorage;

class DownloadListControllerTest extends KernelTestCase
{
    protected function tearDown(): void
    {
        parent::tearDown();

        $requestStack = static::getContainer()->get('request_stack');
        while (null !== $requestStack->getCurrentRequest()) {
            $requestStack->pop();
        }
    }

    public function testIndexShowsApplyScriptToBagActionAndInitialDraft(): void
    {
        self::bootKernel();

        $downloadListService = $this->createMock(DownloadListService::class);
        $downloadListService
            ->expects($this->once())
            ->method('getAssets')
            ->willReturn([$this->createAsset(11, 'image/png')]);

        $session = new Session(new MockArraySessionStorage());
        $session->set('download_list_script_draft', '{"version":1}');
        $request = new Request();
        $request->setSession($session);
        static::getContainer()->get('request_stack')->push($request);

        $controller = $this->createController();
        $response = $controller->index($downloadListService, static::getContainer()->get('request_stack'));

        $this->assertSame(200, $response->getStatusCode());
        $this->assertStringContainsString('Apply Script to Bag', $response->getContent());
        $this->assertStringContainsString('data-download-bag-script-initial-script-value="&#x7B;&quot;version&quot;&#x3A;1&#x7D;"', $response->getContent());
        $this->assertNull($session->get('download_list_script_draft'));
    }

    public function testScriptedZipRedirectsBackWithFlashWhenScriptIsInvalid(): void
    {
        self::bootKernel();

        $downloadListService = $this->createMock(DownloadListService::class);
        $downloadListService
            ->expects($this->once())
            ->method('getAssets')
            ->willReturn([$this->createAsset(19, 'image/jpeg')]);

        $request = new Request([], ['script' => '{bad json']);
        $request->setSession(new Session(new MockArraySessionStorage()));
        static::getContainer()->get('request_stack')->push($request);

        $controller = $this->createController();
        $response = $controller->scriptedZip(
            $request,
            $downloadListService,
            $this->createMock(EntityManagerInterface::class),
            new ZipDownloadResponseFactory(),
            new CanvasEditorScriptRenderer(new Filesystem(), static::getContainer()->get('parameter_bag')),
            new DownloadProgressService(new Filesystem())
        );

        $this->assertSame(302, $response->getStatusCode());
        $this->assertSame('/download-list/', $response->headers->get('Location'));
        $this->assertSame('{bad json', $request->getSession()->get('download_list_script_draft'));
        $this->assertSame(
            ['The script is not valid JSON.'],
            $request->getSession()->getFlashBag()->peek('error')
        );
    }

    private function createController(): DownloadListController
    {
        $controller = new DownloadListController();
        $controller->setContainer(static::getContainer());

        return $controller;
    }

    private function createAsset(int $id, string $mimeType): Assets
    {
        $asset = new Assets();
        $asset->setName('Download Bag Asset');
        $asset->setMimeType($mimeType);
        $asset->setFilePath('/tmp/download-bag-asset');
        $asset->setFileSize(1024);

        $reflection = new \ReflectionProperty($asset, 'id');
        $reflection->setValue($asset, $id);

        return $asset;
    }
}
