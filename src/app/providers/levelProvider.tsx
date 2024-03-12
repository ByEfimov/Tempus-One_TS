import { useAuth } from '../hooks/useAuth';
import LevelUP from '@/features/api/Users/level/level-up';
import { changeRequest } from '@/features/api/requests/change-request';
import MaxXpToNextLevel from '@/shared/users-or-teams/max-xp-to-next-level';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export let AddUserXp: (xp: number) => void;
export let takeUserXp: (xp: number) => void;

const LevelProvider = ({ children }: { children: React.ReactChild | React.ReactNode }) => {
  const user = useAuth();

  useEffect(() => {
    if (user.experience >= MaxXpToNextLevel(user.level) && user.isAuth) {
      LevelUP(user.id, user.level, user.experience);
      toast.info(`Новый уровень ${user.level + 1}!`);
    }

    AddUserXp = (xp: number) => {
      user.isAuth && changeRequest(`users/`, `${user.id}/experience`, user.experience + xp);
    };
    takeUserXp = (xp: number) => {
      if (user.experience >= xp) {
        user.isAuth && changeRequest('users/', `${user.id}/experience`, user.experience - xp);
      }
    };
  }, [user.experience]);

  return children;
};

export default LevelProvider;
