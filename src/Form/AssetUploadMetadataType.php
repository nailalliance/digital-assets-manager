<?php

namespace App\Form;

use App\Entity\Assets\Brands;
use App\Entity\Assets\Categories;
use App\Entity\Assets\Collections;
use App\Repository\Assets\BrandsRepository;
use App\Repository\Assets\CategoriesRepository;
use App\Repository\Assets\CollectionsRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

final class AssetUploadMetadataType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('brands', EntityType::class, [
                'class' => Brands::class,
                'mapped' => false,
                'required' => false,
                'multiple' => true,
                'expanded' => true,
                'query_builder' => static function (BrandsRepository $repository) {
                    return $repository->createQueryBuilder('brand')
                        ->innerJoin('brand.brands', 'parent')
                        ->where('brand.status = :active')
                        ->setParameter('active', true)
                        ->orderBy('parent.name', 'ASC')
                        ->addOrderBy('brand.name', 'ASC');
                },
                'choice_label' => static function (Brands $brand): string {
                    $parent = $brand->getBrands();

                    return $parent === null
                        ? (string) $brand->getName()
                        : sprintf('(%s) %s', $parent->getName(), $brand->getName());
                },
                'choice_attr' => static function (Brands $brand): array {
                    $parent = $brand->getBrands();
                    $filterParent = $parent?->getBrands() ?? $parent;

                    return [
                        'data-upload-taxonomy' => 'brand_ids',
                        'data-parent-id' => $filterParent?->getId() ?? '',
                    ];
                },
            ])
            ->add('categories', EntityType::class, [
                'class' => Categories::class,
                'mapped' => false,
                'required' => false,
                'multiple' => true,
                'expanded' => true,
                'query_builder' => static function (CategoriesRepository $repository) {
                    return $repository->createQueryBuilder('category')
                        ->where('category.status = :active')
                        ->setParameter('active', true)
                        ->orderBy('category.name', 'ASC');
                },
                'choice_label' => 'name',
                'choice_attr' => static fn (): array => [
                    'data-upload-taxonomy' => 'category_ids',
                ],
            ])
            ->add('collections', EntityType::class, [
                'class' => Collections::class,
                'mapped' => false,
                'required' => false,
                'multiple' => true,
                'expanded' => true,
                'query_builder' => static function (CollectionsRepository $repository) {
                    return $repository->createQueryBuilder('collection')
                        ->where('collection.status = :active')
                        ->setParameter('active', true)
                        ->orderBy('collection.year', 'DESC')
                        ->addOrderBy('collection.name', 'ASC');
                },
                'choice_label' => static fn (Collections $collection): string => sprintf(
                    '(%s) %s',
                    $collection->getYear(),
                    $collection->getName(),
                ),
                'choice_attr' => static fn (): array => [
                    'data-upload-taxonomy' => 'collection_ids',
                ],
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => null,
        ]);
    }
}
