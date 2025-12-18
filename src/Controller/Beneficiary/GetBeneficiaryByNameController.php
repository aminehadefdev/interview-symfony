<?php

namespace App\Controller\Beneficiary;

use App\Entity\Beneficiary;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

class GetBeneficiaryByNameController extends AbstractController
{
    public function __invoke(EntityManagerInterface $em, string $name = ''): JsonResponse
    {
        $repository = $em->getRepository(Beneficiary::class);
        $beneficiaries = $repository->findByName($name);
        return $this->json($beneficiaries);
    }
}