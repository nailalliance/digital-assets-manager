<?php

namespace App\Command;

use App\Entity\Assets\Assets;
use App\Entity\Assets\Brands;
use App\Entity\Assets\Categories;
use App\Entity\Assets\Collections;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use function dump;
use function in_array;
use function mb_strtolower;
use function mb_strtoupper;
use function ucwords;

#[AsCommand(
    name: 'app:title-case',
    description: 'Imports assets from a given XML or CSV file in chunks.',
)]
class TitleCaseComand extends Command
{
    public function __construct(private readonly EntityManagerInterface $entityManager)
    {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this->addOption("dry-run", null, InputOption::VALUE_NONE);
        $this->addOption("limit", "l", InputOption::VALUE_OPTIONAL);
        $this->addOption("offset", "o", InputOption::VALUE_OPTIONAL);
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $dryRun = $input->getOption("dry-run") ?? false;
        $limit = $input->getOption("limit") ?? 100;
        $offset = $input->getOption("offset") ?? 0;

        $limit = intval($limit);
        $offset = intval($offset);

        $acronyms = [
            "rcm",
            "led",
            "sds",
            "mt",
            "bsg",
            "ttc",
            "us",
            "uk",
            "eps",
            "eocc",
            "eocc:",
            "peta",
            "jpg",
            "png",
            "pdf",
        ];

        $lowercases = [
            "ml",
            "g",
            "gr",
            "pc",
            "oz",
            "lb",
            "pg",
            "pk",
        ];

        $entities = $this->entityManager->getRepository(Assets::class)->findBy([], [], $limit, $offset);

        if (empty($entities)) {
            $io->error("No assets found.");
            return Command::FAILURE;
        }

        $io->info($offset);

        $io->progressStart(count($entities));

        foreach ($entities as $entity) {
            $name = $entity->getName();

            $words = explode(" ", $name);
            foreach ($words as &$word) {
                $word = mb_strtolower($word);
                if (in_array($word, $acronyms)) {
                    $word = mb_strtoupper($word);
                    continue;
                }
                $subWord = preg_replace('/[0-9]/i', '', $word);
                if (!(in_array($word, $lowercases) || in_array($subWord, $lowercases))) {
                    $word = mb_convert_case($word, MB_CASE_TITLE_SIMPLE, "UTF-8");
                }

                if (substr($word, 0, 1) === "-") {
                    $word = mb_substr($word, 0, 1) . " " . mb_substr($word, 1);
                }

                if (mb_substr($word, -1) === "-") {
                    $word = mb_substr($word, 0, mb_strlen($word) - 1) . " " . mb_substr($word, -1);
                }
                $word = trim($word);
            }

            $words = implode(" ", $words);

            $words = trim($words);

            $entity->setName($words);

            if (!$dryRun) {
                $this->entityManager->persist($entity);
                $this->entityManager->flush();
            }

            if ($dryRun) {
                dump($entity->getName());
            }

            $io->progressAdvance();
        }

        $io->progressFinish();


        return Command::SUCCESS;
    }
}
