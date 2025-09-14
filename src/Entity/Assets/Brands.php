<?php

namespace App\Entity\Assets;

use App\Entity\Restrictions\Groups;
use App\Entity\User;
use App\Repository\Assets\BrandsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups as SerializerGroups;

#[ORM\Entity(repositoryClass: BrandsRepository::class)]
class Brands
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[SerializerGroups(['api_v2_taxonomy'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[SerializerGroups(['api_v2_taxonomy'])]
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

    /**
     * @var Collection<int, User>
     */
    #[ORM\ManyToMany(targetEntity: User::class, mappedBy: 'restrictedBrands')]
    private Collection $restrictedUsers;

    #[ORM\Column(options: ['default' => true])]
    private ?bool $status = true;

    public function __construct()
    {
        $this->parent = new ArrayCollection();
        $this->assets = new ArrayCollection();
        $this->restrictedGroups = new ArrayCollection();
        $this->restrictedUsers = new ArrayCollection();
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

    /**
     * @return Collection<int, User>
     */
    public function getRestrictedUsers(): Collection
    {
        return $this->restrictedUsers;
    }

    public function addRestrictedUser(User $restrictedUser): static
    {
        if (!$this->restrictedUsers->contains($restrictedUser)) {
            $this->restrictedUsers->add($restrictedUser);
            $restrictedUser->addRestrictedBrand($this);
        }

        return $this;
    }

    public function removeRestrictedUser(User $restrictedUser): static
    {
        if ($this->restrictedUsers->removeElement($restrictedUser)) {
            $restrictedUser->removeRestrictedBrand($this);
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
