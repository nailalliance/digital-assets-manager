<?php

namespace App\EventListener;

use App\Entity\Assets\Assets;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsDoctrineListener;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsEntityListener;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Doctrine\ORM\Events;

#[AsEntityListener(event: Events::preUpdate, method: 'preUpdate', entity: Assets::class)]
#[AsEntityListener(event: Events::postUpdate, method: 'postUpdate', entity: Assets::class)]
class AssetSyncListener
{
    private $children = [];
    public function __construct(private EntityManagerInterface $entityManager) {}
    public function preUpdate(Assets $asset, PreUpdateEventArgs $event): void
    {
        if (!$asset instanceof Assets || $asset->getChildren()->isEmpty()) {
            return;
        }

        foreach ($asset->getChildren() as &$child) {
            $this->children[] = $child;
        }

        /** @var Assets $child */
        foreach ($this->children as &$child) {
            $child->setName($asset->getName())
                ->setDescription($asset->getDescription())
                ->setThumbnailPath($asset->getThumbnailPath())
                ->setStatus($asset->getStatus())
                ->setEmbargoDate($asset->getEmbargoDate())
                ->setExpirationDate($asset->getExpirationDate())
                ;

            $child->getItemCodes()->clear();
            foreach($asset->getItemCodes() as $itemCode) {
                $child->addItemCode($itemCode);
            }
            $child->getBrand()->clear();
            foreach($asset->getBrand() as $brand) {
                $child->addBrand($brand);
            }
            $child->getCategories()->clear();
            foreach($asset->getCategories() as $cat) {
                $child->addCategory($cat);
            }
            $child->getCollections()->clear();
            foreach($asset->getCollections() as $col) {
                $child->addCollection($col);
            }
            $child->getTags()->clear();
            foreach($asset->getTags() as $tag) {
                $child->addTag($tag);
            }
        }
    }

    public function postUpdate()
    {
        if (!empty($this->children))
        {
            foreach ($this->children as $child) {
                $this->entityManager->persist($child);
                $this->entityManager->flush();
            }
        }

        $this->children = [];
    }
}
