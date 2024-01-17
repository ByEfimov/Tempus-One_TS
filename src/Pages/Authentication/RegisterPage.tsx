import { addUserToRealtimeDB } from 'Api/Users/addUserToRealtimeDB';
import AuthenticationFrom from 'Components/Forms/AuthenticationForm';
import { ErrorNotification } from 'Components/Notifications/Notifications';
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
                addUserToRealtimeDB(
                    user.email,
                    user.uid,
                    Name,
                    user.photoURL,
                    user.emailVerified,
                    Age,
                );
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
