import { getUserFromId } from '../../Api/Users/getUserdataFromId';
import ButtonVoid from '../minicops/buton';
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
        location.reload();
    }

    function registerWhihtGoogle(user: User) {
        const userAgeDefualt = 0;
        const UserMembersDefault: number = 0;
        addUserToRealtimeDB(
            user.email,
            user.uid,
            user.displayName,
            user.photoURL,
            userAgeDefualt,
            user.emailVerified,
            UserMembersDefault
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
