import AuthenticationFrom from '../../Components/Forms/AuthenticationForm';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../Hooks/useAuth';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useAppDispatch } from '../../Hooks/redus-hooks';
import { setCurrentUser } from '../../Store/slices/UserSlice';
import { addUserToRealtimeDB } from '../../Api/Users/addUserToRealtimeDB';
import {
    TypesOfHeader,
    setTitleToHeader,
    setTypeOfHeader,
} from '../../Store/slices/Header/HeaderSlice';
import { useEffect } from 'react';

export default function RegisterPage() {
    const { UserIsAuth } = useAuth();
    const dispatch = useAppDispatch();
    const auth = getAuth();

    useEffect(() => {
        dispatch(
            setTypeOfHeader({ TypeOfHeader: TypesOfHeader.WithoutSearchBar })
        );
        dispatch(setTitleToHeader({ Title: 'Аккаунт' }));
    }, []);

    function registerUser(
        inputEmail: string,
        inputPass: string,
        inputName: string,
        inputAge: number
    ) {
        createUserWithEmailAndPassword(auth, inputEmail, inputPass)
            .then((userCredential) => {
                const user = userCredential.user;
                addUserToRealtimeDB(
                    user.email,
                    user.uid,
                    inputName,
                    user.photoURL,
                    inputAge,
                    user.emailVerified
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
        inputEmail: string,
        inputPass: string,
        inputName: string,
        inputAge: number
    ) {
        registerUser(inputEmail, inputPass, inputName, inputAge);
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
