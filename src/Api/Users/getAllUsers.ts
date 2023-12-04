import { getDatabase, ref, onValue } from 'firebase/database';

export function getAllUsers() {
    const db = getDatabase();
    return new Promise((resolve, reject) => {
        onValue(
            ref(db, 'users/'),
            (snapshot) => {
                if (snapshot.exists()) {
                    resolve(snapshot.val());
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
