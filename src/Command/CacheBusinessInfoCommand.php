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
use function basename;
use function count;
use function glob;
use function is_null;
use function mb_substr;
use function mime_content_type;
use function print_r;
use function sleep;
use const DIRECTORY_SEPARATOR;
use const GLOB_BRACE;

#[AsCommand(
    name: 'ai:cache:business-info',
    description: 'Generates thumbnails for existing assets.',
)]
class CacheBusinessInfoCommand extends Command
{
    private Client $geminiClient;
    private GenerativeModel $geminiModel;

    public function __construct(
        private readonly Filesystem $filesystem,
        private string $cagDir,
        string $geminiApiKey,
    ) {
        parent::__construct();
        $this->geminiClient = Gemini::client($geminiApiKey);

        // $modesl = $this->geminiClient->models()->list();

        // $this->geminiModel = $this->geminiClient->generativeModel('gemini-2.5-pro');
        $this->geminiModel = $this->geminiClient->generativeModel('gemini-2.0-flash');
    }

    public function configure(): void
    {
        $this->addOption('directory', 'd', InputOption::VALUE_OPTIONAL, 'The file to add to cache.');
        $this->addOption('list', 'l', InputOption::VALUE_NONE, "List of files to cache.");
        $this->addOption('upload-cag', null, InputOption::VALUE_NONE, "Upload CAG.");
    }

    public function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $directory = $input->getOption('directory');
        $list = $input->getOption('list');
        $uploadCag = $input->getOption('upload-cag');

        $files = $this->geminiClient->files();

        if ($list) {
            print_r($this->geminiClient->cachedContents()->list());
            // print_r($files->list());
            return Command::SUCCESS;
        }

        if ($uploadCag) {
            // $meta = $files->upload(
            //     filename: $this->cagDir . "/" . "entity.json",
            //     displayName: "entity"
            // );
            //
            // do {
            //     $io->info("uploading...");
            //     sleep(2);
            //     $meta = $files->metadataGet($meta->uri);
            // } while (!$meta->state->complete());

            $this->geminiClient->cachedContents()->create(
                model: "gemini-2.0-flash",
                ttl: "3600s",
                displayName: "gelish",
                // parts: new UploadedFile($meta->uri, MimeType::from($meta->mimeType))
                parts: new UploadedFile("https://generativelanguage.googleapis.com/v1beta/files/jsq17s8qhdke", MimeType::from("application/json"))
            );

            return Command::SUCCESS;
        }

