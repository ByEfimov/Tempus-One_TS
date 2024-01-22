import { postRequestWithoutNewId } from 'Api/requests/post-requests-with-new-id';
import AuthenticationFrom from 'Components/forms/authentication-form';
import { ErrorNotification } from 'Components/notifications/notifications';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { useAuth } from 'Hooks/useAuth';
import { setCurrentUser } from 'Store/slices/UserSlice';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { Navigate } from 'react-router-dom';

export default function RegisterPage() {
    const { UserIsAuth } = useAuth();
    const dispatch = useAppDispatch();
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
                location.reload();
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
        <Navigate to="/"></Navigate>
    );
}
