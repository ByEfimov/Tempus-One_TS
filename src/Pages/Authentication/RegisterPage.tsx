import AuthenticationFrom from 'Components/Forms/AuthenticationForm';
import { Navigate } from 'react-router-dom';
import { useAuth } from 'Hooks/useAuth';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { setCurrentUser } from 'Store/slices/UserSlice';
import { addUserToRealtimeDB } from 'Api/Users/addUserToRealtimeDB';

export default function RegisterPage() {
    const { UserIsAuth } = useAuth();
    const dispatch = useAppDispatch();
    const auth = getAuth();

    function registerUser(
        Email: string,
        Pass: string,
        Name: string,
        Age: number
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
                    Age
                );
                dispatch(
                    setCurrentUser({
                        email: user.email,
                        id: user.uid,
                    })
                );
                location.reload();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function handlerSubmit(
        Email: string,
        Pass: string,
        Name: string,
        Age: number
    ) {
        registerUser(Email, Pass, Name, Age);
    }

    return !UserIsAuth ? (
        <AuthenticationFrom
            title="Регистрация"
            handlerSubmit={handlerSubmit}
        ></AuthenticationFrom>
    ) : (
        <Navigate to="/"></Navigate>
    );
}
