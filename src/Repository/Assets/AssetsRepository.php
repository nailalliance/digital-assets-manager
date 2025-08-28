<?php

namespace App\Repository\Assets;

use App\Entity\Assets\Assets;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Tools\Pagination\Paginator;
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
     * Finds assets based on a dynamic set of filters, optionally constrained to a list of IDs.
     *
     * @return Paginator
     */
    public function findByFilters(?array $categoryIds, ?array $collectionIds, ?array $brandIds, int $limit, int $offset, ?array $assetIds = null): Paginator
    {
        $qb = $this->createQueryBuilder('a')
            ->where('a.status = :status')
            ->andWhere('a.embargoDate IS NULL OR a.embargoDate <= :now')
            ->andWhere('a.expirationDate IS NULL OR a.expirationDate >= :now')
            ->setParameter('status', 'active')
            ->setParameter('now', new \DateTimeImmutable());

        // If asset IDs are provided from a search, filter by them first.
        if ($assetIds !== null) {
            if (empty($assetIds)) {
                // If the search returned no IDs, don't return any assets.
                $qb->andWhere('1 = 0');
            } else {
                $qb->andWhere('a.id IN (:assetIds)')
                    ->setParameter('assetIds', $assetIds);
            }
        }

        if (!empty($categoryIds)) {
            $qb->innerJoin('a.categories', 'c')->andWhere('c.id IN (:categoryIds)')->setParameter('categoryIds', $categoryIds);
        }
        if (!empty($collectionIds)) {
            $qb->innerJoin('a.collections', 'coll')->andWhere('coll.id IN (:collectionIds)')->setParameter('collectionIds', $collectionIds);
        }
        if (!empty($brandIds)) {
            $qb->innerJoin('a.brand', 'b')->andWhere('b.id IN (:brandIds)')->setParameter('brandIds', $brandIds);
        }

        $qb->orderBy('a.createdAt', 'DESC')
            ->setFirstResult($offset)
            ->setMaxResults($limit);

        return new Paginator($qb->getQuery(), true);
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

    public function findRecentByBrandFamily(array $brandIds, int $limit): array
    {
        if (empty($brandIds)) {
            return [];
        }

        return $this->createQueryBuilder('a')
            ->innerJoin('a.brand', 'b')
            ->where('b.id IN (:brandIds)')
            ->andWhere('a.status = :status')
            ->setParameter('brandIds', $brandIds)
            ->setParameter('status', 'active')
            ->orderBy('a.createdAt', 'DESC')
            ->setMaxResults($limit)
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
