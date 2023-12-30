import ButtonVoid from 'Components/MiniComponents/button';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { setCurrentUser } from 'Store/slices/UserSlice';
import { addUserToRealtimeDB } from 'Api/Users/addUserToRealtimeDB';
import { getUserFromId } from 'Api/Users/getData/getUserDataFromId';
import { ErrorNotification } from 'Components/Notifications/Notifications';

type User = {
    email: string | null;
    uid: string | null;
    displayName: string | null;
    photoURL: string | null;
    emailVerified: boolean | null;
};

const AuthWithGoogle = () => {
    const dispatch = useAppDispatch();

    function loginWithGoogle(user: User) {
        dispatch(
            setCurrentUser({
                email: user.email,
                id: user.uid,
            })
        );
        location.reload();
    }

    function registerWithGoogle(user: User) {
        addUserToRealtimeDB(
            user.email,
            user.uid,
            user.displayName,
            user.photoURL,
            user.emailVerified
        );
        dispatch(
            setCurrentUser({
                email: user.email,
                id: user.uid,
            })
        );
        location.reload();
    }

    function startAuth() {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                getUserFromId(user.uid)
                    .then(() => {
                        loginWithGoogle(user);
                    })
                    .catch(() => {
                        registerWithGoogle(user);
                    });
            })
            .catch(() => {
                ErrorNotification('Вход не выполнен.');
            });
    }

    return (
        <ButtonVoid
            title="войти с гугл"
            clickHandler={() => {
                startAuth();
            }}
            classes={undefined}
        ></ButtonVoid>
    );
};
export default AuthWithGoogle;
