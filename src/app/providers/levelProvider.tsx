import LevelUP from '../api/Users/level/level-up';
import { changeRequest } from '../api/requests/change-request';
import { useAuth } from '../hooks/useAuth';
import { MassageNotification } from '@/features/notifications/notifications';
import MaxXpToNextLevel from '@/shared/users-or-teams/max-xp-to-next-level';
import { useEffect } from 'react';

let AddUserXp: (xp: number) => void;

export default function LevelProvider({ children }: { children: React.ReactChild | React.ReactNode }) {
  const { UserLevel, UserExperience, UserId, UserIsAuth } = useAuth();

  useEffect(() => {
    if (UserExperience >= MaxXpToNextLevel(UserLevel) && UserIsAuth) {
      LevelUP(UserId, UserLevel, UserExperience);
      MassageNotification(`Новый уровень ${UserLevel + 1}!`);
    }

    AddUserXp = function (xp: number) {
      changeRequest('users/' + UserId, '/experience', UserExperience + xp);
    };
  }, [UserExperience]);

  return children;
}
export { AddUserXp };
