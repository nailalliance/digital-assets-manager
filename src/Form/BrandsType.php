<?php

namespace App\Form;

use App\Entity\Assets\Brands;
use App\Entity\Restrictions\Groups;
use App\Entity\User;
use App\Repository\Assets\BrandsRepository;
use App\Repository\UserRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class BrandsType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name')
            ->add('brands', EntityType::class, [
                'class' => Brands::class,
                'query_builder' => function (BrandsRepository $br) {
                    return $br->createQueryBuilder('b')
                        ->orderBy('b.brands', 'ASC')
                        ->addOrderBy('b.name', 'ASC');
                },
                'choice_label' => function (Brands $brand) {
                    // Check if the brand's parent ('brands') is null.
                    if ($brand->getBrands() === null) {
                        return '[Main] ' . $brand->getName();
                    }
                    $parentBrandAcronym = array_reduce(explode(' ', $brand->getBrands()->getName()), function ($carry, $item) {
                        return $carry . ucwords($item[0]);
                    });
                    // For child brands, you might want to indent them for clarity.
                    return '— [' . $parentBrandAcronym . '] ' . $brand->getName();
                },
                'label' => 'Parent Brand',
                'required' => false,
                'placeholder' => 'Select a parent brand (optional)',
            ])
            ->add('restrictedGroups', EntityType::class, [
                'class' => Groups::class,
                'choice_label' => 'id',
                'multiple' => true,
                'expanded' => true,
                'required' => false,
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
                'help' => 'These users can view designer-only assets assigned to this brand or any child brand.',
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
            'data_class' => Brands::class,
        ]);
    }
}
