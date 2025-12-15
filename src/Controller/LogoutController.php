<?php
// src/Controller/LogoutController.php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class LogoutController extends AbstractController
{
    #[Route('/api/logout', name: 'api_logout', methods: ['POST'])]
    public function logout(): JsonResponse
    {
        $response = new JsonResponse([
            'message' => 'Déconnexion réussie'
        ]);

        // Supprimer le cookie JWT
        $response->headers->setCookie(
            Cookie::create('BEARER')
                ->withValue('')
                ->withExpires(time() - 3600)
                ->withPath('/')
                ->withHttpOnly(true)
                ->withSameSite(Cookie::SAMESITE_LAX)
        );

        return $response;
    }
}