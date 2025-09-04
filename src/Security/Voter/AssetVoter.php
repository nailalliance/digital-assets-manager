<?php

namespace App\Security\Voter;

use App\Entity\Assets\Assets;
use App\Entity\User;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;

class AssetVoter extends Voter
{
    public const VIEW = 'ASSET_VIEW';

    public function __construct(
        private Security $security
    )
    {}

    /**
     * @inheritDoc
     */
    protected function supports(string $attribute, mixed $subject): bool
    {
        return $attribute === self::VIEW && $subject instanceof Assets;
    }

    /**
     * @inheritDoc
     */
    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        /** @var User $user */
        $user = $token->getUser();


        if (!$user instanceof UserInterface)
        {
            return false;
        }

        if ($this->security->isGranted('ROLE_FTP_DESIGNER'))
        {
            return true;
        }

        /** @var Assets $asset */
        $asset = $subject;

        $userBrandsIds = $user->getRestrictedBrands()->map(fn($brand) => $brand->getId())->toArray();

        foreach ($asset->getBrand() as $assetBrand)
        {
            $parentBrand = $assetBrand->getBrands();
            if ($parentBrand && in_array($parentBrand->getId(), $userBrandsIds, true))
            {
                return true;
            }
        }

        return false;
    }
}
