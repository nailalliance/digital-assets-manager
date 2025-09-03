<?php

namespace App\Form;

use App\Entity\Assets\Brands;
use App\Entity\User;
use App\Repository\Assets\BrandsRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;

class UserType extends AbstractType
{
    public function __construct(private AuthorizationCheckerInterface $authorizationChecker)
    {
    }

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        /** @var ?User $user */
        $user = $options['data'] ?? null;

        $builder
            ->add('name', TextType::class)
            ->add('username', TextType::class, [
                'label' => 'Username',
            ])
            ->add('roles', ChoiceType::class, [
                'choices' => [
                    'Admin' => 'ROLE_ADMIN',
                    'FTP Admin' => 'ROLE_FTP_ADMIN',
                    'FTP Designer' => 'ROLE_FTP_DESIGNER',
                    'Board Admin' => 'ROLE_BOARD_ADMIN',
                    'Board Editor' => 'ROLE_BOARD_EDITOR',
                    'Board User' => 'ROLE_BOARD_USER',
                    'User' => 'ROLE_USER',
                ],
                'multiple' => true,
                'expanded' => true,
            ]);

        $hasRestrictedRole = false;

        if ($user) {
            $restrictedRoles = ['ROLE_BOARD_ADMIN', 'ROLE_BOARD_EDITOR', 'ROLE_BOARD_USER', 'ROLE_USER'];
            foreach ($user->getRoles() as $role)
            {
                if (in_array($role, $restrictedRoles))
                {
                    $hasRestrictedRole = true;
                    break;
                }
            }
        }

        if ($hasRestrictedRole)
        {
            $builder->add('restrictedBrands', EntityType::class, [
                'class' => Brands::class,
                'query_builder' => function (BrandsRepository $br) {
                    return $br->createQueryBuilder('b')
                        ->where('b.brands IS NULL')
                        ->orderBy('b.brands', 'ASC');
                },
                'choice_label' => 'name',
                'multiple' => true,
                'expanded' => true,
                'required' => false,
                'label' => 'Restricted Brands',
                'help' => 'Select the Brands this user should have access to.'
            ]);
        }
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
