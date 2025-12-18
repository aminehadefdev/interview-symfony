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
        new GetCollection(security: "is_granted('ROLE_ADMIN')"),
        new Get(security: "is_granted('ROLE_ADMIN')"),
        new Get(
            uriTemplate: '/beneficiaries/random/{limit}',
            controller: \App\Controller\Beneficiary\GetRandomBeneficiaryController::class,
            read: false,
            name: 'api_random_beneficiary',
            security: "is_granted('ROLE_ADMIN')"
        ),
        new Post(
            validationContext: ['groups' => ['Default', 'beneficiary:create']],
            uriTemplate: "/beneficiaries",
            controller: \App\Controller\Beneficiary\PostBeneficiaryController::class,
            read: false,
            name: 'api_create_beneficiary',
            security: "is_granted('ROLE_ADMIN')"
        ),
        new Put(security: "is_granted('ROLE_ADMIN')"),
        new Patch(security: "is_granted('ROLE_ADMIN')"),
        new Delete(security: "is_granted('ROLE_ADMIN')"),
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

    #[Groups(['beneficiary:read', 'beneficiary:create', 'beneficiary:update'])]
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
