<?php

namespace App\Repository\Assets;

use App\Entity\Assets\Assets;
use App\Entity\Assets\AssetStatusEnum;
use App\Entity\User;
use App\Service\MimeTypesGroups;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\QueryBuilder;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\SecurityBundle\Security;

/**
 * @extends ServiceEntityRepository<Assets>
 */
class AssetsRepository extends ServiceEntityRepository
{
    public const ADMIN_PAGINATOR_PER_PAGE = 100;

    public function __construct(
        ManagerRegistry $registry,
        private Security $security
    )
    {
        parent::__construct($registry, Assets::class);
    }

    private function applyBrandRestrictions(QueryBuilder $qb): QueryBuilder
    {
        /** @var ?User $user */
        $user = $this->security->getUser();

        if (null === $user || $this->security->isGranted('ROLE_FTP_DESIGNER'))
        {
            return $qb;
        }

        $allowedBrandIds = $user->getRestrictedBrands()->map(fn ($brand) => $brand->getId())->toArray();

        if (empty($allowedBrandIds)) {
            // if user has no brands, they see nothing
            return $qb->andWhere('1 = 0');
        }

        $qb->innerJoin('a.brand', 'b_join')
            ->innerJoin('b_join.brands', 'p_join') // Join from child brand to parent brand
            ->andWhere($qb->expr()->in('p_join.id', ':allowedBrandIds'))
            ->setParameter('allowedBrandIds', $allowedBrandIds);

        return $qb;
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
            $mimeTypes = MimeTypesGroups::getMimeTypes($fileTypeGroup);
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
            $qb->innerJoin('a.categories', 'c')
                ->andWhere('c.status = :categoryStatus')
                ->andWhere('c.id IN (:categoryIds)')
                ->setParameter('categoryIds', $categoryIds)
                ->setParameter('categoryStatus', true);
        }
        if (!empty($collectionIds)) {
            $qb->innerJoin('a.collections', 'coll')
                ->andWhere('coll.status = :collectionStatus')
                ->andWhere('coll.id IN (:collectionIds)')
                ->setParameter('collectionIds', $collectionIds)
                ->setParameter('collectionStatus', true);
        }
        if (!empty($brandIds)) {
            $qb->innerJoin('a.brand', 'b')
                ->andWhere('b.status = :brandStatus')
                ->andWhere('(b.id IN (:brandIds) OR b.brands IN (:brandIds))')
                ->setParameter('brandIds', $brandIds)
                ->setParameter('brandStatus', true);
        }

        $qb = $this->applyBrandRestrictions($qb);

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
            ->andWhere('b.status = :brandStatus')
            ->andWhere('a.status = :status')
            ->setParameter('brandIds', $brandIds)
            ->setParameter('brandStatus', true)
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

    public function findForAdminList(
        int $offset,
        ?string $searchQuery,
        ?int $brandId,
        ?int $categoryId,
        ?int $collectionId,
        ?AssetStatusEnum $status
    ): Paginator
    {
        $qb = $this->createQueryBuilder('a')
            ->leftJoin('a.itemCodes', 'ic')
            ->orderBy('a.createdAt', 'DESC')
            ->setMaxResults(self::ADMIN_PAGINATOR_PER_PAGE)
            ->setFirstResult($offset);

        if ($searchQuery)
        {
            $qb->andWhere($qb->expr()->orX(
                $qb->expr()->eq('a.id', ':id'),
                $qb->expr()->like('a.name', ':query'),
                $qb->expr()->like('ic.code', ':query')
            ))
            ->setParameter('id', intval($searchQuery))
            ->setParameter('query', '%' . $searchQuery . '%');
        }

        if ($brandId)
        {
            $qb->leftJoin('a.brand', 'b')
                ->andWhere('b.id = :brandId')
                ->setParameter('brandId', $brandId);
        }

        if ($categoryId)
        {
            $qb->leftJoin('a.categories', 'c')
                ->andWhere('c.id = :categoryId')
                ->setParameter('categoryId', $categoryId);
        }

        if ($collectionId)
        {
            $qb->leftJoin('a.collections', 'coll')
                ->andWhere('coll.id = :collectionId')
                ->setParameter('collectionId', $collectionId);
        }

        if ($status)
        {
            $qb->andWhere('a.status = :status')
                ->setParameter('status', $status);
        }

        return new Paginator($qb->getQuery(), false);
    }

    /**
     * @return Assets[] Returns an array of Assets objects
     */
    public function searchByName(?string $searchTerm): array
    {
        $queryBuilder = $this->createQueryBuilder('a');

        if ($searchTerm) {
            $queryBuilder->andWhere('a.name LIKE :searchTerm')
                ->setParameter('searchTerm', '%' . $searchTerm . '%');
        }

        return $queryBuilder
            ->orderBy('a.createdAt', 'DESC')
            ->getQuery()
            ->getResult()
            ;
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
