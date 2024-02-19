import { postRequestWithoutNewId } from '@/Api/requests/post-requests-with-new-id';
import { AuthenticationFromData } from '@/Components/forms/authentication-form';
import { ErrorNotification } from '@/Components/notifications/notifications';
import { setCurrentUser } from '@/Store/slices/UserSlice';
import { encryptData } from '@/Utils/crypt-data/cripting-data';
import AppRoutes from '@/Utils/routes/app-routes';
import { AppDispatch } from '@/app/appStore';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import Cookies from 'js-cookie';
import { NavigateFunction } from 'react-router-dom';

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
            ErrorNotification('Ошибка при регистрации.');
        });
}
