<?php

namespace App\Entity\Downloads;

use App\Entity\Assets\Assets;
use App\Entity\User;
use App\Repository\Downloads\OneTimeLinksRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: OneTimeLinksRepository::class)]
class OneTimeLinks
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $token = null;

    #[ORM\ManyToOne(inversedBy: 'oneTimeLinks')]
    private ?Lists $downloadList = null;

    #[ORM\ManyToOne]
    private ?Assets $assets = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $expirationDate = null;

    #[ORM\Column(type: Types::JSON, nullable: true)]
    private ?array $temporaryFiles = [];

    // You might want to add a relationship to the creator
    #[ORM\ManyToOne]
    private ?User $creator = null;

    #[ORM\Column(length: 255, unique: true, nullable: true)]
    private ?string $tusUploadKey = null;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getDownloadList(): ?Lists
    {
        return $this->downloadList;
    }

    public function setDownloadList(?Lists $downloadList): static
    {
        $this->downloadList = $downloadList;

        return $this;
    }

    public function getAssets(): ?Assets
    {
        return $this->assets;
    }

    public function setAssets(?Assets $assets): static
    {
        $this->assets = $assets;

        return $this;
    }

    public function getExpirationDate(): ?\DateTimeImmutable
    {
        return $this->expirationDate;
    }

    public function setExpirationDate(\DateTimeImmutable $expirationDate): static
    {
        $this->expirationDate = $expirationDate;

        return $this;
    }

    public function getTemporaryFiles(): ?array
    {
        return $this->temporaryFiles;
    }

    public function setTemporaryFiles(?array $temporaryFiles): OneTimeLinks
    {
        $this->temporaryFiles = $temporaryFiles;
        return $this;
    }

    public function getCreator(): ?User
    {
        return $this->creator;
    }

    public function setCreator(?User $creator): OneTimeLinks
    {
        $this->creator = $creator;
        return $this;
    }

    public function getTusUploadKey(): ?string
    {
        return $this->tusUploadKey;
    }

    public function setTusUploadKey(?string $tusUploadKey): OneTimeLinks
    {
        $this->tusUploadKey = $tusUploadKey;
        return $this;
    }
}
