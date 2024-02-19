import { ErrorNotification } from '@/Components/notifications/notifications';
import { setCurrentUser } from '@/Store/slices/UserSlice';
import { encryptData } from '@/Utils/crypt-data/cripting-data';
import AppRoutes from '@/Utils/routes/app-routes';
import { AppDispatch } from '@/app/appStore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Cookies from 'js-cookie';
import { NavigateFunction } from 'react-router-dom';

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
            ErrorNotification('Пароль или почта не подходят.');
        });
}
