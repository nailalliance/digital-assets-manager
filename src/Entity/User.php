<?php

namespace App\Entity;

use App\Entity\Downloads\Lists;
use App\Entity\Restrictions\Groups;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
class User implements UserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $username = null;

    #[ORM\Column]
    private array $roles = [];

    /**
     * @var Collection<int, Groups>
     */
    #[ORM\ManyToMany(targetEntity: Groups::class, inversedBy: 'users')]
    private Collection $groups;

    /**
     * @var Collection<int, Lists>
     */
    #[ORM\OneToMany(targetEntity: Lists::class, mappedBy: 'creator')]
    private Collection $downloadLists;

    public function __construct()
    {
        $this->groups = new ArrayCollection();
        $this->downloadLists = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): self
    {
        $this->id = $id;
        return $this;
    }

    public function getUserIdentifier(): string
    {
        return (string) $this->username;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): static
    {
        $this->username = $username;

        return $this;
    }

    public function getRoles(): array
    {
        return $this->roles;
    }

    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @return Collection<int, Groups>
     */
    public function getGroups(): Collection
    {
        return $this->groups;
    }

    public function addGroup(Groups $group): static
    {
        if (!$this->groups->contains($group)) {
            $this->groups->add($group);
        }

        return $this;
    }

    public function removeGroup(Groups $group): static
    {
        $this->groups->removeElement($group);

        return $this;
    }

    /**
     * @return Collection<int, Lists>
     */
    public function getDownloadLists(): Collection
    {
        return $this->downloadLists;
    }

    public function addDownloadList(Lists $downloadList): static
    {
        if (!$this->downloadLists->contains($downloadList)) {
            $this->downloadLists->add($downloadList);
            $downloadList->setCreator($this);
        }

        return $this;
    }

    public function removeDownloadList(Lists $downloadList): static
    {
        if ($this->downloadLists->removeElement($downloadList)) {
            // set the owning side to null (unless already changed)
            if ($downloadList->getCreator() === $this) {
                $downloadList->setCreator(null);
            }
        }

        return $this;
    }

    #[\Deprecated]
    public function eraseCredentials(): void
    {
        // @deprecated, to be removed when upgrading to Symfony 8
    }
}
