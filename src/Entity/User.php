<?php

namespace App\Entity;

use App\Entity\Assets\Brands;
use App\Entity\Boards\Board;
use App\Entity\Boards\BoardCollaborator;
use App\Entity\Downloads\Lists;
use App\Entity\Restrictions\Groups;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
class User implements UserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::INTEGER, unique: true)]
    private ?int $myNailAllianceId = null;

    #[ORM\Column(length: 255)]
    private ?string $username = null;

    #[ORM\Column]
    private array $roles = [];

    #[ORM\Column(type: "string", length: 120)]
    private $name;

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

    /**
     * @var Collection<int, Board>
     */
    #[ORM\OneToMany(targetEntity: Board::class, mappedBy: 'owner')]
    private Collection $ownedBoards;

    /**
     * @var Collection<int, BoardCollaborator>
     */
    #[ORM\OneToMany(targetEntity: BoardCollaborator::class, mappedBy: 'user')]
    private Collection $boardCollaborations;

    /**
     * @var Collection<int, Brands>
     */
    #[ORM\ManyToMany(targetEntity: Brands::class, inversedBy: 'restrictedUsers')]
    private Collection $restrictedBrands;

    /**
     * @var Collection<int, ApiToken>
     */
    #[ORM\OneToMany(targetEntity: ApiToken::class, mappedBy: 'owner')]
    private Collection $apiTokens;

    public function __construct()
    {
        $this->groups = new ArrayCollection();
        $this->downloadLists = new ArrayCollection();
        $this->ownedBoards = new ArrayCollection();
        $this->boardCollaborations = new ArrayCollection();
        $this->restrictedBrands = new ArrayCollection();
        $this->apiTokens = new ArrayCollection();
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

    public function getMyNailAllianceId(): ?int
    {
        return $this->myNailAllianceId;
    }

    public function setMyNailAllianceId(?int $myNailAllianceId): User
    {
        $this->myNailAllianceId = $myNailAllianceId;
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
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     * @return User
     */
    public function setName($name)
    {
        $this->name = $name;
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

    /**
     * @return Collection<int, Board>
     */
    public function getOwnedBoards(): Collection
    {
        return $this->ownedBoards;
    }

    public function addOwnedBoard(Board $ownedBoard): static
    {
        if (!$this->ownedBoards->contains($ownedBoard)) {
            $this->ownedBoards->add($ownedBoard);
            $ownedBoard->setOwner($this);
        }

        return $this;
    }

    public function removeOwnedBoard(Board $ownedBoard): static
    {
        if ($this->ownedBoards->removeElement($ownedBoard)) {
            // set the owning side to null (unless already changed)
            if ($ownedBoard->getOwner() === $this) {
                $ownedBoard->setOwner(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, BoardCollaborator>
     */
    public function getBoardCollaborations(): Collection
    {
        return $this->boardCollaborations;
    }

    public function addBoardCollaboration(BoardCollaborator $boardCollaboration): static
    {
        if (!$this->boardCollaborations->contains($boardCollaboration)) {
            $this->boardCollaborations->add($boardCollaboration);
            $boardCollaboration->setUser($this);
        }

        return $this;
    }

    public function removeBoardCollaboration(BoardCollaborator $boardCollaboration): static
    {
        if ($this->boardCollaborations->removeElement($boardCollaboration)) {
            // set the owning side to null (unless already changed)
            if ($boardCollaboration->getUser() === $this) {
                $boardCollaboration->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Brands>
     */
    public function getRestrictedBrands(): Collection
    {
        return $this->restrictedBrands;
    }

    public function addRestrictedBrand(Brands $restrictedBrand): static
    {
        if (!$this->restrictedBrands->contains($restrictedBrand)) {
            $this->restrictedBrands->add($restrictedBrand);
        }

        return $this;
    }

    public function removeRestrictedBrand(Brands $restrictedBrand): static
    {
        $this->restrictedBrands->removeElement($restrictedBrand);

        return $this;
    }

    /**
     * @return Collection<int, ApiToken>
     */
    public function getApiTokens(): Collection
    {
        return $this->apiTokens;
    }

    public function addApiToken(ApiToken $apiToken): static
    {
        if (!$this->apiTokens->contains($apiToken)) {
            $this->apiTokens->add($apiToken);
            $apiToken->setOwner($this);
        }

        return $this;
    }

    public function removeApiToken(ApiToken $apiToken): static
    {
        if ($this->apiTokens->removeElement($apiToken)) {
            // set the owning side to null (unless already changed)
            if ($apiToken->getOwner() === $this) {
                $apiToken->setOwner(null);
            }
        }

        return $this;
    }
}