        $prompt = <<<EOP
        Following this format: ```"Pro LED Light": [
            {"category": "Brand Information", "content": {"brand_name": "Gelish", "founder_and_ceo": "Danny Haile", "brand_priority": "Quality is the #1 priority for the brand.", "key_innovation": "Gelish is the first gel polish ever invented with a United States and international patented formula.", "website": "www.Gelish.com", "press_contacts": [{"name": "Morgan Haile", "email": "morgan@nailalliance.com"}, {"name": "Kristen Chavez", "email": "kchavez@nailalliance.com"}, {"email": "mhaile@nailalliance.com"}, {"email": "lestrada@nailalliance.com"}, {"email": "pr@nailalliance.com"}, {"name": "Yvette Masterson", "email": "yvettemasterson@yccagency.com"}]}},
            {"category": "Product Line", "content": {"product_line_name": "Gelish Art Form Gel", "technology": "2D Technology™", "tagline": "Define and Design", "description": "A one-stroke nail art formula for creating defined art with perfect opacity. It is formulated for total artistic control and creating crisp, defined nail art.", "launch_date": "Fall 2018", "features": {"performance": ["One-stroke nail art formula", "Perfect, complete opacity", "No wrinkling", "No marbling", "No inhibition layer after curing", "Enables creation of fine lines"], "color": ["Pigment-intense shades", "Can be mixed to create thousands of custom colors"]}, "packaging": {"name": "Smart Jar", "features": ["Patent-Pending jar design", "Features a sturdy base that won't tip or roll", "Includes a comfort grip", "Has a built-in brush wiper to control product pickup and wipe off excess gel"]}, "application": {"compatibility": "Ideal for use on Gelish® Soak-Off Gel Polish and Gelish PolyGEL® Nail Enhancements.", "process": {"wipe": "Apply after curing the second coat of gel polish or after curing PolyGel. Dip the brush into the gel and use the built-in wiper to get the desired amount of product.", "stroke": "Create the desired nail art design.", "cure": "Cure for 30 seconds.", "finish": "Finish with Gelish Top It Off."}, "removal": "Soft file to remove the Art Form Gel."}, "shades_and_kits": {"total_shades": 24, "availability": "Shades are sold in open stock and in 4 color family packs.", "color_family_kits": [{"name": "Essentials Color Gel Kit", "description": "Design must-haves for creating an entire spectrum of shades.", "item_number": "1121794"}, {"name": "Pastels Color Gel Kit", "description": "Ethereal hues for exceptionally sweet finishes.", "item_number": "1121795"}, {"name": "Neons Color Gel Kit", "description": "Shades with the power to electrify your artistry!.", "item_number": "1121796"}, {"name": "Effects Color Gel Kit", "description": "Shimmering shades for artistry that shines above the rest!.", "item_number": "1121797"}], "retail_and_salon_support": {"display": "24 Facing Display", "description": "An empty display that holds 3-4 pieces of every Art Form color.", "item_number": "1139000"}}}},
            {"category": "Product", "content": {"product_name": "Gelish Micro Striper Brush", "description": "The finest and smallest detail brush, perfect for nail art.", "features": ["Has shorter and fewer bristles for complete control and precision.", "The small handle allows for easy workability."], "compatibility": "Works great with Gelish Art Form Gels.", "pricing": {"salon_price": 11.99}, "item_number": "1168010"}},
            {"category": "Product", "content": {"product_name": "Gelish MINI On The Go Electric Nail File", "description": "A sleek, light-weight and easy to hold design that has been perfectly crafted for at-home nail DIYers. This electric nail file can be used for shaping, filing, and manicuring the natural nail as well as removing gels and tips.", "features": ["3 Speeds For Manicuring vs. Removal", "Easy On/Off Power Button", "Reverse Rotation Option", "Safety Auto Shut-Off", "12 Bits and 6 Sanding Bands", "Cordless and Rechargeable", "Up to 60 Minutes Battery Life", "Work light for added detailing visibility"], "launch_date": "Spring 2024", "compatibility": "Works perfectly with all of our Gelish MINI nail products including: Gelish Soak-Off Gel Polish, Gelish Xpress Dip N Brush and Soft Gel Nail Tips.", "pricing": {"salon_price": 29.99, "distributor_price": 17.99}, "item_number": "1168241", "display_option": {"name": "4PC DISPLAY", "item_number": "1230057", "pricing": {"salon_price": 119.96, "distributor_price": 71.96}}}},
            {"category": "Product", "content": {"product_name": "Gelish Pro LED Light", "power": "30 Watts", "features": ["Acetone resistant", "Autosensor", "Cures all five fingers", "Removable tray for easy sanitation and pedicure friendly", "Lightweight, ergonomic design", "2 pre-programmed auto timers (30 & 60 seconds)"], "lifespan": "Up to 50,000 hours of performance guaranteed", "warranty": "1 year", "item_numbers": {"US": "1168087", "UK": "1168088", "EU": "1168089", "AU": "1168090"}}},
            {"category": "Product", "content": {"product_name": "Gelish 18G Plus with Comfort Cure™", "features": ["Comfort Cure setting builds LED power over a 60-second period which helps mitigate heat spikes for sensitive clients", "60-second setting optimized for flawless curing with PolyGEL® white applications", "Patented eyeShield™ (limits light exposure) US PATENT 8,739,431", "Safelight™ Technology", "Illuminated comfort pad", "Scratch and acetone resistant", "Magnetic tray for easy sanitizing and effortless pedicure services", "Digital touch screen display", "Countdown feature", "On-off feature", "Meets standard safety compliances world-wide"], "launch_date": "January 2018"}},
            {"category": "Product", "content": {"product_name": "Gelish 18G Unplugged", "description": "Cordless and rechargeable LED light.", "features": ["Intelligent Power Assist™ for consistent, high-performance battery-powered curing", "Displays real-time battery level, power level and LED countdown", "Backlit Gelish logo visualizes battery power level eliminating guesswork", "Ideal 5, 30, and 60-second settings plus on/off button", "60-second setting mitigates heat spikes with exclusive Gelish® Comfort Cure™ technology", "Built-in handle for convenient mobility", "LG Lithium battery included", "Motion-activated sensors", "High-intensity diamond reflectors for even curing", "Patented EyeShield™", "Patented removable magnetic tray for easy sanitizing", "Full-five finger cure", "Acetone resistant finish"], "power": "36-watts total (18, 2-watt LEDs)", "lifespan": "Consistent power & performance from 0 to 50,000 hours of use", "suggested_salon_price": 399.95, "launch_date": "Winter 2018"}},
            {"category": "Product", "content": {"product_name": "Gelish VORTEX™ Portable Nail Dust Collector", "description": "A space-saving design with unparalleled airborne dust collection ensuring cleaner air for nail technicians and clients without compromising the speed of e-file services.", "features": ["Portable and Rechargeable", "Ultra-slim and space-saving design", "Supercharged Vortex-Powered Fan (4300 RPM)", "Acetone Proof Casing", "Power Indicator Light", "Flip-foot stand", "Contour curve for maximum client comfort", "Sanitizable magnetic grille", "Washable filter", "Consistent suction regardless of battery level"], "dimensions": {"unit_width": "210 mm/8.27 inches", "unit_height": "76 mm/3 inches", "unit_depth": "302.7 mm/11.92 inches", "unit_weight": "995 g/35 Oz. (2.2 lbs)"}, "filter_dimensions": {"width": "176 mm/6.93 inches", "height": "252 mm/9.92 inches"}}},
            {"category": "Policy", "content": {"policy_name": "Drill & Light Exchange Policy (after 30 days of purchase)", "required_information": ["Name (as listed under Warranty, if registered)", "Copy of original receipt", "Distributor name where product was purchased (must be authorized distributor)", "Serial number on product", "Shipping address", "Phone number", "Picture or video of product problem", "Brief statement of problem"], "process": ["Once the required information is received, it will be submitted to management for approval.", "If approved, the customer will be issued a Return Receipt Number.", "Directions on how to return the 'defective' product will be provided.", "Customer must not return anything without an issued Return Receipt Number."], "expedited_replacement_option": {"condition": "If the customer has met all requirements and received approval but cannot work without the product, a replacement can be sent before receiving the defective item.", "procedure": ["A Call Tag (Return Label) will be sent.", "A credit card is required from the customer.", "A $200 insurance fee will be charged to the credit card before the replacement is shipped.", "The fee is $100 for the 5-45 light.", "Once the defective product is received, the insurance fee will be refunded."]}}},
            {"category": "Policy", "content": {"policy_name": "Harmony LED Light Warranty & Repairs", "requirements": ["1 LIGHT PER SHEET, IF REPAIRING MULTIPLE, PLEASE FILL OUT FOR EACH", "COPY OF RECEIPT OF PURCHASE FROM AUTHORIZED DISTRIBUTOR REQUIRED FOR WARRANTY TO BE HONORED"], "process": ["Submit completed form by email to repairs@nailalliance.com", "Once the information is received, it will be submitted to management for approval.", "Once approved, an email will be sent including a Return Receipt Number for the claim.", "Do not send product(s) back without a Return Receipt Number.", "Place a copy of the form and the issued Return Receipt in the box.", "Once the defective item is received, in-house technicians will place the item under full review.", "You will be contacted within 10 business days with confirmation of warranty replacement or an estimate for repairs."], "warranty_coverage": "Warranty covers sensors, panel function and lights. Warranty does not cover everyday wear and tear or if light has been disassembled and not used in the normal course of nail business."}}
        ]```
        Read the attached documents and summarize it it into structured data to feed as CAG to an LLM. All these documents belong to the Gelish Brand. Provide the output in jsonl format. Don't add citations.
        EOP;

