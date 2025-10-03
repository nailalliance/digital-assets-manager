<?php

namespace App\Command;

use Exception;
use Gemini;
use Gemini\Client;
use Gemini\Contracts\Resources\FilesContract;
use Gemini\Data\ToolConfig;
use Gemini\Data\UploadedFile;
use Gemini\Enums\FileState;
use Gemini\Enums\MimeType;
use Gemini\Resources\GenerativeModel;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Finder\Finder;
use function array_keys;
use function basename;
use function count;
use function dump;
use function glob;
use function is_null;
use function mb_substr;
use function mime_content_type;
use function print_r;
use function sleep;
use const DIRECTORY_SEPARATOR;
use const GLOB_BRACE;

#[AsCommand(
    name: 'ai:models:list',
    description: 'Generates thumbnails for existing assets.',
)]
class ClientModelsListCommand extends Command
{
    private Client $geminiClient;

    public function __construct(
        string $geminiApiKey,
    ) {
        parent::__construct();
        $this->geminiClient = Gemini::client($geminiApiKey);
    }

    public function configure(): void
    {
    }

    public function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        // $models = $this->geminiClient->models()->list();

        $nextPageToken = "";

        $modelsList = [];

        while (!is_null($nextPageToken))
        {
            $filesList = $this->geminiClient->models()->list(50, $nextPageToken === "" ? null : $nextPageToken);
            foreach ($filesList->models as $model) {
                $modelsList[] = $model;
            }
            $nextPageToken = $filesList->nextPageToken;
        }

        // $modelsList = array_map(function ($model) {
        //     $list = [];
        //     foreach ($model as $attr) {
        //         if (is_array($attr)) {
        //             $list[] = join(", ", $attr);
        //             continue;
        //         }
        //         $list[] = $attr;
        //     }
        //     return $list;
        // }, $modelsList);

        dump($modelsList);

        // $io->table(array_keys($modelsList[0]), $modelsList);

        return Command::SUCCESS;
    }
}
