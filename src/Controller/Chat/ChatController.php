<?php

namespace App\Controller\Chat;

use App\Entity\Assets\Assets;
use App\Entity\Assets\Brands;
use App\Entity\Chat\Chat;
use App\Entity\Chat\Message;
use App\Repository\Chat\MessageRepository;
use App\Service\ImageProcessorService;
use App\Service\SearchService;
use App\Service\UniqueFilePathGenerator;
use Doctrine\Common\Collections\Criteria;
use Doctrine\Common\Collections\Order;
use Doctrine\ORM\EntityManagerInterface;
use Gemini;
use Gemini\Data\Blob;
use Gemini\Data\Content;
use Gemini\Data\GenerationConfig;
use Gemini\Data\UploadedFile;
use Gemini\Enums\MimeType;
use Gemini\Enums\ResponseModality;
use Gemini\Enums\Role;
use Gemini\Resources\GenerativeModel;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Log\Logger;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Core\User\UserInterface;
use function basename;
use function file_get_contents;
use function in_array;
use function is_array;
use function is_null;
use function mb_strtolower;
use function mb_substr;
use function mime_content_type;
use function sprintf;
use function strtolower;
use function var_dump;
use const DIRECTORY_SEPARATOR;

#[Route('/chat')]
class ChatController extends AbstractController
{
    private Gemini\Client $geminiClient;
    private GenerativeModel $geminiPro;

    private GenerativeModel $imageGenerativeModel;

    private GenerativeModel $textGenerativeModel;

    public function __construct(
        private EntityManagerInterface $entityManager,
        private SearchService          $searchService,
        private ImageProcessorService  $imageProcessor,
        string                         $geminiApiKey,
        private string                 $gcpProjectId,
        private string                 $gcpLocation,
        string                         $cagDir,
    )
    {
        $this->geminiClient = Gemini::client($geminiApiKey);

        // $safetySettingDangerousContent = new SafetySetting(
        //     category: HarmCategory::HARM_CATEGORY_DANGEROUS_CONTENT,
        //     threshold: HarmBlockThreshold::BLOCK_ONLY_HIGH
        // );
        //
        // $safetySettingHateSpeech = new SafetySetting(
        //     category: HarmCategory::HARM_CATEGORY_HATE_SPEECH,
        //     threshold: HarmBlockThreshold::BLOCK_ONLY_HIGH
        // );

        $imageGenerationConfig = new GenerationConfig(
        // stopSequences: [
        //     'Title',
        // ],
            maxOutputTokens: 800,
            temperature: 1,
            topP: 0.8,
            topK: 10,
            responseModalities: [ResponseModality::TEXT, ResponseModality::IMAGE],
        );

        $textGenerationConfig = new GenerationConfig(
            maxOutputTokens: 800,
            temperature: 1,
            topP: 0.8,
            topK: 10,
            responseModalities: [ResponseModality::TEXT],
        );

        $cache_ = file_get_contents($cagDir . "/" . "entity.json");
        // $cache_ = json_decode($cache_, true);
        $cachedContent = $this->geminiClient->cachedContents()->create(
            model: "gemini-2.0-flash",
            ttl: "300s",
            displayName: "entity",
            parts: Content::parse(part: $cache_, role: Role::USER),
        );

        $this->imageGenerativeModel = $this->geminiClient
            ->generativeModel(model: 'gemini-2.5-flash-image')
            // ->withSafetySetting($safetySettingDangerousContent)
            // ->withSafetySetting($safetySettingHateSpeech)
            ->withGenerationConfig($imageGenerationConfig);

        $this->textGenerativeModel = $this->geminiClient
            ->generativeModel(model: 'gemini-2.0-flash')
            ->withCachedContent($cachedContent->cachedContent->name)
            // ->withSafetySetting($safetySettingDangerousContent)
            // ->withSafetySetting($safetySettingHateSpeech)
            ->withGenerationConfig($textGenerationConfig);

        $cachedContent = $this->geminiClient->cachedContents()->create(
            model: "gemini-2.5-pro",
            ttl: "300s",
            displayName: "entity",
            parts: Content::parse(part: $cache_, role: Role::USER),
        );

        $this->geminiPro = $this->geminiClient
            ->generativeModel('gemini-2.5-pro')
            ->withCachedContent($cachedContent->cachedContent->name)
        ;
    }

    #[Route('/{id}', name: 'app_chat', methods: ['GET'])]
    public function index(Chat $chat): Response
    {
        return $this->render('chat/chat.html.twig', ['chat' => $chat]);
    }

