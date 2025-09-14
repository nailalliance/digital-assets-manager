<?php

namespace App\Entity\Assets;

use App\Repository\Assets\CollectionsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups as SerializerGroups;

#[ORM\Entity(repositoryClass: CollectionsRepository::class)]
class Collections
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[SerializerGroups('api_v2_taxonomy')]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[SerializerGroups('api_v2_taxonomy', 'searchable')]
    private ?string $name = null;

    #[ORM\Column]
    private ?int $year = null;

    /**
     * @var Collection<int, Assets>
     */
    #[ORM\ManyToMany(targetEntity: Assets::class, mappedBy: 'collections')]
    private Collection $assets;

    #[ORM\Column(options: ['default' => true])]
    #[SerializerGroups('searchable')]
    private ?bool $status = true;

    public function __construct()
    {
        $this->assets = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getYear(): ?int
    {
        return $this->year;
    }

    public function setYear(int $year): static
    {
        $this->year = $year;

        return $this;
    }

    /**
     * @return Collection<int, Assets>
     */
    public function getAssets(): Collection
    {
        return $this->assets;
    }

    public function addAsset(Assets $asset): static
    {
        if (!$this->assets->contains($asset)) {
            $this->assets->add($asset);
            $asset->addCollection($this);
        }

        return $this;
    }

    public function removeAsset(Assets $asset): static
    {
        if ($this->assets->removeElement($asset)) {
            $asset->removeCollection($this);
        }

        return $this;
    }

    public function isStatus(): ?bool
    {
        return $this->status;
    }

    public function getStatus(): ?bool
    {
        return $this->status;
    }

    public function setStatus(bool $status): static
    {
        $this->status = $status;

        return $this;
    }
}
