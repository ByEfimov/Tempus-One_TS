import { useAuth } from '../hooks/useAuth';
import LevelUP from '@/features/api/Users/level/level-up';
import { changeRequest } from '@/features/api/requests/change-request';
import MaxXpToNextLevel from '@/shared/users-or-teams/max-xp-to-next-level';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export let AddUserXp: (xp: number) => void;
export let takeUserXp: (xp: number) => void;

const LevelProvider = ({ children }: { children: React.ReactChild | React.ReactNode }) => {
  const { UserLevel, UserExperience, UserId, UserIsAuth } = useAuth();

  useEffect(() => {
    if (UserExperience >= MaxXpToNextLevel(UserLevel) && UserIsAuth) {
      LevelUP(UserId, UserLevel, UserExperience);
      toast.info(`Новый уровень ${UserLevel + 1}!`);
    }

    AddUserXp = (xp: number) => {
      UserIsAuth && changeRequest(`users/`, `${UserId}/experience`, UserExperience + xp);
    };
    takeUserXp = (xp: number) => {
      UserIsAuth && changeRequest('users/', `${UserId}/experience`, UserExperience - xp);
    };
  }, [UserExperience]);

  return children;
};

export default LevelProvider;
