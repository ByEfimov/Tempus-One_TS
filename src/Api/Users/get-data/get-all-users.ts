import { OpenUserType } from 'Types/TypesOfData/team-or-user/open-user-type';
import { getDatabase, onValue, ref } from 'firebase/database';

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
            },
        );
    });
}
