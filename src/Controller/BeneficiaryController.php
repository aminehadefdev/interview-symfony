<?php

namespace App\Controller;

use App\Entity\Beneficiary;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class BeneficiaryController extends AbstractController
{
    public function __invoke(EntityManagerInterface $em, int $limit = 12): JsonResponse
    {
        $repository = $em->getRepository(Beneficiary::class);
        $beneficiaries = $repository->findRandom($limit);
        return $this->json(["beneficiaries" => $beneficiaries]);
    }
}