        if (!empty($directory)) {
            $dir = $this->filesystem->exists($directory);

            if (!$dir) {
                $io->error("Directory '{$directory}' does not exist.");
                return Command::FAILURE;
            }

            $this->uploadFiles($directory, $io, $files);

            $count = count($files->list(100)->files);

            $io->success("Uploaded $count files");
            return Command::SUCCESS;
        }

        $io->info("Parsing...");

        $results = [];

        $nextPageToken = "";

        $filesListFiles = [];

        while (!is_null($nextPageToken))
        {
            $filesList = $files->list(50, $nextPageToken === "" ? null : $nextPageToken);
            foreach ($filesList->files as $file_) {
                $filesListFiles[] = $file_;
            }
            $nextPageToken = $filesList->nextPageToken;
        }

        $io->progressStart(count($filesListFiles));

        foreach ($filesListFiles as &$file) {
            try {
                $result = $this->geminiModel->generateContent([
                    $prompt,
                    new UploadedFile(fileUri: $file->uri, mimeType: MimeType::APPLICATION_PDF),
                ]);

                $results[] = $result->text();
            } catch (\Exception $e) {
                $io->error($e->getMessage());
                continue;
            }
            $files->delete($file->uri);
            $io->progressAdvance();
        }

        $io->progressFinish();

        $io->success("Finished parsing.");

        $this->filesystem->dumpFile(__DIR__ . "artistic.txt", print_r($results, true));

        echo print_r($results, true) . PHP_EOL;

        return Command::SUCCESS;
    }

    /**
     * @param mixed $directory
     * @param SymfonyStyle $io
     * @param FilesContract $files
     * @return void
     * @throws Exception
     */
    private function uploadFiles(mixed $directory, SymfonyStyle $io, FilesContract $files): void
    {
        foreach (glob($directory . DIRECTORY_SEPARATOR . "*", GLOB_BRACE) as $absoluteFilePath) {
            if (is_dir($absoluteFilePath)) {
                $this->uploadFiles($absoluteFilePath, $io, $files);
            }

            if (mb_substr($absoluteFilePath, -4) !== ".pdf") {
                continue;
            }

            $mimeType = match (mime_content_type($absoluteFilePath)) {
                "application/pdf" => MimeType::APPLICATION_PDF,
            };

            $io->info("start uploading $absoluteFilePath");
            $meta = $files->upload(
                filename: $absoluteFilePath,
                mimeType: $mimeType,
            );

            do {
                $io->info("uploading...");
                sleep(2);
                $meta = $files->metadataGet($meta->uri);
            } while (!$meta->state->complete());

            $io->info("Done uploading.");

            $io->info($meta->uri);

            if ($meta->state == FileState::Failed) {
                throw new Exception("Upload failed:\n" . json_encode($meta->toArray(), JSON_PRETTY_PRINT));
            }

        }
    }
}
