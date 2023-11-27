import { Navigate } from 'react-router-dom';
import AuthenticationFrom from '../../Components/Forms/AuthenticationForm';
import { useAuth } from '../../Hooks/useAuth';
import { useAppDispatch } from '../../Hooks/redus-hooks';
import { setUser } from '../../Store/slices/UserSlice';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginPage() {
    const { UserIsAuth } = useAuth();
    const auth = getAuth();
    const dispatch = useAppDispatch();

    function handlerSubmit(inputEmail: string, inputPass: string) {
        signInWithEmailAndPassword(auth, inputEmail, inputPass)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                dispatch(
                    setUser({
                        email: user.email,
                        id: user.uid,
                        name: user.displayName,
                        photo: user.photoURL,
                        age: 0,
                    })
                );
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
