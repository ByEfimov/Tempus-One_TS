import { useAppDispatch } from 'Hooks/redux-hooks';
import { useAuth } from 'Hooks/useAuth';
import { removeUser, setUser } from 'Store/slices/UserSlice';
import { getAuth, signOut } from 'firebase/auth';
import { getDatabase, onValue, ref } from 'firebase/database';
import { useEffect } from 'react';

interface ListenerFC {
    children: React.ReactChild | React.ReactNode;
}

export default function ListenerFB({ children }: ListenerFC) {
    const db = getDatabase();
    const { UserId, UserIsAuth } = useAuth();
    const auth = getAuth();
    const dispatch = useAppDispatch();

    useEffect(() => {
        function LogoutUser() {
            signOut(auth).then(() => {
                dispatch(removeUser());
            });
        }

        if (UserIsAuth) {
            const starCountRef = ref(db, '/users/' + UserId);
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    dispatch(
                        setUser({
                            email: data.email,
                            id: data.id,
                            name: data.name,
                            photo: data.photo,
                            age: data.age,
                            emailVerified: data.emailVerified,
                            subscriptions: data.subscriptions,
                            members: data.members || [],
                            postsLiked: data.postsLiked || [],
                            viewings: data.viewings || [],
                            experience: data.experience || 0,
                            level: data.level | 0,
                            selectedVariants: data.selectedVariants,
                        }),
                    );
                }
            });
        } else {
            LogoutUser();
        }
    }, []);

    return children;
}
