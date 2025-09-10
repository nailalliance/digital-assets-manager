<?php

namespace App\Command;

use App\Repository\Assets\AssetsRepository;
use App\Service\ImageProcessorService;
use Doctrine\Common\Collections\Criteria;
use Doctrine\Common\Collections\Order;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Filesystem\Filesystem;

#[AsCommand(
    name: 'app:generate-thumbnails',
    description: 'Generates thumbnails for existing assets.',
)]
class GenerateThumbnailsCommand extends Command
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
            ->addOption('assetId', 'a', InputOption::VALUE_OPTIONAL, 'A comma-separated list of specific asset IDs to process.')
            ->addOption('offset', 'o', InputOption::VALUE_OPTIONAL, 'The starting offset for fetching assets.', 0)
            ->addOption('limit', 'l', InputOption::VALUE_OPTIONAL, 'The number of assets to process.', 100)
            ->addOption('startingId', null, InputOption::VALUE_OPTIONAL, 'The starting asset ID to process.', 0)
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $assetIds = $input->getOption('assetId') ? explode(',', $input->getOption('assetId')) : null;
        $offset = (int) $input->getOption('offset');
        $limit = (int) $input->getOption('limit');
        $startingId = (int) $input->getOption('startingId');

        // if (!class_exists('Imagick')) {
        //     $io->error('The Imagick PHP extension is required to run this command.');
        //     return Command::FAILURE;
        // }

        if ($assetIds) {
            $assets = $this->assetsRepository->findBy(['id' => $assetIds]);
        } else {
            $criteria = Criteria::create();
            $criteria->where(Criteria::expr()->in('mime_type', ['image/jpeg', 'image/png']));
            if ($startingId)
            {
                $criteria->andWhere(Criteria::expr()->gte('id', $startingId));
            }
            $criteria->setMaxResults($limit);
            $criteria->setFirstResult($offset);
            $criteria->orderBy(['id' => Order::Ascending]);
            $assets = $this->assetsRepository->matching($criteria);
            // $assets = $this->assetsRepository->findBy(
            //     // ['mime_type' => ['image/jpeg', 'image/png', 'application/pdf']], // PDF Is not rendering correctly
            //     ['mime_type' => ['image/jpeg', 'image/png']],
            //     ['id' => 'ASC'],
            //     $limit,
            //     $offset
            // );
        }

        $assets = iterator_to_array($assets);

        if (empty($assets)) {
            $io->info('No assets found to process.');
            return Command::SUCCESS;
        }

        $io->progressStart(count($assets));

        foreach ($assets as $asset) {
            $sourcePath = $asset->getFilePath();

            if (!$this->filesystem->exists($sourcePath)) {
                $io->warning(sprintf('Source file not found for asset ID %d. Skipping.', $asset->getId()));
                $io->progressAdvance();
                continue;
            }

            $targetWidth = 700;
            $targetHeight = 700;

            $thumbnailBinary = $this->imageProcessor->makeThumbnail($sourcePath, $targetWidth, $targetHeight);

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
            } else {
                $io->warning(sprintf('Could not create thumbnail for asset ID %d.', $asset->getId()));
            }

            $io->progressAdvance();
        }

        $this->entityManager->flush();
        $io->progressFinish();
        $io->success('Thumbnail generation complete.');

        return Command::SUCCESS;
    }
}
