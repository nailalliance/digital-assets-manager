<?php

namespace App\Security\Voter;

use App\Entity\Assets\Assets;
use App\Entity\Assets\AssetStatusEnum;
use App\Entity\User;
use App\Service\DesignerAssetAccessChecker;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;

class AssetVoter extends Voter
{
    public const VIEW = 'ASSET_VIEW';

    public function __construct(
        private Security $security,
        private DesignerAssetAccessChecker $designerAssetAccessChecker,
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

        if ($this->security->isGranted('ROLE_FTP_ADMIN'))
        {
            return true;
        }

        /** @var Assets $asset */
        $asset = $subject;

        if ($this->security->isGranted('ROLE_FTP_DESIGNER'))
        {
            return !($asset->getStatus() === AssetStatusEnum::INACTIVE);
        }

        if ($asset->getStatus() === AssetStatusEnum::DESIGNER) {
            return $this->designerAssetAccessChecker->isGranted($user, $asset);
        }

        if ($asset->getStatus() !== AssetStatusEnum::ACTIVE) {
            return false;
        }

        $userBrandsIds = $user->getRestrictedBrands()->map(fn($brand) => $brand->getId())->toArray();

        foreach ($asset->getBrand() as $assetBrand) {
            $visited = [];
            $current = $assetBrand;

            while ($current !== null) {
                $objectId = spl_object_id($current);
                if (isset($visited[$objectId])) {
                    break;
                }

                $visited[$objectId] = true;
                if (in_array($current->getId(), $userBrandsIds, true)) {
                    return true;
                }

                $current = $current->getBrands();
            }
        }

        return false;
    }
}
