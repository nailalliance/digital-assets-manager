<?php

namespace App\Repository\Assets;

use App\Entity\Assets\Brands;
use App\Entity\Assets\Collections;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Collections>
 */
class CollectionsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Collections::class);
    }

    /**
     * @return Collections[] Returns an array of Collection objects that have active assets
     */
    public function findWithActiveAssets(): array
    {
        return $this->createQueryBuilder('c')
            ->innerJoin('c.assets', 'a')
            ->where('a.status = :status')
            ->setParameter('status', 'active')
            ->orderBy('c.year', 'DESC')
            ->addOrderBy('c.id', 'DESC')
            ->getQuery()
            ->getResult();
    }

    /**
     * @return Collections[]
     */
    public function findActiveByParentBrand(Brands $brand): array
    {
        return $this->createQueryBuilder('c')
            ->innerJoin('c.assets', 'a')
            ->innerJoin('a.brand', 'b')
            ->where('b.brands = :parentBrand')
            ->andWhere('c.status = :collectionsStatus')
            ->andWhere('a.status = :status')
            ->setParameter('parentBrand', $brand)
            ->setParameter('collectionsStatus', true)
            ->setParameter('status', 'active')
            ->distinct()
            ->orderBy('c.year', 'DESC')
            ->addOrderBy('c.name', 'ASC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Finds all collections that are associated with active assets
     * belonging to a specific family of brands.
     *
     * @param array $brandIds
     * @return Collections[]
     */
    public function findActiveByBrandFamily(array $brandIds): array
    {
        if (empty($brandIds)) {
            return [];
        }

        return $this->createQueryBuilder('c')
            ->innerJoin('c.assets', 'a')
            ->innerJoin('a.brand', 'b')
            ->where('b.id IN (:brandIds)')
            ->andWhere('c.status = :collectionStatus')
            ->andWhere('a.status = :status')
            ->setParameter('brandIds', $brandIds)
            ->setParameter('collectionStatus', true)
            ->setParameter('status', 'active')
            ->distinct()
            ->orderBy('c.year', 'DESC')
            ->addOrderBy('c.name', 'ASC')
            ->getQuery()
            ->getResult();
    }

    //    /**
    //     * @return Collections[] Returns an array of Collections objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('c')
    //            ->andWhere('c.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('c.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Collections
    //    {
    //        return $this->createQueryBuilder('c')
    //            ->andWhere('c.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
