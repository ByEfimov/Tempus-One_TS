import { getDatabase, ref, onValue } from 'firebase/database';
import { useAppDispatch } from '../Hooks/redus-hooks';
import { useEffect } from 'react';
import { useAuth } from '../Hooks/useAuth';
import { setUser } from '../Store/slices/UserSlice';

interface ListenerFC {
    children: React.ReactChild | React.ReactNode;
}

export default function ListenerFB({ children }: ListenerFC) {
    const db = getDatabase();
    const { UserId, UserIsAuth, UserEmailVarivide } = useAuth();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (UserIsAuth) {
            const starCountRef = ref(db, '/users/' + UserId);
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    console.log(data);
                    dispatch(
                        setUser({
                            emailIsConfirmed: data.emailIsConfirmed,
                            email: data.email,
                            id: data.id,
                            name: data.name,
                            photo: data.photo,
                            age: data.age,
                        })
                    );
                }
            });
        }
    }, []);

    return children;
}
