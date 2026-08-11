<?php

namespace App\Form;

use App\Entity\NotificationLevel;
use App\Entity\SiteNotification;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\EnumType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class SiteNotificationType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('title', TextType::class)
            ->add('message', TextareaType::class, [
                'attr' => ['rows' => 3],
            ])
            ->add('level', EnumType::class, [
                'class' => NotificationLevel::class,
                'choice_label' => static fn (NotificationLevel $level): string => ucfirst($level->value),
            ])
            ->add('startsAt', DateTimeType::class, [
                'widget' => 'single_text',
                'input' => 'datetime_immutable',
                'model_timezone' => 'UTC',
                'view_timezone' => 'America/Los_Angeles',
                'help' => 'Pacific time (PST/PDT).',
            ])
            ->add('endsAt', DateTimeType::class, [
                'widget' => 'single_text',
                'input' => 'datetime_immutable',
                'model_timezone' => 'UTC',
                'view_timezone' => 'America/Los_Angeles',
                'help' => 'The notification disappears at this time. Pacific time (PST/PDT).',
            ])
            ->add('enabled', CheckboxType::class, [
                'required' => false,
                'help' => 'Disabled notifications are never shown, even during their scheduled window.',
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => SiteNotification::class,
        ]);
    }
}
