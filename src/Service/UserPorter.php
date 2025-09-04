<?php

namespace App\Service;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;

class UserPorter
{
    public function __construct(
        private EntityManagerInterface $entityManager,
    )
    {}

    public function port(array $data): User
    {
        $myNailAllianceUserId = $data['id'];
        $myNailAllianceUsername = $data['user'];
        $myNailAllianceUserRoles = $data['roles'];
        $myNailAllianceUserName = $data['name'];

        /** @var ?User $user */
        $user = $this->entityManager->getRepository(User::class)
            ->findOneBy(['myNailAllianceId' => $myNailAllianceUserId]);

        if (empty($user)) {
            $user = new User();
            $user->setMyNailAllianceId($myNailAllianceUserId);
        }

        $user->setUsername($myNailAllianceUsername)
            ->setRoles($myNailAllianceUserRoles)
            ->setName($myNailAllianceUserName)
        ;

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $user;

    }
}
