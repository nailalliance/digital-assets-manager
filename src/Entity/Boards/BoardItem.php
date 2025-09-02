<?php

namespace App\Entity\Boards;

use App\Repository\Boards\BoardItemRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: BoardItemRepository::class)]
class BoardItem
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'items')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Board $board = null;

    #[ORM\Column(length: 50)]
    private ?string $type = null; // 'asset', 'text', 'group', 'line', 'arrow'

    #[ORM\Column]
    private ?int $pos_x = 0;

    #[ORM\Column]
    private ?int $pos_y = 0;

    #[ORM\Column]
    private ?int $width = 200;

    #[ORM\Column]
    private ?int $height = 200;

    #[ORM\Column]
    private array $content = [];

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getBoard(): ?Board
    {
        return $this->board;
    }

    public function setBoard(?Board $board): static
    {
        $this->board = $board;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getPosX(): ?int
    {
        return $this->pos_x;
    }

    public function setPosX(int $pos_x): static
    {
        $this->pos_x = $pos_x;

        return $this;
    }

    public function getPosY(): ?int
    {
        return $this->pos_y;
    }

    public function setPosY(int $pos_y): static
    {
        $this->pos_y = $pos_y;

        return $this;
    }

    public function getWidth(): ?int
    {
        return $this->width;
    }

    public function setWidth(int $width): static
    {
        $this->width = $width;

        return $this;
    }

    public function getHeight(): ?int
    {
        return $this->height;
    }

    public function setHeight(int $height): static
    {
        $this->height = $height;

        return $this;
    }

    public function getContent(): array
    {
        return $this->content;
    }

    public function setContent(array $content): static
    {
        $this->content = $content;

        return $this;
    }
}
