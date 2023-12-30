import LevelUP from 'Api/Users/Level/LevelUp';
import { MassageNotification } from 'Components/Notifications/Notifications';
import { useAuth } from 'Hooks/useAuth';
import MaxXpToNextLevel from 'Utils/UsersOrTeams/MaxXpToNextLevel';
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
