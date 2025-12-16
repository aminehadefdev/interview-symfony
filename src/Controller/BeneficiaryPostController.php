<?php

namespace App\Controller;

use App\Entity\Beneficiary;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Faker\Factory;
use Symfony\Component\HttpFoundation\JsonResponse;

class BeneficiaryPostController extends AbstractController
{
    public function __invoke(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $jsonData = json_decode($request->getContent());
        $startAvatarUrl = "https://api.dicebear.com/9.x/avataaars/svg?seed=";
        $endAvatarurl = "&backgroundColor[]&backgroundType[]&top=bob";
        $beneficiary = new Beneficiary();
        $name = "";
        if ($jsonData !== null && property_exists($jsonData, 'name') && $jsonData->name !== '') {
            $name = $jsonData->name;
        } else {
            $faker = Factory::create('fr_FR');
            $name = $faker->name();
        }
        $avatar = str_replace(" ", "", $startAvatarUrl . $name . $endAvatarurl);
        $beneficiary->setName($name)->setAvatarUrl($avatar);
        $em->persist($beneficiary);
        $em->flush();

        return new JsonResponse(["message"=>"beneficiary created"], JsonResponse::HTTP_CREATED);
    }
}
