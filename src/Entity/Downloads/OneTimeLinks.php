<?php

namespace App\Entity\Downloads;

use App\Entity\Assets\Assets;
use App\Repository\Downloads\OneTimeLinksRepository;
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
}
