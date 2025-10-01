<?php

namespace App\Controller\Chat;

use App\Entity\Assets\Assets;
use App\Entity\Assets\Brands;
use App\Entity\Chat\Chat;
use App\Entity\Chat\ChatTypeEnum;
use App\Entity\Chat\Message;
use App\Repository\Chat\ChatRepository;
use App\Service\ImageProcessorService;
use App\Service\SearchService;
use App\Service\UniqueFilePathGenerator;
use Doctrine\ORM\EntityManagerInterface;
use Gemini;
use Gemini\Data\GenerationConfig;
use Gemini\Enums\MimeType;
use Gemini\Enums\ResponseModality;
use Gemini\Resources\GenerativeModel;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Core\User\UserInterface;
use function in_array;
use function is_array;
use function is_null;
use function mb_strtolower;
use function sprintf;
use function strtolower;

#[Route('/chats')]
class ChatsController extends AbstractController
{

    #[Route('/{brandId}', name: 'app_chats', methods: ['GET'])]
    public function index(ChatRepository $chatRepository, int $brandId): Response
    {

        $user = $this->getUser();

        try {
            $brand = $this->getBrandFromRequest($user, $brandId);
        } catch (\Throwable $exception) {
            throw $exception;
        }

        $chats = $chatRepository->findBy([
            'user' => $user,
            'brand' => $brand,
        ]);

        return $this->render('chat/index.html.twig', ['chats' => $chats, 'brand' => $brand]);
    }

    #[Route('/{id}/new/{type}', name: 'app_chat_new', methods: ['GET'])]
    public function createChat(EntityManagerInterface $entityManager, Brands $brand, string $type): Response
    {
        try {
            $type = ChatTypeEnum::from($type);
        } catch (\Throwable $exception) {
            throw $this->createNotFoundException("Not found");
        }

        $chat = new Chat();
        $chat->setUser($this->getUser());
        $chat->setName("New Chat");
        $chat->setBrand($brand);
        $chat->setType($type);

        $entityManager->persist($chat);
        $entityManager->flush();

        return $this->redirectToRoute('app_chat', ['id' => $chat->getId()], Response::HTTP_SEE_OTHER);
    }

    private function getBrandFromRequest(UserInterface $user, int $brandId): Brands
    {
        $brand = null;
        foreach ($user->getRestrictedBrands()->toArray() as $userBrand) {
            if ($userBrand->getId() === $brandId) {
                $brand = $userBrand;
                break;
            }
        }
        if (is_null($brand)) {
            throw $this->createAccessDeniedException('You do not have access to this page.');
        }

        return $brand;
    }
}
