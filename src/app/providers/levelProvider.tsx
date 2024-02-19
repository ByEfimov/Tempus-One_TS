import LevelUP from '@/Api/Users/level/level-up';
import { MassageNotification } from '@/Components/notifications/notifications';
import { useAuth } from '@/Hooks/useAuth';
import MaxXpToNextLevel from '@/Utils/users-or-teams/max-xp-to-next-level';
import { useEffect } from 'react';

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
    }, [UserExperience]);

    return children;
}
