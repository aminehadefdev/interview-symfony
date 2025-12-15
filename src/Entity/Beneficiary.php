<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\BeneficiaryRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
        new GetCollection(),
        new Get(),
        new Post(validationContext: ['groups' => ['Default', 'beneficiary:create']]),
        new Put(),
        new Patch(),
        new Delete(),
    ],
    normalizationContext: ['groups' => ['beneficiary:read']],
    denormalizationContext: ['groups' => ['beneficiary:create', 'beneficiary:update']],
    security: "is_granted('ROLE_ADMIN')"
)]
#[ORM\Entity(repositoryClass: BeneficiaryRepository::class)]
class Beneficiary
{
    #[ORM\Id()]
    #[ORM\GeneratedValue()]
    #[ORM\Column(type: "integer")]
    private ?int $id = null;

    #[Groups(['beneficiary:read', 'beneficiary:create', 'beneficiary:update'])]
    #[ORM\Column(type: "string", length: 255)]
    private $name;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $AvatarUrl = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getAvatarUrl(): ?string
    {
        return $this->AvatarUrl;
    }

    public function setAvatarUrl(?string $AvatarUrl): static
    {
        $this->AvatarUrl = $AvatarUrl;

        return $this;
    }
}
