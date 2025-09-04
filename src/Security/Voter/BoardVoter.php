<?php

namespace App\Security\Voter;

use App\Entity\Boards\Board;
use App\Entity\User;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class BoardVoter extends Voter
{
    public const VIEW = 'view';
    public const EDIT = 'edit';

    public const ROLE_EDITOR = 'editor';
    public const ROLE_VIEWER = 'viewer';
    public const ROLE_BOARD_MANAGER = 'board_manager';

    public function __construct(
        private Security $security
    )
    {
    }

    protected function supports(string $attribute, mixed $subject): bool
    {
        // if the attribute isn't one we support, return false
        if (!in_array($attribute, [self::VIEW, self::EDIT])) {
            return false;
        }

        // only vote on `Board` objects
        if (!$subject instanceof Board) {
            return false;
        }

        return true;
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        $user = $token->getUser();

        if (!$user instanceof User) {
            // the user must be logged in; if not, deny access
            return false;
        }

        // ROLE_ADMIN can do anything!
        if ($this->security->isGranted('ROLE_FTP_ADMIN')) {
            return true;
        }

        /** @var Board $board */
        $board = $subject;

        return match ($attribute) {
            self::VIEW => $this->canView($board, $user),
            self::EDIT => $this->canEdit($board, $user),
            default => throw new \LogicException('This code should not be reached!')
        };
    }

    private function canView(Board $board, User $user): bool
    {
        // If the user can edit, they can also view.
        if ($this->canEdit($board, $user)) {
            return true;
        }

        // Check if the user is a collaborator with any role
        foreach ($board->getCollaborators() as $collaborator) {
            if ($collaborator->getUser() === $user) {
                return true;
            }
        }

        return false;
    }

    private function canEdit(Board $board, User $user): bool
    {
        // The owner can always edit
        if ($board->getOwner() === $user) {
            return true;
        }

        // Check if the user is a collaborator with editing permissions
        foreach ($board->getCollaborators() as $collaborator) {
            if ($collaborator->getUser() === $user && in_array($collaborator->getRole(), [self::ROLE_EDITOR, self::ROLE_BOARD_MANAGER])) {
                return true;
            }
        }

        return false;
    }
}
