<?php

namespace App\Entity\Assets;

use App\Entity\Restrictions\Groups;
use App\Repository\Assets\BrandsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: BrandsRepository::class)]
class Brands
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\ManyToOne(targetEntity: self::class, inversedBy: 'parent')]
    private ?self $brands = null;

    /**
     * @var Collection<int, self>
     */
    #[ORM\OneToMany(targetEntity: self::class, mappedBy: 'brands')]
    private Collection $parent;

    /**
     * @var Collection<int, Assets>
     */
    #[ORM\ManyToMany(targetEntity: Assets::class, mappedBy: 'brand')]
    private Collection $assets;

    /**
     * @var Collection<int, Groups>
     */
    #[ORM\ManyToMany(targetEntity: Groups::class, mappedBy: 'brands')]
    private Collection $restrictedGroups;

    public function __construct()
    {
        $this->parent = new ArrayCollection();
        $this->assets = new ArrayCollection();
        $this->restrictedGroups = new ArrayCollection();
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

    public function getBrands(): ?self
    {
        return $this->brands;
    }

    public function setBrands(?self $brands): static
    {
        $this->brands = $brands;

        return $this;
    }

    /**
     * @return Collection<int, self>
     */
    public function getParent(): Collection
    {
        return $this->parent;
    }

    public function addParent(self $parent): static
    {
        if (!$this->parent->contains($parent)) {
            $this->parent->add($parent);
            $parent->setBrands($this);
        }

        return $this;
    }

    public function removeParent(self $parent): static
    {
        if ($this->parent->removeElement($parent)) {
            // set the owning side to null (unless already changed)
            if ($parent->getBrands() === $this) {
                $parent->setBrands(null);
            }
        }

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
            $asset->addBrand($this);
        }

        return $this;
    }

    public function removeAsset(Assets $asset): static
    {
        if ($this->assets->removeElement($asset)) {
            $asset->removeBrand($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, Groups>
     */
    public function getRestrictedGroups(): Collection
    {
        return $this->restrictedGroups;
    }

    public function addRestrictedGroup(Groups $restrictedGroup): static
    {
        if (!$this->restrictedGroups->contains($restrictedGroup)) {
            $this->restrictedGroups->add($restrictedGroup);
            $restrictedGroup->addBrand($this);
        }

        return $this;
    }

    public function removeRestrictedGroup(Groups $restrictedGroup): static
    {
        if ($this->restrictedGroups->removeElement($restrictedGroup)) {
            $restrictedGroup->removeBrand($this);
        }

        return $this;
    }
}
