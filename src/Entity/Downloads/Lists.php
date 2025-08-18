<?php

namespace App\Entity\Downloads;

use App\Entity\Assets\Assets;
use App\Entity\User;
use App\Repository\Downloads\ListsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ListsRepository::class)]
#[ORM\HasLifecycleCallbacks]
class Lists
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $name = null;

    #[ORM\ManyToOne(inversedBy: 'downloadLists')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $creator = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    /**
     * @var Collection<int, Assets>
     */
    #[ORM\ManyToMany(targetEntity: Assets::class)]
    private Collection $assets;

    /**
     * @var Collection<int, OneTimeLinks>
     */
    #[ORM\OneToMany(targetEntity: OneTimeLinks::class, mappedBy: 'downloadList')]
    private Collection $oneTimeLinks;

    public function __construct()
    {
        $this->assets = new ArrayCollection();
        $this->oneTimeLinks = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getCreator(): ?User
    {
        return $this->creator;
    }

    public function setCreator(?User $creator): static
    {
        $this->creator = $creator;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    #[ORM\PrePersist]
    public function setCreatedAtValue(): void
    {
        $this->createdAt = new \DateTimeImmutable();
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
        }

        return $this;
    }

    public function removeAsset(Assets $asset): static
    {
        $this->assets->removeElement($asset);

        return $this;
    }

    /**
     * @return Collection<int, OneTimeLinks>
     */
    public function getOneTimeLinks(): Collection
    {
        return $this->oneTimeLinks;
    }

    public function addOneTimeLink(OneTimeLinks $oneTimeLink): static
    {
        if (!$this->oneTimeLinks->contains($oneTimeLink)) {
            $this->oneTimeLinks->add($oneTimeLink);
            $oneTimeLink->setDownloadList($this);
        }

        return $this;
    }

    public function removeOneTimeLink(OneTimeLinks $oneTimeLink): static
    {
        if ($this->oneTimeLinks->removeElement($oneTimeLink)) {
            // set the owning side to null (unless already changed)
            if ($oneTimeLink->getDownloadList() === $this) {
                $oneTimeLink->setDownloadList(null);
            }
        }

        return $this;
    }
}
