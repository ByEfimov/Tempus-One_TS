import AuthenticationFrom from 'Components/forms/authentication-form';
import { ErrorNotification } from 'Components/notifications/notifications';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { useAuth } from 'Hooks/useAuth';
import { setCurrentUser } from 'Store/slices/UserSlice';
import { encryptData } from 'Utils/crypt-data/cripting-data';
import AppRoutes from 'Utils/routes/app-routes';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Cookies from 'js-cookie';
import { Navigate, useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const { UserIsAuth } = useAuth();
    const auth = getAuth();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    function handlerSubmit(Email: string, Pass: string) {
        signInWithEmailAndPassword(auth, Email, Pass)
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

    return !UserIsAuth ? (
        <AuthenticationFrom
            title="Войди в свой 
						Аккаунт"
            handlerSubmit={handlerSubmit}
        ></AuthenticationFrom>
    ) : (
        <Navigate to={AppRoutes.DEFAULT}></Navigate>
    );
}
