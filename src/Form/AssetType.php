<?php

namespace App\Form;

use App\Entity\Assets\Assets;
use App\Entity\Assets\AssetStatusEnum;
use App\Entity\Assets\Brands;
use App\Entity\Assets\Categories;
use App\Entity\Assets\Collections;
use App\Entity\Assets\ColorSpaceEnum;
use App\Entity\Assets\ItemCodes;
use App\Entity\Assets\Tags;
use App\Entity\Restrictions\Groups;
use App\Entity\User;
use App\Repository\Assets\BrandsRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class AssetType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name', TextType::class)
            ->add('description', TextareaType::class, [
                'required' => false,
            ])
            ->add('status', ChoiceType::class, [
                'choices' => [
                    'Active' => AssetStatusEnum::ACTIVE,
                    'Inactive' => AssetStatusEnum::INACTIVE,
                    'Expired' => AssetStatusEnum::EXPIRED,
                ],
            ])
            ->add('embargo_date', DateTimeType::class, [
                'widget' => 'single_text',
                'required' => false,
            ])
            ->add('expiration_date', DateTimeType::class, [
                'widget' => 'single_text',
                'required' => false,
            ])
            ->add('color_space', ChoiceType::class, [
                'choices' => [
                    'RGB' => ColorSpaceEnum::RGB,
                    'CMYK' => ColorSpaceEnum::CMYK,
                ],
                'placeholder' => 'Choose a color space',
            ])
            // Assuming you have an ItemCode entity with a 'code' property
            ->add('item_codes', EntityType::class, [
                'class' => ItemCodes::class,
                'choice_label' => 'code',
                'multiple' => true,
                'expanded' => false, // Use 'true' for checkboxes
                'by_reference' => false,
            ])
            ->add('brand', EntityType::class, [
                'class' => Brands::class,
                'query_builder' => function (BrandsRepository $br) {
                    return $br->createQueryBuilder('b')
                        ->innerJoin('b.brands', 'p') // 'brands' is the parent property
                        ->where('b.brands IS NOT NULL')
                        ->orderBy('p.name', 'ASC')      // Sort by parent brand name
                        ->addOrderBy('b.name', 'ASC'); // Then sort by brand name
                },
                'choice_label' => function (Brands $brand) {
                    // The 'getBrands()' method returns the parent brand entity
                    return sprintf('(%s) %s', $brand->getBrands()->getName(), $brand->getName());
                },
                'choice_attr' => function (Brands $brand) {
                    return ['data-parent-id' => $brand->getBrands()->getId()];
                },
                'multiple' => true,
                'expanded' => true, // Renders as checkboxes
            ])
            ->add('categories', EntityType::class, [
                'class' => Categories::class,
                'choice_label' => 'name',
                'multiple' => true,
            ])
            ->add('collections', EntityType::class, [
                'class' => Collections::class,
                'choice_label' => 'name',
                'multiple' => true,
            ])
            ->add('tags', EntityType::class, [
                'class' => Tags::class,
                'choice_label' => 'name',
                'multiple' => true,
            ])
            ->add('similar_assets', EntityType::class, [
                'class' => Assets::class,
                'choice_label' => 'name',
                'multiple' => true,
                'required' => false,
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Assets::class,
        ]);
    }
}
