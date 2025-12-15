<?php

namespace App\DataFixtures;

use App\Entity\Beneficiary;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Bundle\FixturesBundle\FixtureGroupInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class BeneficiaryFixtures extends Fixture implements FixtureGroupInterface
{
    public function load(ObjectManager $manager): void
    {
        $startAvatarUrl = "https://api.dicebear.com/9.x/avataaars/svg?seed=";
        $endAvatarurl = "&backgroundColor[]&backgroundType[]&top=bob";
        $faker = Factory::create('fr_FR');
        for ($i = 0; $i < 100; $i++) {
            $name = $faker->name();
            $Avatarurl = $startAvatarUrl . $name . $endAvatarurl;
            $beneficiary = new Beneficiary();
            $beneficiary->setName($name)
                ->setAvatarUrl($Avatarurl);
            $manager->persist($beneficiary);
        }
        $manager->flush();
    }
    public static function getGroups(): array
    {
        return ['beneficiary']; // 🔹 groupe beneficiary
    }
}
