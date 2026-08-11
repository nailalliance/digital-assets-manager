<?php

namespace App\Repository;

use App\Entity\SiteNotification;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<SiteNotification>
 */
class SiteNotificationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, SiteNotification::class);
    }

    /**
     * @return list<SiteNotification>
     */
    public function findActiveAt(\DateTimeImmutable $time): array
    {
        return $this->createQueryBuilder('notification')
            ->andWhere('notification.enabled = true')
            ->andWhere('notification.startsAt <= :time')
            ->andWhere('notification.endsAt > :time')
            ->setParameter('time', $time)
            ->orderBy('notification.startsAt', 'DESC')
            ->getQuery()
            ->getResult();
    }
}
