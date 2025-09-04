<?php

namespace App\Security\Voter;

use App\Entity\Assets\Brands;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;

class BrandVoter extends Voter
{
    public const VIEW = 'BRAND_VIEW';

    public function __construct(
        private Security $security
    )
    {}

    /**
     * @inheritDoc
     */
    protected function supports(string $attribute, mixed $subject): bool
    {
        return $attribute === self::VIEW && $subject instanceof Brands;
    }

    /**
     * @inheritDoc
     */
    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        $user = $token->getUser();

        if (!$user instanceof UserInterface)
        {
            return false;
        }

        if ($this->security->isGranted('ROLE_FTP_DESIGNER'))
        {
            return true;
        }

        /** @var Brands $brand */
        $brand = $subject;

        if ($brand->getBrands() !== null)
        {
            return true;
        }

        $userBrandIds = $user->getRestrictedBrands()->map(fn($brand) => $brand->getId())->toArray();

        return in_array($brand->getId(), $userBrandIds);
    }
}
