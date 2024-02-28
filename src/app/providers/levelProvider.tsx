import LevelUP from '../api/Users/level/level-up';
import { changeRequest } from '../api/requests/change-request';
import { useAuth } from '../hooks/useAuth';
import MaxXpToNextLevel from '@/shared/users-or-teams/max-xp-to-next-level';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export let AddUserXp: (xp: number) => void;

const LevelProvider = ({ children }: { children: React.ReactChild | React.ReactNode }) => {
  const { UserLevel, UserExperience, UserId, UserIsAuth } = useAuth();

  useEffect(() => {
    if (UserExperience >= MaxXpToNextLevel(UserLevel) && UserIsAuth) {
      LevelUP(UserId, UserLevel, UserExperience);
      toast.info(`Новый уровень ${UserLevel + 1}!`);
    }

    AddUserXp = (xp: number) => {
      changeRequest(`users/`, `${UserId}/experience`, UserExperience + xp);
    };
  }, [UserExperience]);

  return children;
};

export default LevelProvider;
