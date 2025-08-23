<?php

namespace App\Repository\Assets;

use App\Entity\Assets\Assets;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Assets>
 */
class AssetsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Assets::class);
    }

    /**
     * Finds assets based on a dynamic set of filters.
     *
     * @param int|null $categoryId
     * @param int|null $collectionId
     * @param array|null $brandIds
     * @return Assets[]
     */
    public function findByFilters(?int $categoryId, ?int $collectionId, ?array $brandIds): array
    {
        $qb = $this->createQueryBuilder('a')
            // Always ensure assets are active and within their valid date ranges
            ->where('a.status = :status')
            ->andWhere('a.embargoDate IS NULL OR a.embargoDate <= :now')
            ->andWhere('a.expirationDate IS NULL OR a.expirationDate >= :now')
            ->setParameter('status', 'active')
            ->setParameter('now', new \DateTimeImmutable());

        if ($categoryId) {
            $qb->innerJoin('a.categories', 'c')
                ->andWhere('c.id = :categoryId')
                ->setParameter('categoryId', $categoryId);
        }

        if ($collectionId) {
            $qb->innerJoin('a.collections', 'coll')
                ->andWhere('coll.id = :collectionId')
                ->setParameter('collectionId', $collectionId);
        }

        if (!empty($brandIds)) {
            $qb->innerJoin('a.brand', 'b')
                ->andWhere('b.id IN (:brandIds)')
                ->setParameter('brandIds', $brandIds);
        }

        return $qb->orderBy('a.createdAt', 'DESC')
            ->getQuery()
            ->getResult();
    }

    // Add this method to your BrandsRepository
    public function findWithActiveAssets(): array
    {
        return $this->createQueryBuilder('b')
            ->innerJoin('b.assets', 'a')
            ->where('a.status = :status')
            ->setParameter('status', 'active')
            ->getQuery()
            ->getResult();
    }

    //    /**
    //     * @return Assets[] Returns an array of Assets objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('a')
    //            ->andWhere('a.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('a.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Assets
    //    {
    //        return $this->createQueryBuilder('a')
    //            ->andWhere('a.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
