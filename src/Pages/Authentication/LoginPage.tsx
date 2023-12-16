import { Navigate } from 'react-router-dom';
import AuthenticationFrom from 'Components/Forms/AuthenticationForm';
import { useAuth } from 'Hooks/useAuth';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { setCurrentUser } from 'Store/slices/UserSlice';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginPage() {
    const { UserIsAuth } = useAuth();
    const auth = getAuth();
    const dispatch = useAppDispatch();

    function handlerSubmit(Email: string, Pass: string) {
        signInWithEmailAndPassword(auth, Email, Pass)
            .then((userCredential) => {
                const user = userCredential.user;
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

    return !UserIsAuth ? (
        <AuthenticationFrom
            title="Вход"
            handlerSubmit={handlerSubmit}
        ></AuthenticationFrom>
    ) : (
        <Navigate to="/"></Navigate>
    );
}
