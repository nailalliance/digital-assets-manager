<?php

namespace App\Repository\Downloads;

use App\Entity\Downloads\Lists;
use App\Entity\User;
use App\Repository\Assets\BrandsRepository;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\SecurityBundle\Security;

/**
 * @extends ServiceEntityRepository<Lists>
 */
class ListsRepository extends ServiceEntityRepository
{
    public const PAGINATOR_PER_PAGE = 100;
    public function __construct(
        ManagerRegistry $registry,
        private Security $security,
        private BrandsRepository $brandsRepository,
    )
    {
        parent::__construct($registry, Lists::class);
    }

    public function findPaginatedForUser(User $user, int $offset): Paginator
    {
        $query = $this->createQueryBuilder('l')
            ->andWhere('l.creator = :user')
            ->andWhere('l.name IS NOT NULL') // Only show named lists
            ->setParameter('user', $user)
            ->andWhere('l.status = :status')
            ->setParameter('status', true)
            ->orderBy('l.createdAt', 'DESC') // Most recent on top
            ->setMaxResults(self::PAGINATOR_PER_PAGE)
            ->setFirstResult($offset)
            ->getQuery();

        return new Paginator($query);
    }

    public function findPaginated(?string $query, int $offset): Paginator
    {
        /** @var User|null $user */
        $user = $this->security->getUser();

        $qb = $this->createQueryBuilder('l');


        if ($user && !$this->security->isGranted('ROLE_FTP_DESIGNER')) {
            $allowedBrandIds = $user->getRestrictedBrands()->map(fn($brand) => $brand->getId())->toArray();

            $criteria = Criteria::create();
                $criteria->where(Criteria::expr()->eq('brands', null));
                $criteria->andWhere(Criteria::expr()->notIn('id', $allowedBrandIds));

            $notAllowedBrands = $this->brandsRepository->matching($criteria);

            $notAllowedBrandIds = $notAllowedBrands->map(fn($brand) => $brand->getId())->toArray();

            $validListIds = $this->findAssetIds($notAllowedBrandIds);

            $qb->andWhere('l.id IN (:validListIds)')
                ->setParameter('validListIds', $validListIds);
        }

        $qb->andWhere('l.name IS NOT NULL')
            ->andWhere('l.status = :status')
            ->setParameter('status', true);

        if ($query) {
            $qb->andWhere('l.name LIKE :query')
                ->setParameter('query', '%' . $query . '%');
        }

        $qb->orderBy('l.createdAt', 'DESC')
            ->setMaxResults(self::PAGINATOR_PER_PAGE)
            ->setFirstResult($offset);

        return new Paginator($qb->getQuery());
    }

    public function findAssetIds(array $notAllowedBrandIds): array
    {
        $sql = <<<SQL
            SELECT l.id, b.brands_id
                FROM lists l
                    LEFT JOIN lists_assets la ON la.lists_id = l.id
                    LEFT JOIN assets_brands ab ON la.assets_id = ab.assets_id
                    LEFT JOIN brands b ON ab.brands_id = b.id
            WHERE l.status = :status
        SQL;

        $statement = $this->getEntityManager()->getConnection()->prepare($sql);
        $resultSet = $statement->executeQuery(['status' => true]);

        $result = $resultSet->fetchAllAssociative();

        $lists = [];

        foreach ($result as $row) {
            if (!isset($lists[$row['id']])) {
                $lists[$row['id']] = [$row['brands_id']];
            } else {
                $lists[$row['id']] = array_merge($lists[$row['id']], [$row['brands_id']]);
            }
        }

        foreach ($lists as &$list) {
            $list = array_unique($list, SORT_REGULAR);
        }

        $lists = array_filter($lists, function ($list) use (&$notAllowedBrandIds) {
            return !array_intersect($list, $notAllowedBrandIds);
        });

        return array_keys($lists);
    }

    //    /**
    //     * @return Lists[] Returns an array of Lists objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('l')
    //            ->andWhere('l.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('l.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Lists
    //    {
    //        return $this->createQueryBuilder('l')
    //            ->andWhere('l.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
