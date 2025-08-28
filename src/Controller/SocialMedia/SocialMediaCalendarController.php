<?php

namespace App\Controller\SocialMedia;

use App\Repository\Assets\BrandsRepository;
use App\Repository\SocialMedia\PostsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/admin/social-calendar')]
class SocialMediaCalendarController extends AbstractController
{
    #[Route('/', name: 'admin_social_calendar_index')]
    public function index(BrandsRepository $brands): Response
    {
        $parentBrands = $brands->findBy(['brands' => null]);

        return $this->render('admin/social_media_calendar/index.html.twig', [
            'brands' => $parentBrands,
        ]);
    }

    #[Route('/feed', name: 'admin_social_calendar_feed')]
    public function feed(Request $request, PostsRepository $postsRepository): JsonResponse
    {
        $brandId = $request->query->get('brand_id');
        $start = new \DateTimeImmutable($request->query->get('start'));
        $end = new \DateTimeImmutable($request->query->get('end'));

        $posts = [];

        if ($this->isGranted('ROLE_FTP_SM_MANAGER'))
        {
            $posts = $postsRepository->findAllByBrand($brandId, $start, $end);
        } elseif ($this->isGranted('ROLE_FTP_SM_USER')) {
            $posts = $postsRepository->findFutureByBrand($brandId, $start, $end);
        }

        $events = [];
        foreach ($posts as $post)
        {
            $assetsIds = $post->getAssets()->map(fn($asset) => $asset->getId())->toArray();

            $events[] = [
                'id' => $post->getId(),
                'title' => $post->getTitle(),
                'start' => $post->getPostAt()->format('Y-m-d H:i:s'),
                'extendedProps' => [
                    'description' => $post->getDescription(),
                    'assetIds' => $assetsIds,
                ],
                'className' => $post->getPostAt() < new \DateTimeImmutable() ? 'past-event' : '',
            ];

        }
        return $this->json($events);
    }
}
