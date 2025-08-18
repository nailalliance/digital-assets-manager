<?php

namespace App\Entity\Downloads;

use App\Entity\Assets\Assets;
use App\Entity\User;
use App\Repository\Downloads\LogsRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: LogsRepository::class)]
class Logs
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne]
    private ?User $user = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Assets $asset = null;

    #[ORM\ManyToOne]
    private ?OneTimeLinks $oneTimeLink = null;

    #[ORM\Column(length: 255)]
    private ?string $ipAddress = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $downloadedAt = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getAsset(): ?Assets
    {
        return $this->asset;
    }

    public function setAsset(?Assets $asset): static
    {
        $this->asset = $asset;

        return $this;
    }

    public function getOneTimeLink(): ?OneTimeLinks
    {
        return $this->oneTimeLink;
    }

    public function setOneTimeLink(?OneTimeLinks $oneTimeLink): static
    {
        $this->oneTimeLink = $oneTimeLink;

        return $this;
    }

    public function getIpAddress(): ?string
    {
        return $this->ipAddress;
    }

    public function setIpAddress(string $ipAddress): static
    {
        $this->ipAddress = $ipAddress;

        return $this;
    }

    public function getDownloadedAt(): ?\DateTimeImmutable
    {
        return $this->downloadedAt;
    }

    public function setDownloadedAt(\DateTimeImmutable $downloadedAt): static
    {
        $this->downloadedAt = $downloadedAt;

        return $this;
    }
}
