<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Faker\Factory;

class UserFixtures extends Fixture
{
    private $hasher;

    public function __construct(UserPasswordHasherInterface $hasher)
    {
        $this->hasher = $hasher;
    }

    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        $user = (new User())->setEmail('amine@gmail.com')->setRoles(["ROLE_ADMIN"]);
        $manager->persist($user);
        $user->setPassword($this->hasher->hashPassword($user, 'I@mTheT€ster'));

        for ($i = 0; $i < 100; $i++) {
            $u = (new User())->setEmail($faker->email());
            $u->setPassword($this->hasher->hashPassword($u, $faker->password()));
            $manager->persist($u);
        }
        $manager->flush();
    }
}
