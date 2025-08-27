<?php

namespace App\Command;

use App\Service\AssetImporterService;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Filesystem\Exception\IOException;

#[AsCommand(
    name: 'app:import-assets',
    description: 'Imports assets from a given XML or CSV file in chunks.',
)]
class ImportAssetsCommand extends Command
{
    private const CHUNK_SIZE = 100;

    public function __construct(private readonly AssetImporterService $assetImporter)
    {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->addArgument('filePath', InputArgument::REQUIRED, 'The path to the XML or CSV file to import.')
            ->addOption('filePathRoot', 'a', InputOption::VALUE_OPTIONAL, 'The root path to prepend to filePaths.')
            ->addOption('thumbnailPathRoot', 't', InputOption::VALUE_OPTIONAL, 'The root path to prepend to thumbnailPaths.')
            ->addOption('limit', null, InputOption::VALUE_OPTIONAL, 'Limit the number of items to import for testing.', 0)
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $filePath = $input->getArgument('filePath');

        $filePathRoot = $input->getOption('filePathRoot');
        $thumbnailPathRoot = $input->getOption('thumbnailPathRoot');
        $limit = (int) $input->getOption('limit');

        if (!file_exists($filePath)) {
            $io->error(sprintf('The file "%s" does not exist.', $filePath));
            return Command::FAILURE;
        }

        $io->title('Starting Asset Import');
        $io->text('File: ' . $filePath);
        if ($limit > 0) {
            $io->info(sprintf('Limiting import to the first %d records.', $limit));
        }

        try {
            $fileExtension = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));

            $totalItems = $this->getItemCount($filePath, $fileExtension);
            if ($totalItems === 0) {
                $io->warning('No data found in the file.');
                return Command::SUCCESS;
            }

            $progressTotal = ($limit > 0 && $limit < $totalItems) ? $limit : $totalItems;
            $io->progressStart($progressTotal);

            if ($fileExtension === 'csv') {
                $this->processCsvInChunks($filePath, $io, $filePathRoot, $thumbnailPathRoot, $limit);
            } elseif ($fileExtension === 'xml') {
                $this->processXmlInChunks($filePath, $io, $filePathRoot, $thumbnailPathRoot, $limit);
            } else {
                $io->error('Unsupported file type. Please provide a ".csv" or ".xml" file.');
                return Command::FAILURE;
            }

            $io->progressFinish();
            $io->success('Asset import completed successfully.');

        } catch (IOException $e) {
            $io->error($e->getMessage());
        } catch (\Exception $e) {
            dd("Exception", $e);
            $io->error('An error occurred during the import process: ' . $e->getMessage());
            return Command::FAILURE;
        }

        return Command::SUCCESS;
    }

    private function processCsvInChunks(string $filePath, SymfonyStyle $io, ?string $filePathRoot, ?string $thumbnailPathRoot, int $limit): void
    {
        $handle = fopen($filePath, 'r');
        $header = fgetcsv($handle);
        $chunk = [];
        $importedCount = 0;

        while (($row = fgetcsv($handle)) !== false) {
            if ($limit > 0 && $importedCount >= $limit) {
                break;
            }

            $assetData = array_combine($header, $row);

            if ($filePathRoot && !empty($assetData['filePath'])) {
                $assetData['filePath'] = rtrim($filePathRoot, '/') . '/' . ltrim($assetData['filePath'], '/');
            }
            if ($thumbnailPathRoot && !empty($assetData['thumbnailPath'])) {
                $assetData['thumbnailPath'] = rtrim($thumbnailPathRoot, '/') . '/' . ltrim($assetData['thumbnailPath'], '/');
            }

            $chunk[] = $assetData;
            $importedCount++;

            if (count($chunk) >= self::CHUNK_SIZE) {
                $this->assetImporter->import($chunk);
                $io->progressAdvance(count($chunk));
                $chunk = [];
            }
        }

        // Process the final, smaller chunk
        if (!empty($chunk)) {
            $this->assetImporter->import($chunk);
            $io->progressAdvance(count($chunk));
        }

        fclose($handle);
    }

    private function processXmlInChunks(string $filePath, SymfonyStyle $io, ?string $filePathRoot, ?string $thumbnailPathRoot, int $limit): void
    {
        $reader = new \XMLReader();
        $reader->open($filePath);
        $chunk = [];
        $importedCount = 0;

        while ($reader->read() && $reader->name !== 'table');

        while ($reader->name === 'table') {
            if ($limit > 0 && $importedCount >= $limit) {
                break;
            }

            $node = new \SimpleXMLElement($reader->readOuterXml());
            $assetData = [];
            foreach ($node->column as $column) {
                $columnName = (string) $column['name'];
                $value = (string) $column;
                $assetData[$columnName] = ($value === 'NULL') ? null : $value;
            }

            if ($filePathRoot && !empty($assetData['filePath'])) {
                $assetData['filePath'] = rtrim($filePathRoot, '/') . '/' . ltrim($assetData['filePath'], '/');
            }
            if ($thumbnailPathRoot && !empty($assetData['thumbnailPath'])) {
                $assetData['thumbnailPath'] = rtrim($thumbnailPathRoot, '/') . '/' . ltrim($assetData['thumbnailPath'], '/');
            }

            $chunk[] = $assetData;
            $importedCount++;

            if (count($chunk) >= self::CHUNK_SIZE) {
                $this->assetImporter->import($chunk);
                $io->progressAdvance(count($chunk));
                $chunk = [];
            }

            $reader->next('table');
        }

        // Process the final, smaller chunk
        if (!empty($chunk)) {
            $this->assetImporter->import($chunk);
            $io->progressAdvance(count($chunk));
        }

        $reader->close();
    }

    private function getItemCount(string $filePath, string $extension): int
    {
        if ($extension === 'csv') {
            $linecount = 0;
            $handle = fopen($filePath, "r");
            while(!feof($handle)){
                fgets($handle);
                $linecount++;
            }
            fclose($handle);
            return $linecount > 0 ? $linecount - 1 : 0;
        }

        if ($extension === 'xml') {
            $count = 0;
            $reader = new \XMLReader();
            $reader->open($filePath);
            while ($reader->read()) {
                if ($reader->nodeType == \XMLReader::ELEMENT && $reader->name == 'table') {
                    $count++;
                }
            }
            $reader->close();
            return $count;
        }

        return 0;
    }
}
