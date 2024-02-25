import { postRequestWithoutNewId } from '@/app/api/requests/post-requests-with-new-id';
import { AppDispatch } from '@/app/appStore';
import { setCurrentUser } from '@/app/slices/userSlice';
import { AuthenticationFromData } from '@/entities/authenticationForm/authenticationForm';
import { encryptData } from '@/shared/crypt-data/cripting-data';
import AppRoutes from '@/shared/routes/app-routes';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import Cookies from 'js-cookie';
import { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';

export function registerUser(
  { email, password, name, age }: AuthenticationFromData,
  dispatch: AppDispatch,
  navigate: NavigateFunction,
) {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const NewUser = {
        email: user.email,
        experience: 0,
        id: user.uid,
        level: 1,
        name,
        photo: user.photoURL,
        age,
        emailVerified: user.emailVerified,
        members: 0,
      };
      postRequestWithoutNewId('users/' + user.uid, NewUser);
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
      toast.error('Ошибка при регистрации.');
    });
}
