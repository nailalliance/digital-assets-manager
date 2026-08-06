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

    private function applyVisibilityRestrictions(QueryBuilder $qb): QueryBuilder
    {
        /** @var ?User $user */
        $user = $this->security->getUser();

        if ($this->security->isGranted('ROLE_FTP_DESIGNER')) {
            return $qb
                ->andWhere('a.status IN (:visibleStatuses)')
                ->setParameter('visibleStatuses', [
                    AssetStatusEnum::ACTIVE->value,
                    AssetStatusEnum::DESIGNER->value,
                ]);
        }

        if ($user === null) {
            return $qb->andWhere('1 = 0');
        }

        $regularBrandIds = $this->getBrandTreeIds($user->getRestrictedBrands());
        $designerBrandIds = $this->getBrandTreeIds($user->getDesignerAccessBrands());
        $designerCategoryIds = $this->getCategoryTreeIds($user->getDesignerAccessCategories());

        $qb->leftJoin('a.brand', 'visibilityBrand')
            ->leftJoin('a.categories', 'visibilityCategory');

        $visibility = $qb->expr()->orX();

        if ($regularBrandIds !== []) {
            $visibility->add($qb->expr()->andX(
                $qb->expr()->eq('a.status', ':activeStatus'),
                $qb->expr()->in('visibilityBrand.id', ':regularBrandIds'),
            ));
            $qb->setParameter('activeStatus', AssetStatusEnum::ACTIVE->value)
                ->setParameter('regularBrandIds', $regularBrandIds);
        }

        $designerTaxonomies = $qb->expr()->orX();
        if ($designerBrandIds !== []) {
            $designerTaxonomies->add($qb->expr()->in('visibilityBrand.id', ':designerBrandIds'));
            $qb->setParameter('designerBrandIds', $designerBrandIds);
        }
        if ($designerCategoryIds !== []) {
            $designerTaxonomies->add($qb->expr()->in('visibilityCategory.id', ':designerCategoryIds'));
            $qb->setParameter('designerCategoryIds', $designerCategoryIds);
        }

        if ($designerTaxonomies->count() > 0) {
            $visibility->add($qb->expr()->andX(
                $qb->expr()->eq('a.status', ':designerStatus'),
                $designerTaxonomies,
            ));
            $qb->setParameter('designerStatus', AssetStatusEnum::DESIGNER->value);
        }

        if ($visibility->count() === 0) {
            return $qb->andWhere('1 = 0');
        }

        $qb->andWhere($visibility);

        return $qb;
    }

    private function getBrandTreeIds(iterable $brands): array
    {
        $ids = [];
        $visited = [];
        $queue = is_array($brands) ? $brands : iterator_to_array($brands);

        while ($brand = array_pop($queue)) {
            $objectId = spl_object_id($brand);
            if (isset($visited[$objectId])) {
                continue;
            }

            $visited[$objectId] = true;
            if ($brand->getId() !== null) {
                $ids[] = $brand->getId();
            }

            foreach ($brand->getParent() as $child) {
                $queue[] = $child;
            }
        }

        return array_values(array_unique($ids));
    }

    private function getCategoryTreeIds(iterable $categories): array
    {
        $ids = [];
        $visited = [];
        $queue = is_array($categories) ? $categories : iterator_to_array($categories);

        while ($category = array_pop($queue)) {
            $objectId = spl_object_id($category);
            if (isset($visited[$objectId])) {
                continue;
            }

            $visited[$objectId] = true;
            if ($category->getId() !== null) {
                $ids[] = $category->getId();
            }

            foreach ($category->getParent() as $child) {
                $queue[] = $child;
            }
        }

        return array_values(array_unique($ids));
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
            ->where('a.embargoDate IS NULL OR a.embargoDate <= :now')
            ->andWhere('a.expirationDate IS NULL OR a.expirationDate >= :now')
            ->setParameter('now', new \DateTimeImmutable());

        $qb = $this->applyVisibilityRestrictions($qb);

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

        $qb = $this->createQueryBuilder('a')
            ->innerJoin('a.brand', 'b')
            ->where('b.id IN (:brandIds)')
            ->andWhere('b.status = :brandStatus')
            ->andWhere('a.embargoDate IS NULL OR a.embargoDate <= :now')
            ->andWhere('a.expirationDate IS NULL OR a.expirationDate >= :now')
            ->setParameter('brandIds', $brandIds)
            ->setParameter('brandStatus', true)
            ->setParameter('now', new \DateTimeImmutable());

        $this->applyVisibilityRestrictions($qb);

        return $qb
            ->distinct()
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

    public function findOneByThumbnailFilename(string $filename): ?Assets
    {
        return $this->createQueryBuilder('a')
            ->where('a.thumbnailPath LIKE :thumbnailSuffix')
            ->setParameter('thumbnailSuffix', '%/' . $filename)
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();
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
