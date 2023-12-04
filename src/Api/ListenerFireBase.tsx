import { getDatabase, ref, onValue } from 'firebase/database';
import { useAppDispatch } from '../Hooks/redus-hooks';
import { useEffect, useState } from 'react';
import { useAuth } from '../Hooks/useAuth';
import { removeUser, setUser } from '../Store/slices/UserSlice';
import { getCurrentUserData } from './Users/getCurrentUserData';
import { getAuth, signOut } from 'firebase/auth';

interface ListenerFC {
    children: React.ReactChild | React.ReactNode;
}

export default function ListenerFB({ children }: ListenerFC) {
    const db = getDatabase();
    const { UserId, UserIsAuth } = useAuth();
    const auth = getAuth();
    const dispatch = useAppDispatch();

    const [authUserId, setAuthUserId] = useState<string | null>(null);
    getCurrentUserData().then((user) => setAuthUserId(user.uid));

    useEffect(() => {
        function LogoutUser() {
            signOut(auth)
                .then(() => {
                    dispatch(removeUser());
                })
                .catch((error) => {
                    console.error(error);
                });
        }

        if (authUserId) {
            if (UserIsAuth && authUserId === UserId) {
                const starCountRef = ref(db, '/users/' + UserId);
                onValue(starCountRef, (snapshot) => {
                    const data = snapshot.val();
                    console.log(data);
                    if (data) {
                        dispatch(
                            setUser({
                                email: data.email,
                                id: data.id,
                                name: data.name,
                                photo: data.photo,
                                age: data.age,
                            })
                        );
                    }
                });
            } else {
                LogoutUser();
            }
        }
    }, []);

    return children;
}
