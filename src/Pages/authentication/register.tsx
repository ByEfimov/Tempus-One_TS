import { postRequestWithoutNewId } from 'Api/requests/post-requests-with-new-id';
import AuthenticationFrom from 'Components/forms/authentication-form';
import { ErrorNotification } from 'Components/notifications/notifications';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { useAuth } from 'Hooks/useAuth';
import { setCurrentUser } from 'Store/slices/UserSlice';
import { encryptData } from 'Utils/crypt-data/cripting-data';
import AppRoutes from 'Utils/routes/app-routes';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import Cookies from 'js-cookie';
import { Navigate, useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    const { UserIsAuth } = useAuth();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const auth = getAuth();

    function registerUser(
        Email: string,
        Pass: string,
        Name: string,
        Age: string,
    ) {
        createUserWithEmailAndPassword(auth, Email, Pass)
            .then((userCredential) => {
                const user = userCredential.user;
                const NewUser = {
                    email: user.email,
                    experience: 0,
                    id: user.uid,
                    level: 1,
                    name: Name,
                    photo: user.photoURL,
                    age: Age,
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

    return !UserIsAuth ? (
        <AuthenticationFrom
            title="Создай свой 
						Аккаунт"
            handlerSubmit={registerUser}
        ></AuthenticationFrom>
    ) : (
        <Navigate to={AppRoutes.DEFAULT}></Navigate>
    );
}
