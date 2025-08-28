<?php

namespace App\Controller\Admin\SocialMedia;

use App\Entity\SocialMedia\Posts;
use App\Form\SocialMedia\PostsType;
use App\Repository\Assets\AssetsRepository;
use App\Repository\Assets\BrandsRepository;
use App\Repository\SocialMedia\PostsRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/admin/social-media/posts')]
#[IsGranted('ROLE_FTP_SM_MANAGER')]
class PostsController extends AbstractController
{
    #[Route('/new', name: 'admin_sm_posts_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager, AssetsRepository $assetsRepository): Response
    {
        $post = new Posts();
        $form = $this->createForm(PostsType::class, $post);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $assetIdsString = $form->get('assets')->getData();
            if ($assetIdsString) {
                $assetIds = explode(',', $assetIdsString);
                $assets = $assetsRepository->findBy(['id' => $assetIds]);
                foreach ($assets as $asset) {
                    $post->addAsset($asset);
                }
            }

            $entityManager->persist($post);
            $entityManager->flush();

            return $this->redirectToRoute('admin_social_calendar_index');
        }

        return $this->render('admin/social_media_posts/new.html.twig', [
            'post' => $post,
            'form' => $form,
        ]);
    }

    #[Route('/{id}/edit', name: 'admin_sm_posts_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Posts $post, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(PostsType::class, $post);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('admin_social_calendar_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('admin/social_media_posts/edit.html.twig', [
            'post' => $post,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'admin_sm_posts_delete', methods: ['POST'])]
    public function delete(Request $request, Posts $post, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$post->getId(), $request->request->get('_token'))) {
            $entityManager->remove($post);
            $entityManager->flush();
        }

        return $this->redirectToRoute('admin_social_calendar_index', [], Response::HTTP_SEE_OTHER);
    }

    /**
     * This action is called via AJAX to update the assets field.
     */
    #[Route('/assets-for-brand', name: 'admin_sm_posts_assets_for_brand', methods: ['GET'])]
    public function getAssetsForBrand(Request $request, BrandsRepository $brandsRepository): Response
    {
        $post = new Posts();
        // Get the brand from the request query
        $brandId = $request->query->get('brand');
        if ($brandId) {
            // Fetch the actual Brand entity from the database
            $brand = $brandsRepository->find($brandId);
            if ($brand) {
                $post->setBrand($brand);
            }
        }

        $form = $this->createForm(PostsType::class, $post);

        // Return only the HTML for the 'assets' field
        return $this->render('admin/social_media_posts/_assets_field.html.twig', [
            'form' => $form->createView(),
        ]);
    }
}
