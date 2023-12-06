import { getDatabase, ref, onValue } from 'firebase/database';
import { OpenUserType } from '../../Pages/OpenUser/UserPage';

export function getAllUsers() {
    const db = getDatabase();
    return new Promise<OpenUserType[]>((resolve, reject) => {
        onValue(
            ref(db, 'users/'),
            (snapshot) => {
                if (snapshot.exists()) {
                    resolve(Object.values(snapshot.val()));
                } else {
                    reject(null);
                }
            },
            {
                onlyOnce: true,
            }
        );
    });
}
