<?php

namespace App\Entity;

use App\Repository\SiteNotificationRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: SiteNotificationRepository::class)]
#[ORM\Index(columns: ['enabled', 'starts_at', 'ends_at'], name: 'idx_site_notification_active')]
class SiteNotification
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 120)]
    #[Assert\NotBlank]
    #[Assert\Length(max: 120)]
    private ?string $title = null;

    #[ORM\Column(length: 1000)]
    #[Assert\NotBlank]
    #[Assert\Length(max: 1000)]
    private ?string $message = null;

    #[ORM\Column(length: 20, enumType: NotificationLevel::class)]
    private NotificationLevel $level = NotificationLevel::INFO;

    #[ORM\Column]
    #[Assert\NotNull]
    private ?\DateTimeImmutable $startsAt = null;

    #[ORM\Column]
    #[Assert\NotNull]
    #[Assert\GreaterThan(propertyPath: 'startsAt', message: 'The end time must be after the start time.')]
    private ?\DateTimeImmutable $endsAt = null;

    #[ORM\Column(options: ['default' => true])]
    private bool $enabled = true;

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

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(string $message): static
    {
        $this->message = $message;

        return $this;
    }

    public function getLevel(): NotificationLevel
    {
        return $this->level;
    }

    public function setLevel(NotificationLevel $level): static
    {
        $this->level = $level;

        return $this;
    }

    public function getStartsAt(): ?\DateTimeImmutable
    {
        return $this->startsAt;
    }

    public function setStartsAt(\DateTimeImmutable $startsAt): static
    {
        $this->startsAt = $startsAt;

        return $this;
    }

    public function getEndsAt(): ?\DateTimeImmutable
    {
        return $this->endsAt;
    }

    public function setEndsAt(\DateTimeImmutable $endsAt): static
    {
        $this->endsAt = $endsAt;

        return $this;
    }

    public function isEnabled(): bool
    {
        return $this->enabled;
    }

    public function setEnabled(bool $enabled): static
    {
        $this->enabled = $enabled;

        return $this;
    }

    public function isActiveAt(\DateTimeImmutable $time): bool
    {
        return $this->enabled
            && $this->startsAt !== null
            && $this->endsAt !== null
            && $this->startsAt <= $time
            && $this->endsAt > $time;
    }
}
