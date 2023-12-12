import { Navigate } from 'react-router-dom';
import AuthenticationFrom from '../../Components/Forms/AuthenticationForm';
import { useAuth } from '../../Hooks/useAuth';
import { useAppDispatch } from '../../Hooks/redus-hooks';
import { setCurrentUser } from '../../Store/slices/UserSlice';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {
    TypesOfHeader,
    setTitleToHeader,
    setTypeOfHeader,
} from '../../Store/slices/Header/HeaderSlice';
import { useEffect } from 'react';

export default function LoginPage() {
    const { UserIsAuth } = useAuth();
    const auth = getAuth();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(
            setTypeOfHeader({ TypeOfHeader: TypesOfHeader.WithoutSearchBar })
        );
        dispatch(setTitleToHeader({ Title: 'Аккаунт' }));
    }, []);

    function handlerSubmit(inputEmail: string, inputPass: string) {
        signInWithEmailAndPassword(auth, inputEmail, inputPass)
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
