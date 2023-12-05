import { getUserFromId } from '../../Api/Users/getUserdataFromId';
import ButtonVoid from '../minicops/B-void';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAppDispatch } from '../../Hooks/redus-hooks';
import { setCurrentUser } from '../../Store/slices/UserSlice';
import { addUserToRealtimeDB } from '../../Api/Users/addUserToRealtimeDB';

type User = {
    email: string | null;
    uid: string | null;
    displayName: string | null;
    photoURL: string | null;
    emailVerified: boolean | null;
};

const AuthWhithGoogle = () => {
    const dispatch = useAppDispatch();

    function loginWhihtGoogle(user: User) {
        dispatch(
            setCurrentUser({
                email: user.email,
                id: user.uid,
            })
        );
    }

    function registerWhihtGoogle(user: User) {
        addUserToRealtimeDB(
            user.email,
            user.uid,
            user.displayName,
            user.photoURL,
            0,
            user.emailVerified
        );
        dispatch(
            setCurrentUser({
                email: user.email,
                id: user.uid,
            })
        );
    }

    function startAuth() {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log(user);
                getUserFromId(user.uid)
                    .then(() => {
                        loginWhihtGoogle(user);
                    })
                    .catch(() => {
                        registerWhihtGoogle(user);
                    });
            })
            .catch((error) => {
                console.error(error);
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
export default AuthWhithGoogle;
