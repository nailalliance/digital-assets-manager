<?php

namespace App\Entity;

use App\Repository\ApiTokenRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

#[ORM\Entity(repositoryClass: ApiTokenRepository::class)]
#[ORM\UniqueConstraint(name: "owner_service", columns: ["owner_id", "service"])]
#[ORM\HasLifecycleCallbacks]
class ApiToken
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'apiTokens')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $owner = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column(length: 255, unique: true)]
    private ?string $token = null;

    #[ORM\Column(length: 255, unique: true)]
    private ?string $imageToken = null;

    #[ORM\Column(enumType: ApiTokenFor::class, options: ['default' => 'adobe'], index: 'service')]
    private ?ApiTokenFor $service = null;

    public function __construct(?User $user)
    {
        $this->owner = $user;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(?User $owner): static
    {
        $this->owner = $owner;

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
    public function setCreatedAtValue(): static
    {
        $this->createdAt = new \DateTimeImmutable();

        return $this;
    }

    public function getToken(): ?string
    {
        return $this->token;
    }

    public function setToken(string $token): static
    {
        $this->token = $token;

        return $this;
    }

    public function getImageToken(): ?string
    {
        return $this->imageToken;
    }

    public function setImageToken(?string $imageToken): ApiToken
    {
        $this->imageToken = $imageToken;
        return $this;
    }

    public function getService(): ?ApiTokenFor
    {
        return $this->service;
    }

    public function setService(ApiTokenFor $service): static
    {
        $this->service = $service;

        return $this;
    }
}
