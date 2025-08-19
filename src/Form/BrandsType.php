<?php

namespace App\Form;

use App\Entity\Assets\Assets;
use App\Entity\Assets\Brands;
use App\Entity\Restrictions\Groups;
use App\Repository\Assets\BrandsRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
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
                        ->where('b.brands IS NULL')
                        ->orderBy('b.name', 'ASC'); // Then sort by brand name
                },
                'choice_label' => 'name',
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
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Brands::class,
        ]);
    }
}
