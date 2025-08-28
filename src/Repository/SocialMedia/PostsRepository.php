<?php

namespace App\Repository\SocialMedia;

use App\Entity\SocialMedia\Posts;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Posts>
 */
class PostsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Posts::class);
    }

    /**
     * Finds all posts for a given brand within a specific date range.
     * @return Posts[]
     */
    public function findAllByBrand(?int $brandId, \DateTimeInterface $start, \DateTimeInterface $end): array
    {
        $qb = $this->createQueryBuilder('p')
            ->andWhere('p.postAt BETWEEN :start AND :end')
            ->setParameter('start', $start)
            ->setParameter('end', $end)
            ->orderBy('p.postAt', 'ASC');

        if ($brandId) {
            $qb->andWhere('p.brand = :brandId')
                ->setParameter('brandId', $brandId);
        }

        return $qb->getQuery()->getResult();
    }

    /**
     * Finds all future posts for a given brand within a specific date range.
     * @return Posts[]
     */
    public function findFutureByBrand(?int $brandId, \DateTimeInterface $start, \DateTimeInterface $end): array
    {
        $qb = $this->createQueryBuilder('p')
            ->where('p.postAt >= :now')
            ->andWhere('p.postAt BETWEEN :start AND :end')
            ->setParameter('now', new \DateTimeImmutable())
            ->setParameter('start', $start)
            ->setParameter('end', $end)
            ->orderBy('p.postAt', 'ASC');

        if ($brandId) {
            $qb->andWhere('p.brand = :brandId')
                ->setParameter('brandId', $brandId);
        }

        return $qb->getQuery()->getResult();
    }

    //    /**
    //     * @return Posts[] Returns an array of Posts objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('p')
    //            ->andWhere('p.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('p.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Posts
    //    {
    //        return $this->createQueryBuilder('p')
    //            ->andWhere('p.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
