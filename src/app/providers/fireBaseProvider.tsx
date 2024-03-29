import { useAppDispatch } from '../hooks/redux-hooks';
import { useAuth } from '../hooks/useAuth';
import { removeUser, setUser } from '../slices/userSlice';
import { decryptData } from '@/shared/crypt-data/cripting-data';
import { getAuth, signOut } from 'firebase/auth';
import { getDatabase, onValue, ref } from 'firebase/database';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

interface ListenerFC {
  children: React.ReactChild | React.ReactNode;
}

export default function FireBaseProvider({ children }: ListenerFC) {
  const db = getDatabase();
  const UserIdC = decryptData(Cookies.get('UserId'));
  const user = useAuth();
  const auth = getAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    function LogoutUser() {
      signOut(auth).then(() => {
        dispatch(removeUser());
      });
      Cookies.remove('UserId');
    }

    if (UserIdC || user.id) {
      const starCountRef = ref(db, '/users/' + user.id);
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
  }, [user.id]);

  return children;
}
