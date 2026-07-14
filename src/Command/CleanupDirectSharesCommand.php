<?php

namespace App\Command;

use App\Repository\Downloads\OneTimeLinksRepository;
use App\Service\DirectShareCleanupService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:cleanup-direct-shares',
    description: 'Removes abandoned direct-share uploads, expired direct-share links, and stale Tus artifacts.',
)]
final class CleanupDirectSharesCommand extends Command
{
    public function __construct(
        private readonly OneTimeLinksRepository $oneTimeLinksRepository,
        private readonly EntityManagerInterface $entityManager,
        private readonly DirectShareCleanupService $directShareCleanupService,
    ) {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->addOption(
                'stale-hours',
                null,
                InputOption::VALUE_OPTIONAL,
                'How long an incomplete direct-share session can sit idle before cleanup removes it.',
                24
            )
            ->addOption(
                'dry-run',
                null,
                InputOption::VALUE_NONE,
                'Show what would be deleted without removing files, cache entries, or database rows.'
            );
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $staleHours = max(1, (int) $input->getOption('stale-hours'));
        $dryRun = (bool) $input->getOption('dry-run');
        $now = new \DateTimeImmutable('now', new \DateTimeZone('UTC'));
        $staleBefore = $now->modify(sprintf('-%d hours', $staleHours));

        $io->title($dryRun ? 'Direct Share Cleanup Preview' : 'Direct Share Cleanup');
        $io->text(sprintf('Stale incomplete shares older than %d hour(s) will be %s.', $staleHours, $dryRun ? 'reported' : 'removed'));

        $expiredTusReport = $this->directShareCleanupService->cleanupExpiredTusUploads($dryRun);
        $pendingShares = $this->oneTimeLinksRepository->findStalePendingDirectShares($staleBefore);
        $expiredCompletedShares = $this->oneTimeLinksRepository->findExpiredCompletedDirectShares($now);

        $pendingRemoved = 0;
        $expiredRemoved = 0;
        $deletedFiles = $expiredTusReport['deletedFiles'];
        $deletedCacheEntries = $expiredTusReport['deletedCacheEntries'];

        foreach ($pendingShares as $oneTimeLink) {
            $artifactReport = $this->directShareCleanupService->cleanupShareArtifacts($oneTimeLink, $dryRun);
            $deletedFiles += $artifactReport['deletedFiles'];
            $deletedCacheEntries += $artifactReport['deletedCacheEntries'];

            if (!$dryRun) {
                $this->entityManager->remove($oneTimeLink);
            }

            $pendingRemoved++;
        }

        foreach ($expiredCompletedShares as $oneTimeLink) {
            $artifactReport = $this->directShareCleanupService->cleanupShareArtifacts($oneTimeLink, $dryRun);
            $deletedFiles += $artifactReport['deletedFiles'];
            $deletedCacheEntries += $artifactReport['deletedCacheEntries'];

            if (!$dryRun) {
                $this->entityManager->remove($oneTimeLink);
            }

            $expiredRemoved++;
        }

        if (!$dryRun && ($pendingRemoved > 0 || $expiredRemoved > 0)) {
            $this->entityManager->flush();
        }

        $io->definitionList(
            ['Expired Tus uploads', $expiredTusReport['expiredUploads']],
            [$dryRun ? 'Stale pending shares to remove' : 'Stale pending shares removed', $pendingRemoved],
            [$dryRun ? 'Expired completed shares to remove' : 'Expired completed shares removed', $expiredRemoved],
            [$dryRun ? 'Files to delete' : 'Files deleted', $deletedFiles],
            [$dryRun ? 'Tus cache entries to delete' : 'Tus cache entries deleted', $deletedCacheEntries],
        );

        if ($dryRun) {
            $io->success('Cleanup preview completed.');
        } else {
            $io->success('Cleanup completed.');
        }

        return Command::SUCCESS;
    }
}
