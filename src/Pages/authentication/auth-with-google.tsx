import GoogleIcon from '../../Assets/Tempus-Ui/Icons/Buttons/google.svg';
import { getRequestObject } from 'Api/requests/get-requests';
import { postRequestWithoutNewId } from 'Api/requests/post-requests-with-new-id';
import Button, {
    ButtonTypes,
} from 'Assets/Tempus-Ui/Components/Buttons/Button';
import { ErrorNotification } from 'Components/notifications/notifications';
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
        const NewUser = {
            email: user.email,
            experience: 0,
            id: user.uid,
            level: 1,
            name: user.displayName,
            photo: user.photoURL,
            age: 0,
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
    }

    function startAuth() {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                getRequestObject('users/' + user.uid)
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
