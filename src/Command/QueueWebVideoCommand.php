<?php

namespace App\Command;

use App\Message\ProcessWebVideo;
use App\Repository\Assets\AssetsRepository;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Messenger\MessageBusInterface;

#[AsCommand(
    name: 'app:queue-web-videos',
    description: 'Queue browser-ready MP4 renditions for one or more video assets.',
)]
final class QueueWebVideoCommand extends Command
{
    public function __construct(
        private readonly AssetsRepository $assetsRepository,
        private readonly MessageBusInterface $messageBus,
    ) {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->addOption('assetId', 'a', InputOption::VALUE_REQUIRED, 'Comma-separated original video asset IDs.')
            ->addOption('force', 'f', InputOption::VALUE_NONE, 'Regenerate a rendition even when one is already ready.');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $ids = array_values(array_filter(array_map('intval', explode(',', (string) $input->getOption('assetId')))));
        if ($ids === []) {
            (new SymfonyStyle($input, $output))->error('Provide at least one video asset ID with --assetId.');

            return Command::INVALID;
        }

        $assets = $this->assetsRepository->findBy(['id' => $ids]);
        $queued = 0;
        foreach ($assets as $asset) {
            if (!str_starts_with((string) $asset->getMimeType(), 'video/')) {
                continue;
            }

            $this->messageBus->dispatch(new ProcessWebVideo((int) $asset->getId(), (bool) $input->getOption('force')));
            $queued++;
        }

        (new SymfonyStyle($input, $output))->success(sprintf('Queued %d web-video rendition(s).', $queued));

        return Command::SUCCESS;
    }
}
