<?php

namespace App\Repository\Assets;

use App\Entity\Assets\Brands;
use App\Entity\Assets\Categories;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Categories>
 */
class CategoriesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Categories::class);
    }

    /**
     * @return Categories[] Returns an array of Category objects that have active assets
     */
    public function findWithActiveAssets(): array
    {
        return $this->createQueryBuilder('c')
            ->innerJoin('c.assets', 'a')
            ->where('a.status = :status')
            ->setParameter('status', 'active')
            ->getQuery()
            ->getResult();
    }

    /**
     * @return Categories[]
     */
    public function findActiveByParentBrand(Brands $brand): array
    {
        return $this->createQueryBuilder('c')
            ->innerJoin('c.assets', 'a')
            ->innerJoin('a.brand', 'b')
            ->where('b.brands = :parentBrand') // Filter by the parent brand
            ->andWhere('a.status = :status')
            ->setParameter('parentBrand', $brand)
            ->setParameter('status', 'active')
            ->distinct()
            ->orderBy('c.name', 'ASC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Finds all categories that are associated with active assets
     * belonging to a specific family of brands.
     *
     * @param array $brandIds
     * @return Categories[]
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
            ->andWhere('a.status = :status')
            ->setParameter('brandIds', $brandIds)
            ->setParameter('status', 'active')
            ->distinct()
            ->orderBy('c.name', 'ASC')
            ->getQuery()
            ->getResult();
    }

    //    /**
    //     * @return Categories[] Returns an array of Categories objects
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

    //    public function findOneBySomeField($value): ?Categories
    //    {
    //        return $this->createQueryBuilder('c')
    //            ->andWhere('c.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
