<?php

namespace App\Entity\Assets;

use App\Entity\Restrictions\Groups;
use App\Repository\Assets\CategoriesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups as SerializerGroups;

#[ORM\Entity(repositoryClass: CategoriesRepository::class)]
class Categories
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[SerializerGroups('api_v2_taxonomy')]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[SerializerGroups('api_v2_taxonomy', 'searchable')]
    private ?string $name = null;

    #[ORM\ManyToOne(targetEntity: self::class, inversedBy: 'parent')]
    private ?self $categories = null;

    /**
     * @var Collection<int, self>
     */
    #[ORM\OneToMany(targetEntity: self::class, mappedBy: 'categories')]
    private Collection $parent;

    /**
     * @var Collection<int, Assets>
     */
    #[ORM\ManyToMany(targetEntity: Assets::class, mappedBy: 'categories')]
    private Collection $assets;

    /**
     * @var Collection<int, Groups>
     */
    #[ORM\ManyToMany(targetEntity: Groups::class, mappedBy: 'categories')]
    private Collection $restrictedGroups;

    #[ORM\Column(options: ['default' => true])]
    #[SerializerGroups('searchable')]
    private ?bool $status = true;

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

    public function getCategories(): ?self
    {
        return $this->categories;
    }

    public function setCategories(?self $categories): static
    {
        $this->categories = $categories;

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
            $parent->setCategories($this);
        }

        return $this;
    }

    public function removeParent(self $parent): static
    {
        if ($this->parent->removeElement($parent)) {
            // set the owning side to null (unless already changed)
            if ($parent->getCategories() === $this) {
                $parent->setCategories(null);
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
            $asset->addCategory($this);
        }

        return $this;
    }

    public function removeAsset(Assets $asset): static
    {
        if ($this->assets->removeElement($asset)) {
            $asset->removeCategory($this);
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
            $restrictedGroup->addCategory($this);
        }

        return $this;
    }

    public function removeRestrictedGroup(Groups $restrictedGroup): static
    {
        if ($this->restrictedGroups->removeElement($restrictedGroup)) {
            $restrictedGroup->removeCategory($this);
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
