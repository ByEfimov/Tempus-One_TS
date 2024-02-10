import { getRequestObject } from 'Api/requests/get-requests';
import { postRequestWithoutNewId } from 'Api/requests/post-requests-with-new-id';
import {
    Button,
    ButtonIcons,
    ButtonTypes,
    buttonIcons,
} from 'Assets/Tempus-Ui';
import { ErrorNotification } from 'Components/notifications/notifications';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { setCurrentUser } from 'Store/slices/UserSlice';
import { encryptData } from 'Utils/crypt-data/cripting-data';
import AppRoutes from 'Utils/routes/app-routes';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

type User = {
    email: string | null;
    uid: string | null;
    displayName: string | null;
    photoURL: string | null;
    emailVerified: boolean | null;
};

const AuthWithGoogle = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    function loginWithGoogle(user: User) {
        dispatch(
            setCurrentUser({
                email: user.email,
                id: user.uid,
            }),
        );
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
                        Cookies.set('UserId', encryptData(user.uid));
                        navigate(AppRoutes.DEFAULT);
                    })
                    .catch(() => {
                        registerWithGoogle(user);
                        Cookies.set('UserId', encryptData(user.uid));
                        navigate(AppRoutes.DEFAULT);
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
            Click={() => {
                startAuth();
            }}
        >
            <ButtonIcons Icon={buttonIcons.Google}></ButtonIcons>
        </Button>
    );
};
export default AuthWithGoogle;
