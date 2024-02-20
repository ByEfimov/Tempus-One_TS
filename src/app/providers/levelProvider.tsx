import LevelUP from '@/Api/Users/level/level-up';
import { changeRequest } from '@/Api/requests/change-request';
import { useAuth } from '@/Hooks/useAuth';
import MaxXpToNextLevel from '@/Utils/users-or-teams/max-xp-to-next-level';
import { MassageNotification } from '@/features/notifications/notifications';
import { useEffect } from 'react';

let AddUserXp: (xp: number) => void;

export default function LevelProvider({
    children,
}: {
    children: React.ReactChild | React.ReactNode;
}) {
    const { UserLevel, UserExperience, UserId, UserIsAuth } = useAuth();

    useEffect(() => {
        if (UserExperience >= MaxXpToNextLevel(UserLevel) && UserIsAuth) {
            LevelUP(UserId, UserLevel, UserExperience);
            MassageNotification(`Новый уровень ${UserLevel + 1}!`);
        }

        AddUserXp = function (xp: number) {
            changeRequest(
                'users/' + UserId,
                '/experience',
                UserExperience + xp,
            );
        };
    }, [UserExperience]);

    return children;
}
export { AddUserXp };
