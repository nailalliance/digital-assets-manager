<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class WebDownloadType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('size', ChoiceType::class, [
                'choices' => [
                    '1500x1500px' => '1500',
                    '2000x2000px' => '2000',
                ],
                'label' => 'Size',
                'property_path' => 'size',
                'attr' => ['class' => 'form-select'],
            ])
            ->add('padding', ChoiceType::class, [
                'choices' => [
                    'No Padding' => 'no',
                    'Add Padding' => 'yes',
                ],
                'label' => 'Padding',
                'property_path' => 'padding',
                'attr' => ['class' => 'form-select'],
            ])
            ->add('format', ChoiceType::class, [
                'choices' => [
                    'JPG' => 'jpg',
                    'WebP' => 'webp',
                    'PNG' => 'png',
                ],
                'label' => 'Format',
                'property_path' => 'format',
                'attr' => ['class' => 'form-select'],
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([]);
    }
}