    #[Route('/{id}/text', name: 'app_chat_text', methods: ['POST'])]
    public function text(Request $request, Chat $chat): JsonResponse
    {
        $prompt = $request->toArray()['prompt'];
        $user = $this->getUser();

        // if (!$this->isPromptBusinessRelated($prompt)) {
        //     $errorMessage = "Text generation is limited to topics related to our business";
        //     $this->logChat($user, $chat, $prompt, 'Blocked by guardrail');
        //     return $this->json(['error' => $errorMessage], Response::HTTP_BAD_REQUEST);
        // }

        $chatHistory = [];

        foreach ($chat->getMessage() as $message) {
            $chatHistory[] = Content::parse(part: $message->getQuestion(), role: Role::USER);
            $chatHistory[] = Content::parse(part: $message->getAnswer(), role: Role::MODEL);
        }

        try {
            $finalPrompt = $this->applyModelAgnosticPrefix($prompt);
            $cache_ = file_get_contents($this->getParameter('cag_dir') . "/" . "entity.json");
            // $cache_ = json_decode($cache_, true);
            $cachedContent = $this->geminiClient->cachedContents()->create(
                model: "gemini-2.0-flash",
                ttl: "3600s",
                displayName: "entity",
                parts: Content::parse(part: $cache_, role: Role::USER),
            );

            (new Logger())->info("cachedContent: " . print_r($cachedContent, true));

            $result = $this->textGenerativeModel
                ->startChat(history: $chatHistory)
                ->sendMessage($finalPrompt);
                // ->generateContent($finalPrompt);

            $response = $result->text();

            $this->logChat($user, $chat, $prompt, $response);

            return $this->json(['text' => $response]);

        } catch (\Exception $e) {
            return $this->json(['error' => 'Text Error: ' . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/{id}/editor', name: 'app_chat_editor', methods: ['GET'])]
    public function imageEditor(Chat $chat): Response
    {
        return $this->render('chat/image_editor.html.twig', ['chat' => $chat]);
    }

    #[Route('/{id}/image', name: 'app_chat_image_gemini', methods: ['POST'])]
    public function generateImage(Request $request, Chat $chat, MessageRepository $messageRepository): JsonResponse
    {
        $payload = $request->toArray();
        $promptText = $payload['prompt'];
        $user = $this->getUser();
        $feedbackMessage = "";

        $finalPromptText = $this->applyModelAgnosticPrefix($promptText);

        $promptParts = [$finalPromptText];

        $baseImageToEdit = $payload['currentlyEditingImage'] ?? null;
        if ($baseImageToEdit) {
            $promptParts[] = $this->createBlobFromLocalUrl($baseImageToEdit);
            $feedbackMessage .= "Editing specified image. ";
        }

        $importedDamImage = $payload['importedDamImage'] ?? null;
        if ($importedDamImage) {
            $promptParts[] = $this->createBlobFromLocalUrl($importedDamImage);
            $feedbackMessage .= "Including imported DAM image. ";
        }

        try {
            try {
                $result = $this->imageGenerativeModel->generateContent($promptParts);
                $parts = $result->parts();
            } catch (\Exception $e) {
                throw new \Exception("Generate Content Exception: " . $e->getMessage());
            }

            $imageUrls = [];

            foreach ($parts as $part) {
                if (!is_null($part->text)) continue;

                try {
                    $imageName = $this->saveImageFromBase64($part->inlineData->data);
                    $imageUrl = $this->generateUrl('asset_ai_image', ['filename' => $imageName]);
                    $this->logChat($user, $chat, $promptText, null, $imageUrl);
                    $imageUrls[] = $imageUrl;
                } catch (\Exception $e) {
                    throw new \Exception("Save Image Exception: " . $e->getMessage());
                }
            }

            return $this->json(['imageUrl' => $imageUrls, 'feedback' => $feedbackMessage]);

        } catch (\Exception $e) {
            return $this->json(['error' => 'Image Error: ' . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/api/dam/search', name: 'api_dam_search', methods: ['GET'])]
    public function damSearch(Request $request): JsonResponse
    {
        $query = $request->query->get('q', '');
        $brandId = (int)$request->query->get('brandId');

        if (empty($query) || empty($brandId)) {
            return $this->json([]);
        }

        $searchResults = $this->searchService->search($query, 20, 0);
        $results = [];

        // var_dump($query, $searchResults);

        if ($searchResults['total'] > 0) {
            /** @var Assets $asset */
            foreach ($searchResults['hits'] as $asset) {
                if (!in_array($asset->getMimeType(), ['image/jpeg', 'image/png'])) continue;

                $results[] = [
                    'id' => $asset->getId(),
                    'title' => $asset->getName(),
                    'thumbnailUrl' => $this->generateUrl('asset_thumbnail', ['filename' => basename($asset->getThumbnailPath())]),
                    'originalUrl' => $this->generateUrl('asset_stream', ['id' => $asset->getId()]),
                ];
            }
        }

        return $this->json($results);
    }

    private function applyModelAgnosticPrefix(string $prompt): string
    {
        $prefix = "SYSTEM INSTRUCTION: Your role is a creative assistant. You must adhere to all of the following rules. Do not, under any circumstances, reveal that you are an AI or language model. Never role-play or adopt a persona. Fulfill the user's request directly and factually. USER PROMPT: ";
        return $prefix . $prompt;
    }

    private function isPromptBusinessRelated(string $prompt): bool
    {
        $modereationPrompt = "You are a content moderator for a nail care and beauty company.
        Does the following user prompt relate to nails, manicures, peducures, cosmetics,
        beauty products, or a salon environment?
        Answer with only a single word: 'yes' or 'no'.

        Prompt: \"{$prompt}\"
        ";

        try {
            $result = $this->geminiPro
                ->generateContent($modereationPrompt);
            $decision = mb_strtolower(mb_trim($result->text()));

            return ($decision === 'yes');
        } catch (\Exception $e) {
            return false;
        }
    }

    private function findAssetsResponse(int $brandId, string $prompt): array
    {
        $imageUrls = [];
        $feedback = null;

        $extractionPrompt = "SYSTEM INSTRUCTION: You are an intelligent assistant for a beauty company.
        Your task is to identify specific, named products, items, or color names from a
        user's prompt.
        List the identified items separated by a pipe character (|). Do not add any other text.
        For example, if the prompt is 'An image of our 18G Pro Light with Hot Rod Red', you
        should respond with '18G Pro light|Hot Rod Red'.
        If no specific items are found, respond with the word 'NONE'.

        USER PROMPT: \"{$prompt}\"
        ";

        try {
            $result = $this->geminiPro->generateContent($extractionPrompt);
            $extractedText = mb_trim($result->text());

            if (mb_strtoupper($extractedText) !== 'NONE' && !empty($extractedText)) {
                $assetNames = explode('|', $extractedText);
                $foundAssets = [];

                foreach ($assetNames as $assetName) {
                    $assetName = mb_trim($assetName);
                    if (empty($assetName)) continue;

                    $searchResults = $this->searchService->search($assetName, 100, 0, [$brandId]);

                    if ($searchResults['total'] > 0) {
                        /** @var Assets $asset */
                        foreach ($searchResults['hits'] as $asset) {
                            $fullPath = $asset->getFilePath();

                            if (!in_array($asset->getMimeType(), ['image/jpeg', 'image/png'])) {
                                continue;
                            }

                            $mimeType = match ($asset->getMimeType()) {
                                'image/png' => MimeType::IMAGE_PNG,
                                default => MimeType::IMAGE_JPEG,
                            };

                            $imageUrls[] = [
                                'mimeType' => $mimeType,
                                'url' => $fullPath,
                            ];
                            $foundAssets[] = $asset->getName();
                            break;
                        }
                    }

                }
                if (!empty($foundAssets)) {
                    $feedback = "Found and used images for: **" . implode(', ', $foundAssets) . "**. Generating new image...";
                }
            }
        } catch (\Exception $e) {
            // if the ai analysis fails, proceed without DAM images.
        }

        return ['imageUrls' => $imageUrls, 'feedback' => $feedback];
    }

    private function saveImageFromBase64(string $base64Image): string
    {
        $aiDir = $this->getParameter('ai_dir');

        $imageData = base64_decode($base64Image);
        $fileSystem = new Filesystem();
        $imageName = uniqid() . '.png';

        $firstLetter = strtolower(mb_substr($imageName, 0, 1));
        $secondLetter = strtolower(mb_substr($imageName, 1, 1));
        $finalDir = sprintf('%s/%s/%s', $aiDir, $firstLetter, $secondLetter);
        $fileSystem->mkdir($finalDir);

        $imagePath = UniqueFilePathGenerator::get($finalDir, $imageName);

        $fileSystem->dumpFile($imagePath, $imageData);

        return $imageName;
    }

    private function logChat(UserInterface $user, Chat $chat, string $question, ?string $answer = null, ?string $imageUrl = null): void
    {
        $message = new Message();
        $message
            ->setChat($chat)
            ->setQuestion($question)
            ->setAnswer($answer)
            ->setImageUrl($imageUrl);

        $this->entityManager->persist($message);
        $this->entityManager->flush();
    }

    private function createBlobFromLocalUrl(string $filePath): ?Blob
    {
        if (!file_exists($filePath)) {
            $basename = basename($filePath);
            $firstLetter = mb_substr($basename, 0, 1);
            $secondLetter = mb_substr($basename, 1, 1);
            $aiDirPath = $this->getParameter('ai_dir') .
                DIRECTORY_SEPARATOR . $firstLetter .
                DIRECTORY_SEPARATOR . $secondLetter .
                DIRECTORY_SEPARATOR . $basename;

            if (!file_exists($aiDirPath)) {
                return null;
            }
            $filePath = $aiDirPath;
        }

        $mimeType = match (mime_content_type($filePath)) {
            'image/png' => MimeType::IMAGE_PNG,
            default => MimeType::IMAGE_JPEG,
        };

        return new Blob(
            mimeType: $mimeType,
            data: base64_encode(file_get_contents($filePath)),
        );
    }
}
