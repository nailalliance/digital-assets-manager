<?php

namespace App\Command;

use App\Repository\Assets\AssetsRepository;
use App\Service\ImageProcessorService;
use App\Service\Video\FFMPEG;
use Doctrine\Common\Collections\Criteria;
use Doctrine\Common\Collections\Order;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Filesystem\Filesystem;
use function basename;

#[AsCommand(
    name: 'app:generate-thumbnails:video',
    description: 'Generates thumbnails for existing videos.',
)]
class GenerateVideoThumbnailsCommand extends Command
{
    public function __construct(
        private readonly AssetsRepository $assetsRepository,
        private readonly EntityManagerInterface $entityManager,
        private readonly ParameterBagInterface $params,
        private readonly Filesystem $filesystem,
        private readonly ImageProcessorService $imageProcessor
    ) {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->addOption('assetId', 'a', InputOption::VALUE_REQUIRED, 'A comma-separated list of specific asset IDs to process.')
            ->addOption('offset', 'o', InputOption::VALUE_OPTIONAL, 'The starting offset for fetching assets.', 0)
            ->addOption('limit', 'l', InputOption::VALUE_OPTIONAL, 'The number of assets to process.', 100)
            ->addOption('startingId', null, InputOption::VALUE_OPTIONAL, 'The starting asset ID to process.', 0)
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $assetIds = $input->getOption('assetId') ? explode(',', $input->getOption('assetId')) : null;

        // if (!class_exists('Imagick')) {
        //     $io->error('The Imagick PHP extension is required to run this command.');
        //     return Command::FAILURE;
        // }

        $assets = $this->assetsRepository->findBy(['id' => $assetIds]);

        $assets = iterator_to_array($assets);

        if (empty($assets)) {
            $io->info('No assets found to process.');
            return Command::SUCCESS;
        }

        $io->progressStart(count($assets));

        foreach ($assets as $asset) {
            $io->title($asset->getId() . ' - ' . $asset->getName());
            $sourcePath = $asset->getFilePath();

            try {
                $frame = FFMPEG::getFirstFrame($sourcePath, __DIR__ . DIRECTORY_SEPARATOR . basename($sourcePath) . ".jpg");
            } catch (\Exception $e) {
                $io->error($e->getMessage());
            }

            if (!$this->filesystem->exists($frame)) {
                $io->warning(sprintf('Source file not found for asset ID %d. Skipping.', $asset->getId()));
                $io->progressAdvance();
                continue;
            }

            $targetWidth = 700;
            $targetHeight = 700;

            $thumbnailBinary = $this->imageProcessor->makeThumbnail($frame, $targetWidth, $targetHeight);

            if ($thumbnailBinary) {
                // 2. Determine the final path
                $thumbnailDir = $this->params->get('thumbnail_dir');
                $safeFilename = basename($sourcePath);
                $firstLetter = strtolower(mb_substr($safeFilename, 0, 1));
                $secondLetter = strtolower(mb_substr($safeFilename, 1, 1));
                $finalDir = sprintf('%s/%s/%s', $thumbnailDir, $firstLetter, $secondLetter);
                $this->filesystem->mkdir($finalDir);
                $thumbnailPath = $finalDir . '/' . pathinfo($safeFilename, PATHINFO_FILENAME) . '.webp';

                // 3. Save the binary data and update the asset
                $this->filesystem->dumpFile($thumbnailPath, $thumbnailBinary);
                $asset->setThumbnailPath($thumbnailPath);
                $this->entityManager->persist($asset);
                $lastId = $asset->getId();
            } else {
                $io->warning(sprintf('Could not create thumbnail for asset ID %d.', $asset->getId()));
            }

            $this->filesystem->remove($frame);

            $io->progressAdvance();
        }

        $this->entityManager->flush();
        $io->progressFinish();
        $io->success('Thumbnail generation complete. Last id: ' . $lastId);

        return Command::SUCCESS;
    }
}
