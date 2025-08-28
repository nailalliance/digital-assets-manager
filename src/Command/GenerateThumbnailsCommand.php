<?php

namespace App\Command;

use App\Repository\Assets\AssetsRepository;
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
        private readonly Filesystem $filesystem
    ) {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->addOption('assetId', 'a', InputOption::VALUE_OPTIONAL, 'A comma-separated list of specific asset IDs to process.')
            ->addOption('offset', 'o', InputOption::VALUE_OPTIONAL, 'The starting offset for fetching assets.', 0)
            ->addOption('limit', 'l', InputOption::VALUE_OPTIONAL, 'The number of assets to process.', 100)
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $assetIds = $input->getOption('assetId') ? explode(',', $input->getOption('assetId')) : null;
        $offset = (int) $input->getOption('offset');
        $limit = (int) $input->getOption('limit');

        if (!class_exists('Imagick')) {
            $io->error('The Imagick PHP extension is required to run this command.');
            return Command::FAILURE;
        }

        if ($assetIds) {
            $assets = $this->assetsRepository->findBy(['id' => $assetIds]);
        } else {
            $assets = $this->assetsRepository->findBy(
                ['mime_type' => ['image/jpeg', 'image/png']],
                ['id' => 'ASC'],
                $limit,
                $offset
            );
        }

        if (empty($assets)) {
            $io->info('No assets found to process.');
            return Command::SUCCESS;
        }

        $io->progressStart(count($assets));

        $srgbProfilePath = $this->params->get('srgb_profile_path');
        $cmykProfilePath = $this->params->get('cmyk_profile_path');
        $srgbProfile = $this->filesystem->exists($srgbProfilePath) ? file_get_contents($srgbProfilePath) : null;
        $cmykProfile = $this->filesystem->exists($cmykProfilePath) ? file_get_contents($cmykProfilePath) : null;

        foreach ($assets as $asset) {
            $sourcePath = $asset->getFilePath();

            if (!$this->filesystem->exists($sourcePath)) {
                $io->warning(sprintf('Source file not found for asset ID %d. Skipping.', $asset->getId()));
                $io->progressAdvance();
                continue;
            }

            try {
                $targetWidth = 700;
                $targetHeight = 700;
                $thumbnailDir = $this->params->get('thumbnail_dir');
                $safeFilename = basename($sourcePath);

                $firstLetter = strtolower(mb_substr($safeFilename, 0, 1));
                $secondLetter = strtolower(mb_substr($safeFilename, 1, 1));
                $finalDir = sprintf('%s/%s/%s', $thumbnailDir, $firstLetter, $secondLetter);
                $this->filesystem->mkdir($finalDir);

                $thumbnailFilename = pathinfo($safeFilename, PATHINFO_FILENAME) . '.webp';
                $thumbnailPath = $finalDir . '/' . $thumbnailFilename;

                $image = new \Imagick($sourcePath);

                // if ($image->getImageColorspace() === \Imagick::COLORSPACE_CMYK) {
                //     $image->transformImageColorspace(\Imagick::COLORSPACE_SRGB);
                // }
                // **Start of Color Profile Conversion Logic**
                if ($image->getImageColorspace() === \Imagick::COLORSPACE_CMYK) {
                    // Only perform conversion if both profiles are available
                    if ($cmykProfile && $srgbProfile) {
                        // First, apply the source CMYK profile
                        $image->profileImage('icc', $cmykProfile);
                        // Then, apply the destination sRGB profile to convert the colors
                        $image->profileImage('icc', $srgbProfile);
                    } else {
                        // Fallback to simple transformation if profiles are missing
                        $image->transformImageColorspace(\Imagick::COLORSPACE_SRGB);
                    }
                }
                // **End of Color Profile Conversion Logic**

                $image->thumbnailImage($targetWidth, $targetHeight, true, true);

                $canvas = new \Imagick();
                $canvas->newImage($targetWidth, $targetHeight, 'white', 'webp');

                $x = ($targetWidth - $image->getImageWidth()) / 2;
                $y = ($targetHeight - $image->getImageHeight()) / 2;

                $canvas->compositeImage($image, \Imagick::COMPOSITE_OVER, $x, $y);

                // --- Add the text legend ---
                $draw = new \ImagickDraw();
                $draw->setFont('Helvetica');
                // $draw->setFont('Bookman-Demi');
                $draw->setFontSize(12);
                $draw->setFillColor(new \ImagickPixel('#999999'));
                $draw->setGravity(\Imagick::GRAVITY_SOUTHEAST); // Position in the bottom-right

                $legendText = "Preview.\nColor is an approximation.\nDo not use this thumbnail in production.";

                // Annotate the canvas with the text, with 5px padding from the corner
                $canvas->annotateImage($draw, 5, 5, 0, $legendText);
                // --- End of text legend ---

                $canvas->writeImage($thumbnailPath);

                $asset->setThumbnailPath($thumbnailPath);

                $image->clear();
                $canvas->clear();

                $this->entityManager->persist($asset);

            } catch (\ImagickException $e) {
                $io->warning(sprintf('Could not create thumbnail for asset ID %d: %s', $asset->getId(), $e->getMessage()));
            }

            $io->progressAdvance();
        }

        $this->entityManager->flush();
        $io->progressFinish();
        $io->success('Thumbnail generation complete.');

        return Command::SUCCESS;
    }
}
