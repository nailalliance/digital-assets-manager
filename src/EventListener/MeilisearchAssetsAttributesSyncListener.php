<?php

namespace App\EventListener;

use App\Entity\Assets\Assets;
use App\Entity\Assets\Brands;
use App\Entity\Assets\Categories;
use App\Entity\Assets\Collections;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsEntityListener;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Events;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use Meilisearch\Bundle\SearchService as MiliSearchService;

#[AsEntityListener(event: Events::postUpdate, method: 'postUpdate', entity: Brands::class)]
#[AsEntityListener(event: Events::postUpdate, method: 'postUpdate', entity: Categories::class)]
#[AsEntityListener(event: Events::postUpdate, method: 'postUpdate', entity: Collections::class)]
class MeilisearchAssetsAttributesSyncListener
{
    public function __construct(
        private MiliSearchService      $meilisearch,
        private EntityManagerInterface $entityManager,
    )
    {

    }

    public function postUpdate($brands, LifecycleEventArgs $args): void
    {
        $entity = $args->getObject();

        if (
            !(
                $brands instanceof Brands ||
                $brands instanceof Categories ||
                $brands instanceof Collections
            )
        )
        {
            return;
        }

        $changeSet = $args->getObjectManager()->getUnitOfWork()->getEntityChangeSet($entity);

        if (isset($changeSet['status']) || isset($changeSet['name'])) {
            /** @var Assets $asset */
            foreach ($entity->getAssets() as $asset) {
                $this->meilisearch->index($this->entityManager, $asset);
            }
        }
    }
}
