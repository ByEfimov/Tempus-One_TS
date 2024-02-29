import { AppDispatch } from '@/app/appStore';
import { setCurrentUser } from '@/app/slices/userSlice';
import { encryptData } from '@/shared/crypt-data/cripting-data';
import AppRoutes from '@/shared/routes/app-routes';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Cookies from 'js-cookie';
import { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function loginUser(
  { email, password }: { email: string; password: string },
  dispatch: AppDispatch,
  navigate: NavigateFunction,
) {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      dispatch(
        setCurrentUser({
          email: user.email,
          id: user.uid,
        }),
      );

      Cookies.set('UserId', encryptData(user.uid));
      navigate(AppRoutes.DEFAULT);
    })
    .catch(() => {
      toast.error('Данные от аккаунта введены не верно.');
    });
}
