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
use App\Service\Video\FFMPEG;
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
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Log\Logger;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Core\User\UserInterface;
use function array_map;
use function basename;
use function dump;
use function file_get_contents;
use function in_array;
use function is_array;
use function is_null;
use function json_encode;
use function mb_strtolower;
use function mb_substr;
use function mime_content_type;
use function sleep;
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

    private GenerativeModel $videoGenerativeModel;

    private GenerativeModel $textGenerativeModel;

    public function __construct(
        private EntityManagerInterface $entityManager,
        private SearchService          $searchService,
        private ImageProcessorService  $imageProcessor,
        private string                 $geminiApiKey,
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

        $this->imageGenerativeModel = $this->geminiClient
            ->generativeModel(model: 'gemini-2.5-flash-image')
            // ->withSafetySetting($safetySettingDangerousContent)
            // ->withSafetySetting($safetySettingHateSpeech)
            ->withGenerationConfig($imageGenerationConfig);

        $videoGenerationConfig = new GenerationConfig(
            maxOutputTokens: 2048, // Videos may require more tokens
            temperature: 0.9,
            // responseModalities: [ResponseModality::MODALITY_UNSPECIFIED] // Specify VIDEO modality
        );

        $this->videoGenerativeModel = $this->geminiClient
            ->generativeModel(model: 'veo-3.0-fast-generate-001')
            ->withGenerationConfig($videoGenerationConfig);

        $this->textGenerativeModel = $this->geminiClient
            ->generativeModel(model: 'gemini-2.0-flash')
            // ->withCachedContent($cachedContent->cachedContent->name)
            // ->withSafetySetting($safetySettingDangerousContent)
            // ->withSafetySetting($safetySettingHateSpeech)
            ->withGenerationConfig($textGenerationConfig);

        $this->geminiPro = $this->geminiClient
            ->generativeModel('gemini-2.5-pro')
            // ->withCachedContent($cachedContent->cachedContent->name)
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

        // if (!$this->isPromptBusinessRelated($chat->getBrand()->getId(), $chat->getBrand()->getName(), $prompt)) {
        //     $errorMessage = "Text generation is limited to topics related to our business";
        //     $this->logChat($user, $chat, $prompt, 'Blocked by guardrail');
        //     return $this->json(['error' => $errorMessage], Response::HTTP_BAD_REQUEST);
        // }

        $chatHistory = [];

        foreach ($chat->getMessage() as $message) {
            if (!empty($message->getQuestion())) {
                $chatHistory[] = Content::parse(part: $message->getQuestion(), role: Role::USER);
            }
            if (!empty($message->getAnswer())) {
                $chatHistory[] = Content::parse(part: $message->getAnswer(), role: Role::MODEL);
            }
        }

        try {
            $finalPrompt = $this->applyModelAgnosticPrefix($prompt);

            $cachedContent = $this->getCachedContent($chat->getBrand()->getId(), $chat->getBrand()->getName());

            // (new Logger())->info("cachedContent: " . print_r($cachedContent, true));

            $result = $this->textGenerativeModel
                ->withCachedContent($cachedContent)
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
        $modelId = 'gemini-2.5-flash-image';

        $finalPromptText = $this->applyModelAgnosticPrefix($promptText);

        // $cachedContent = $this->getCachedContent($chat->getBrand()->getId(), $chat->getBrand()->getName(), $modelId);

        $promptParts = [
            // "cachedContent" => $cachedContent,
            "contents" => [],
        ];

        foreach ($chat->getMessage() as $message) {
            if (!empty($message->getQuestion())) {
                $promptParts["contents"][] = [
                    "role" => Role::USER->value,
                    "parts" => [
                        ["text" => $message->getQuestion()]
                    ],
                ];
            }
            if (!empty($message->getAnswer())) {
                $promptParts["contents"][] = [
                    "role" => Role::MODEL->value,
                    "parts" => [
                        ["text" => $message->getAnswer()]
                    ],
                ];
            }
        }


        $baseImageToEdit = $payload['currentlyEditingImage'] ?? null;
        if ($baseImageToEdit) {
            $blob = $this->createBlobFromLocalUrl($baseImageToEdit);
            if (str_starts_with($blob->mimeType->value, 'image')) {
                $promptParts["contents"][] = [
                    "role" => Role::USER->value,
                    "parts" => [
                        [
                            "text" => "This is the main image being edited",
                        ],
                        [
                            "inlineData" => [
                                "mimeType" => $blob->mimeType->value,
                                "data" => $blob->data,
                            ],
                        ],
                    ],
                ];
                $feedbackMessage .= "Editing specified image. ";
            }
        }

        $importedDamImageId = $payload['importedDamImageId'] ?? null;
        if ($importedDamImageId) {
            $asset = $this->entityManager->getRepository(Assets::class)->find($importedDamImageId);
            if (!empty($asset)) {
                $blob = $this->createBlobFromLocalUrl($asset->getFilePath());
                $promptParts["contents"][] = [
                    "role" => Role::USER->value,
                    "parts" => [
                        [
                            "text" => "This is a supporting image to use based on the user prompt.",
                        ],
                        [
                            "inlineData" => [
                                "mimeType" => $blob->mimeType->value,
                                "data" => $blob->data,
                            ],
                        ],
                    ],
                ];
                $feedbackMessage .= "Including imported DAM image. ";
            }
        }

        $promptParts["contents"][] = [
            "role" => Role::USER->value,
            "parts" => [
                ["text" => $finalPromptText]
            ],
        ];

        $promptParts["systemInstruction"] = [
            "parts" => [
                ["text" => "You are an expert photo editor. Your primary goal is to follow the user's instructions precisely. **Crucially, you must maintain the original aspect ratio of the main image being edited.** Do NOT crop, stretch, or alter the main image's aspect ratio."]
            ]
        ];

        try {
            $startUrl = "https://generativelanguage.googleapis.com/v1beta/models/{$modelId}:generateContent";

            $client = HttpClient::create();

            $startResponse = $client->request('POST', $startUrl, [
                'json' => $promptParts,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'x-goog-api-key' => $this->geminiApiKey,
                ],
            ]);

            if ($startResponse->getStatusCode() != 200) {
                dd($startResponse->getContent(false));
            }

            $geminiResponse = $startResponse->toArray();

            $parts = [];

            if (isset($geminiResponse['candidates']) && isset($geminiResponse['candidates'][0]) && isset($geminiResponse['candidates'][0]['content']['parts'])) {
                $parts = $geminiResponse['candidates'][0]['content']['parts'];
            }

            $imageUrls = [];
            $textResponse = "";
            if ($this->isGranted('ROLE_ADMIN')) {
                $logPrompt = $promptParts;
                $logPrompt['contents'] = array_map(function ($content) {
                    if (isset($content['parts'])) {
                        return array_map(function ($part) {
                            if (isset($part['inlineData'])) {
                                return $part['inlineData']['mimeType'];
                            }
                            return $part;
                        }, $content['parts']);
                    }
                    return $content;
                }, $logPrompt['contents']);
                $this->logChat($user, $chat, $promptText, json_encode($logPrompt), null);
            }
            foreach ($parts as $part) {
                if (isset($part['text'])) {
                    $textResponse = $part['text'];
                    continue;
                }
                // if (!is_null($part->text)) continue;

                try {
                    $imageName = $this->saveImageFromBase64($part["inlineData"]["data"]);
                    $imageUrl = $this->generateUrl('asset_ai_image', ['filename' => $imageName]);
                    $this->logChat($user, $chat, $promptText, null, $imageUrl);
                    $imageUrls[] = $imageUrl;
                } catch (\Exception $e) {
                    throw new \Exception("Save Image Exception: " . $e->getMessage());
                }
            }

            return $this->json(['text'=> $textResponse, 'imageUrl' => $imageUrls, 'feedback' => $feedbackMessage]);

        } catch (\Exception $e) {
            return $this->json(['error' => 'Image Error: ' . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/{id}/video', name: 'app_chat_video_gemini', methods: ['POST'])]
    public function generateVideo(Request $request, Chat $chat, MessageRepository $messageRepository): JsonResponse
    {
        $payload = $request->toArray();
        $promptText = $payload['prompt'];
        $user = $this->getUser();
        $feedbackMessage = "";
        // $modelId = 'veo-3.0-fast-generate-001';
        // $modelId = 'veo-2.0-generate-001';
        $modelId = 'veo-3.0-generate-001';

        $instances = [
            'prompt' => $this->applyModelAgnosticPrefix($promptText),
        ];


        $baseImageToEdit = $payload['currentlyEditingImage'] ?? null;
        if ($baseImageToEdit) {
            $blob = $this->createBlobFromLocalUrl($baseImageToEdit);
            if ($blob) {
                $instances['image'] = [
                    'bytesBase64Encoded' => $blob->data, //"blob->data",
                    'mimeType' => $blob->mimeType->value,
                ];
                $feedbackMessage .= "Editing specified image. ";
            }
        }

        $importedDamImageId = $payload['importedDamImageId'] ?? null;
        if ($importedDamImageId) {
            $asset = $this->entityManager->getRepository(Assets::class)->find($importedDamImageId);
            if (!empty($asset)) {
                $blob = $this->createBlobFromLocalUrl($asset->getFilePath());
                if ($blob) {
                    $instances['image'] = [
                        'bytesBase64Encoded' => $blob->data, //"blob->data",
                        'mimeType' => $blob->mimeType->value,
                    ];
                    $feedbackMessage .= "Including imported DAM image. ";
                }
            }
        }

        $jsonBody = [
            'instances' => [$instances],
            'parameters' => [
                'aspectRatio' => '16:9',
                'sampleCount' => 1,
                'durationSeconds' => 8,
                // 'personGeneration' => 'ALLOW_ADULT',
                // 'personGeneration' => 'ALLOW_ALL',
            ],
        ];

        try {
            // $startUrl = "https://generativelanguage.googleapis.com/v1beta/models/{$modelId}:predictLongRunning?key={$this->geminiApiKey}";
            $startUrl = "https://generativelanguage.googleapis.com/v1beta/models/{$modelId}:predictLongRunning";

            $client = HttpClient::create();

            $startResponse = $client->request('POST', $startUrl, [
                'json' => $jsonBody,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'x-goog-api-key' => $this->geminiApiKey,
                ],
            ]);

            if ($startResponse->getStatusCode() != 200) {
                dd($startResponse->getContent(false));
            }

            $operationName = $startResponse->toArray()['name'];

            $logger = new Logger();

            $logger->info("GENAI OPERATION NAME " . $operationName);

            if (!$operationName) {
                throw new \Exception("Failed to start video generation operation.");
            }

            // $checkUrl = "https://generativelanguage.googleapis.com/v1beta/{$operationName}?key={$this->geminiApiKey}";
            $checkUrl = "https://generativelanguage.googleapis.com/v1beta/{$operationName}";
            $maxAttempts = 30;
            $videoUri = null;

            $logger->info($checkUrl);

            for ($i = 1; $i <= $maxAttempts; $i++) {
                sleep(10);
                $checkResponse = $client->request('GET', $checkUrl, [
                    'headers' => [
                        'x-goog-api-key' => $this->geminiApiKey,
                    ],
                ]);
                $status = $checkResponse->toArray();

                if (!empty($status["done"]) && $status["done"] === true) {
                    $videoUri = $status['response']['generateVideoResponse']['generatedSamples'][0]['video']['uri'] ?? null;
                    break;
                }
            }

            if (is_null($videoUri)) {
                throw new \Exception("Video generation timed out or failed to complete.");
            }

            $downloadResponse = $client->request('GET', "{$videoUri}", [
                'headers' => [
                    'x-goog-api-key' => $this->geminiApiKey,
                ],
            ]);
            $videoContent = $downloadResponse->getContent();

            $videoName = $this->saveVideoFromBytes($videoContent);
            $videoUrl = $this->generateUrl('asset_ai_image', ['filename' => $videoName]);

            $this->logChat($user, $chat, $promptText, null, null, $videoUrl);

            return $this->json(['videoUrls' => [$videoUrl], 'feedback' => $feedbackMessage]);

        } catch (\Exception $e) {
            throw new \Exception("Video Generation Exception: " . $e->getMessage());
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
                    // 'originalUrl' => $this->generateUrl('asset_stream', ['id' => $asset->getId()]),
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

    private function isPromptBusinessRelated(int $brandId, string $brandName, string $prompt): bool
    {
        $modereationPrompt = "You are a content moderator for a nail care and beauty company.
        Use the cached content to determine your answer to this question.
        Does the following user prompt relate to nails, manicures, peducures, cosmetics,
        beauty products, or a salon environment?
        Answer with only a single word: 'yes' or 'no'.

        Prompt: \"{$prompt}\"
        ";

        $cachedContent = $this->getCachedContent($brandId, $brandName);

        try {
            $result = $this->geminiPro
                ->withCachedContent($cachedContent)
                ->generateContent($modereationPrompt);
            $decision = mb_strtolower(mb_trim($result->text()));

            return ($decision === 'yes');
        } catch (\Exception $e) {
            return false;
        }
    }

    private function findAssetsResponse(int $brandId, string $brandName, string $prompt): array
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

        $cachedContent = $this->getCachedContent($brandId, $brandName);

        try {
            $result = $this->geminiPro
                ->withCachedContent($cachedContent)
                ->generateContent($extractionPrompt);
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

    private function saveVideoFromBytes(string $videoBytes): string
    {
        $aiDir = $this->getParameter('ai_dir');
        $fileSystem = new Filesystem();
        $videoName = uniqid() . '.mp4';

        $firstLetter = strtolower(mb_substr($videoName, 0, 1));
        $secondLetter = strtolower(mb_substr($videoName, 1, 1));
        $finalDir = sprintf('%s/%s/%s', $aiDir, $firstLetter, $secondLetter);
        $fileSystem->mkdir($finalDir);

        $videoPath = UniqueFilePathGenerator::get($finalDir, $videoName);
        $fileSystem->dumpFile($videoPath, $videoBytes);

        return $videoName;
    }


    private function logChat(UserInterface $user, Chat $chat, string $question, ?string $answer = null, ?string $imageUrl = null, ?string $videoUrl = null): void
    {
        $message = new Message();
        $message
            ->setChat($chat)
            ->setQuestion($question)
            ->setAnswer($answer)
            ->setImageUrl($imageUrl)
            ->setVideoUrl($videoUrl);

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

        $mimeTypeStr = mime_content_type($filePath);
        $mimeType = match (true) {
            str_starts_with($mimeTypeStr, 'image/png') => MimeType::IMAGE_PNG,
            str_starts_with($mimeTypeStr, 'image/jpeg') => MimeType::IMAGE_JPEG,
            str_starts_with($mimeTypeStr, 'video/mp4') => MimeType::VIDEO_MP4,
            // Add other video types as needed
            default => MimeType::IMAGE_JPEG, // Default fallback
        };

        if ($mimeTypeStr === 'video/mp4') {
            $outputFile = $this->getParameter('ai_dir') . "/last-frame" . uniqid() . '.jpg';
            $lastFrame = FFMPEG::getLastFrame($filePath, $outputFile);
            return $this->createBlobFromLocalUrl($lastFrame);
        }

        (new Logger())->info("BLOB SIZE: " . filesize($filePath));

        return new Blob(
            mimeType: $mimeType,
            data: base64_encode(file_get_contents($filePath)),
        );
    }

    private function getCachedContent(int $brandId, string $cacheName, string $model = "gemini-2.0-flash"): string
    {
        $seeds = [
            1 => "gelish.json",
            2 => "gelish.json",
            3 => "morgan-taylor.json",
            4 => "entity.json",
            5 => "artistic.json",
            6 => "rcm.json",
        ];

        $seed = $seeds[$brandId];

        $cache_ = file_get_contents($this->getParameter('cag_dir') . "/" . $seed);
        // $cache_ = json_decode($cache_, true);
        $cachedContent = $this->geminiClient->cachedContents()->create(
            model: $model,
            ttl: "300s",
            displayName: $cacheName,
            parts: Content::parse(part: $cache_, role: Role::USER),
        );

        return $cachedContent->cachedContent->name;
    }
}
