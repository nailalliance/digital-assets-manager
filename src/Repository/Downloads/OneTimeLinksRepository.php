<?php

namespace App\Repository\Downloads;

use App\Entity\Downloads\OneTimeLinks;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<OneTimeLinks>
 */
class OneTimeLinksRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, OneTimeLinks::class);
    }

    /**
     * @return list<OneTimeLinks>
     */
    public function findStalePendingDirectShares(\DateTimeImmutable $updatedBefore): array
    {
        return $this->createQueryBuilder('o')
            ->andWhere('o.downloadList IS NULL')
            ->andWhere('o.assets IS NULL')
            ->andWhere('o.uploadCompletedAt IS NULL')
            ->andWhere('(o.expectedFileCount IS NOT NULL OR o.temporaryFiles IS NOT NULL OR o.tusUploadKey IS NOT NULL)')
            ->andWhere('o.updatedAt <= :updatedBefore')
            ->setParameter('updatedBefore', $updatedBefore)
            ->orderBy('o.updatedAt', 'ASC')
            ->getQuery()
            ->getResult();
    }

    /**
     * @return list<OneTimeLinks>
     */
    public function findExpiredCompletedDirectShares(\DateTimeImmutable $expiredBefore): array
    {
        return $this->createQueryBuilder('o')
            ->andWhere('o.downloadList IS NULL')
            ->andWhere('o.assets IS NULL')
            ->andWhere('o.uploadCompletedAt IS NOT NULL')
            ->andWhere('o.expirationDate <= :expiredBefore')
            ->setParameter('expiredBefore', $expiredBefore)
            ->orderBy('o.expirationDate', 'ASC')
            ->getQuery()
            ->getResult();
    }

    //    /**
    //     * @return OneTimeLinks[] Returns an array of OneTimeLinks objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('o')
    //            ->andWhere('o.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('o.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?OneTimeLinks
    //    {
    //        return $this->createQueryBuilder('o')
    //            ->andWhere('o.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
