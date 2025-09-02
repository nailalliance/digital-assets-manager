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
    public function findByFilters(
        ?array $categoryIds,
        ?array $collectionIds,
        ?array $brandIds,
        ?string $fileTypeGroup,
        int $limit,
        int $offset,
        ?array $assetIds = null
    ): Paginator
    {
        $qb = $this->createQueryBuilder('a')
            ->where('a.status = :status')
            ->andWhere('a.embargoDate IS NULL OR a.embargoDate <= :now')
            ->andWhere('a.expirationDate IS NULL OR a.expirationDate >= :now')
            ->setParameter('status', 'active')
            ->setParameter('now', new \DateTimeImmutable());

        if ($fileTypeGroup) {
            $mimeTypes = $this->getMimeTypesForGroup($fileTypeGroup);
            if (!empty($mimeTypes)) {
                $qb->andWhere('a.mime_type IN (:mimeTypes)')
                    ->setParameter('mimeTypes', $mimeTypes);
            }
        }

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
            $qb->innerJoin('a.brand', 'b')->andWhere('(b.id IN (:brandIds) OR b.brands IN (:brandIds))')->setParameter('brandIds', $brandIds);
        }

        $qb->orderBy('a.createdAt', 'DESC')
            ->setFirstResult($offset)
            ->setMaxResults($limit);

        return new Paginator($qb->getQuery(), true);
    }

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

    /**
     * Finds assets by their IDs and eagerly loads all necessary relations
     * to prevent the N+1 query problem.
     *
     * @param array $ids
     * @return Assets[]
     */
    public function findByIdsWithRelations(array $ids): array
    {
        if (empty($ids)) {
            return [];
        }

        return $this->createQueryBuilder('a')
            ->select('a, b, c, coll, t, ic') // Select the asset and all related entities
            ->leftJoin('a.brand', 'b')
            ->leftJoin('a.categories', 'c')
            ->leftJoin('a.collections', 'coll')
            ->leftJoin('a.tags', 't')
            ->leftJoin('a.itemCodes', 'ic')
            ->where('a.id IN (:ids)')
            ->setParameter('ids', $ids)
            ->getQuery()
            ->getResult();
    }

    /**
     * Maps a simple group name to an array of MIME types.
     */
    private function getMimeTypesForGroup(string $group): array
    {
        $map = [
            'images' => ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/tiff', 'image/svg+xml', 'image/x-eps'],
            'videos' => ['video/mp4', 'video/quicktime', 'video/x-msvideo'],
            'audio' => ['audio/mpeg', 'audio/wav', 'audio/aiff'],
            'documents' => ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
            '3d' => ['model/gltf-binary', 'model/obj'],
            'code' => ['text/html', 'text/css', 'application/javascript'],
            'zip' => ['application/zip'],
        ];

        return $map[$group] ?? [];
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
