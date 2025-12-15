<?php
// src/Controller/MeController.php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

#[AsController]
class MeController extends AbstractController
{
    /**
     * Récupère l'utilisateur actuellement connecté
     */
    public function __invoke(#[CurrentUser] ?User $user): JsonResponse
    {
        if (!$user) {
            throw $this->createAccessDeniedException('Non authentifié');
        }

        return $this->json($user);
    }
}
