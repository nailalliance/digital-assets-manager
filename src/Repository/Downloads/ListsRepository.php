<?php

namespace App\Repository\Downloads;

use App\Entity\Downloads\Lists;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Lists>
 */
class ListsRepository extends ServiceEntityRepository
{
    public const PAGINATOR_PER_PAGE = 100;
    public function __construct(ManagerRegistry $registry)
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
        $qb = $this->createQueryBuilder('l')
            ->andWhere('l.name IS NOT NULL') // Only show named lists
            ->andWhere('l.status = :status')
            ->setParameter('status', true)
            ->orderBy('l.createdAt', 'DESC'); // Most recent on top

        // Add search filter if a query is provided
        if ($query) {
            $qb->andWhere('l.name LIKE :query')
                ->setParameter('query', '%' . $query . '%');
        }

        $qb->setMaxResults(self::PAGINATOR_PER_PAGE)
            ->setFirstResult($offset);

        return new Paginator($qb->getQuery());
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
