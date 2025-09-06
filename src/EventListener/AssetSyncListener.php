<?php

namespace App\EventListener;

use App\Entity\Assets\Assets;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsDoctrineListener;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Doctrine\ORM\Events;

#[AsDoctrineListener(event: Events::preUpdate)]
class AssetSyncListener
{
    public function preUpdate(PreUpdateEventArgs $event): void
    {
        $asset = $event->getObject();

        // Only act on Asset entities that have children
        if (!$asset instanceof Assets || $asset->getChildren()->isEmpty()) {
            return;
        }

        // Check which fields have changed
        $changeSet = $event->getEntityChangeSet();
        $fieldsToSync = ['name', 'description', 'status', 'thumbnailPath']; // Add other fields as needed

        foreach ($asset->getChildren() as $child) {
            foreach ($fieldsToSync as $field) {
                if (isset($changeSet[$field])) {
                    $setter = 'set' . ucfirst($field);
                    $child->$setter($asset->{'get' . ucfirst($field)}());
                }
            }

            // Sync relationships
            if (isset($changeSet['brand'])) {
                $child->getBrand()->clear();
                foreach($asset->getBrand() as $brand) { $child->addBrand($brand); }
            }
            if (isset($changeSet['categories'])) {
                $child->getCategories()->clear();
                foreach($asset->getCategories() as $cat) { $child->addCategory($cat); }
            }
            if (isset($changeSet['collections'])) {
                $child->getCollections()->clear();
                foreach($asset->getCollections() as $col) { $child->addCollection($col); }
            }
            if (isset($changeSet['tags'])) {
                $child->getTags()->clear();
                foreach($asset->getTags() as $tag) { $child->addTag($tag); }
            }
        }
    }
}
