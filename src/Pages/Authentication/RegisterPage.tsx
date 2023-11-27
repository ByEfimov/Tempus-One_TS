import AuthenticationFrom from '../../Components/Forms/AuthenticationForm';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../Hooks/useAuth';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useAppDispatch } from '../../Hooks/redus-hooks';
import { setUser } from '../../Store/slices/UserSlice';
import { getDatabase, set, ref } from '@firebase/database';

export default function RegisterPage() {
    const { UserIsAuth } = useAuth();
    const dispatch = useAppDispatch();
    const auth = getAuth();
    const db = getDatabase();

    function addUserToRealtimeDB(user, inputAge: number) {
        const NewUser = {
            email: user.email,
            experience: 0,
            id: user.uid,
            level: 1,
            name: user.displayName,
            photo: user.photoURL,
            age: inputAge,
        };
        console.log(NewUser);
        set(ref(db, 'users/' + user.uid + '/'), NewUser);
    }

    function registerUser(
        inputEmail: string,
        inputPass: string,
        inputName: string,
        inputAge: number
    ) {
        createUserWithEmailAndPassword(auth, inputEmail, inputPass)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                dispatch(
                    setUser({
                        email: user.email,
                        id: user.uid,
                        name: user.displayName,
                        photo: user.photoURL,
                        age: inputAge,
                    })
                );
                setTimeout(() => {
                    addUserToRealtimeDB(user, inputAge);
                    changeNameUser(inputName);
                }, 1000);
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
