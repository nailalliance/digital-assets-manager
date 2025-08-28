<?php

namespace App\Entity\SocialMedia;

use App\Entity\Assets\Assets;
use App\Entity\Assets\Brands;
use App\Repository\SocialMedia\PostsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PostsRepository::class)]
#[ORM\Table(name: 'social_media_posts')]
class Posts
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $content = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $postAt = null;

    #[ORM\ManyToOne(inversedBy: 'posts')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Portals $portal = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Brands $brand = null;

    /**
     * @var Collection<int, Assets>
     */
    #[ORM\ManyToMany(targetEntity: Assets::class)]
    #[ORM\JoinTable(name: 'social_media_post_assets')]
    private Collection $assets;

    public function __construct()
    {
        $this->assets = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): static
    {
        $this->content = $content;

        return $this;
    }

    public function getPostAt(): ?\DateTimeImmutable
    {
        return $this->postAt;
    }

    public function setPostAt(\DateTimeImmutable $postAt): static
    {
        $this->postAt = $postAt;

        return $this;
    }

    public function getPortal(): ?Portals
    {
        return $this->portal;
    }

    public function setPortal(?Portals $portal): static
    {
        $this->portal = $portal;

        return $this;
    }

    public function getBrand(): ?Brands
    {
        return $this->brand;
    }

    public function setBrand(?Brands $brand): static
    {
        $this->brand = $brand;

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
        }

        return $this;
    }

    public function removeAsset(Assets $asset): static
    {
        $this->assets->removeElement($asset);

        return $this;
    }
}
