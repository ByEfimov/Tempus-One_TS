import { useAppSelector } from './redux-hooks';
import { decryptData } from '@/shared/crypt-data/cripting-data';
import AppRoutes from '@/shared/routes/app-routes';
import Cookies from 'js-cookie';

export function useAuth() {
  const {
    email,
    photo,
    name,
    age,
    emailVerified,
    subscriptions,
    postsLiked,
    members,
    viewings,
    experience,
    level,
    selectedVariants,
  } = useAppSelector((state) => state.user);

  const pathToProfile = email ? AppRoutes.USER + '/' + decryptData(Cookies.get('UserId')) : AppRoutes.LOGIN;

  return {
    isAuth: !!decryptData(Cookies.get('UserId')),
    canChanging: !!emailVerified && !!email,
    subscriptions: subscriptions,
    emailVerified: emailVerified,
    email: email,
    id: decryptData(Cookies.get('UserId')),
    photo,
    name,
    age,
    postsLiked,
    members,
    viewings,
    experience: experience || 0,
    level: level || 1,
    selectedVariants,
    pathToProfile,
  };
}
