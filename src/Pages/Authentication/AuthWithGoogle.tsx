import GoogleIcon from '../../Assets/Tempus-Ui/Icons/Buttons/google.svg';
import { addUserToRealtimeDB } from 'Api/Users/add-user-to-realtime-DB';
import { getUserFromId } from 'Api/Users/get-data/get-user-data-from-id';
import Button, {
    ButtonTypes,
} from 'Assets/Tempus-Ui/Components/Buttons/Button';
import { ErrorNotification } from 'Components/Notifications/Notifications';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { setCurrentUser } from 'Store/slices/UserSlice';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';

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
            }),
        );
        location.reload();
    }

    function registerWithGoogle(user: User) {
        addUserToRealtimeDB(
            user.email,
            user.uid,
            user.displayName,
            user.photoURL,
            user.emailVerified,
        );
        dispatch(
            setCurrentUser({
                email: user.email,
                id: user.uid,
            }),
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
        <Button
            Title="Войти с Google"
            Type={ButtonTypes.default}
            Icon={GoogleIcon}
            Click={() => {
                startAuth();
            }}
        ></Button>
    );
};
export default AuthWithGoogle;
