<?php

namespace App\Form\SocialMedia;

use App\Entity\Assets\Assets;
use App\Entity\Assets\Brands;
use App\Entity\SocialMedia\Posts;
use App\Entity\SocialMedia\Portals;
use App\Form\AssetAutocompleteType;
use App\Repository\Assets\AssetsRepository;
use App\Repository\Assets\BrandsRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PostsType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('title', TextType::class)
            ->add('description', TextareaType::class, ['required' => false])
            ->add('content', TextareaType::class, [
                'required' => false,
                'attr' => ['style' => 'height: 200px'],
            ])
            ->add('post_at', DateTimeType::class, [
                'widget' => 'single_text',
                'label' => 'Post Date & Time',
            ])
            ->add('portal', EntityType::class, [
                'class' => Portals::class,
                'choice_label' => 'name',
            ])
            ->add('brand', EntityType::class, [
                'class' => Brands::class,
                'choice_label' => 'name',
                'placeholder' => 'Select a brand...',
                'query_builder' => function (BrandsRepository $br) {
                    return $br->createQueryBuilder('b')
                        ->where('b.brands IS NULL')
                        ->orderBy('b.name', 'ASC');
                },
            ])
            ->add('assets', HiddenType::class, [
                'mapped' => false, // We will handle this manually
            ]);

        // $formModifier = function (FormInterface $form, ?Brands $brand = null) {
        //     $form->add('assets', AssetAutocompleteType::class, [
        //         'by_reference' => false,
        //         'query_builder' => function (AssetsRepository $ar) use ($brand) {
        //             $qb = $ar->createQueryBuilder('a');
        //             if ($brand) {
        //                 $qb->innerJoin('a.brand', 'b')
        //                     ->andWhere('b.id = :brandId')
        //                     ->setParameter('brandId', $brand->getId());
        //             }
        //             return $qb;
        //         },
        //     ]);
        // };
        //
        // $builder->addEventListener(
        //     FormEvents::PRE_SET_DATA,
        //     function (FormEvent $event) use ($formModifier) {
        //         $data = $event->getData();
        //         $formModifier($event->getForm(), $data->getBrand());
        //     }
        // );
        //
        // $builder->get('brand')->addEventListener(
        //     FormEvents::POST_SUBMIT,
        //     function (FormEvent $event) use ($formModifier) {
        //         $brand = $event->getForm()->getData();
        //         $formModifier($event->getForm()->getParent(), $brand);
        //     }
        // );
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Posts::class,
        ]);
    }
}
