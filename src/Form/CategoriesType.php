<?php

namespace App\Form;

use App\Entity\Assets\Categories;
use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CategoriesType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name')
            ->add('categories', EntityType::class, [
                'class' => Categories::class,
                'choice_label' => 'name',
                'required' => false,
                'placeholder' => 'Select a parent category (optional)',
                'label' => 'Parent Category'
            ])
            ->add('designerAccessUsers', EntityType::class, [
                'class' => User::class,
                'query_builder' => fn (UserRepository $users) => $users->createQueryBuilder('u')
                    ->orderBy('u.name', 'ASC')
                    ->addOrderBy('u.id', 'ASC'),
                'choice_label' => fn (User $user) => sprintf(
                    '#%d — %s (%s)',
                    $user->getId(),
                    $user->getName(),
                    $user->getUsername()
                ),
                'multiple' => true,
                'expanded' => false,
                'required' => false,
                'by_reference' => false,
                'label' => 'Users granted designer-only asset access',
                'help' => 'These users can view designer-only assets assigned to this category or any child category.',
                'attr' => ['size' => 12],
            ])
            ->add('status', ChoiceType::class, [
                'choices' => [
                    'Active' => true,
                    'Inactive' => false,
                ]
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Categories::class,
        ]);
    }
}
