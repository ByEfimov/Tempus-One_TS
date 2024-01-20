import LevelUP from 'Api/Users/level/level-up';
import { MassageNotification } from 'Components/notifications/notifications';
import { useAuth } from 'Hooks/useAuth';
import MaxXpToNextLevel from 'Utils/users-or-teams/max-xp-to-next-level';
import { useEffect } from 'react';

interface LevelReducer {
    children: React.ReactChild | React.ReactNode;
}

export default function LevelReducer({ children }: LevelReducer) {
    const { UserLevel, UserExperience, UserId } = useAuth();

    useEffect(() => {
        if (UserExperience >= MaxXpToNextLevel(UserLevel)) {
            LevelUP(UserId, UserLevel, UserExperience);
            MassageNotification(`Новый уровень ${UserLevel + 1}!`);
        }
    }, [UserExperience]);

    return children;
}
