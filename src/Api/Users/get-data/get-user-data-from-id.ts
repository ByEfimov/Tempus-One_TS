import { OpenUserType } from 'Types/TypesOfData/team-or-user/open-user-type';
import { getDatabase, onValue, ref } from 'firebase/database';

export function getUserFromId(
    id: string | undefined,
): Promise<OpenUserType | null> {
    const db = getDatabase();
    return new Promise((resolve, reject) => {
        onValue(
            ref(db, 'users/' + id),
            (snapshot) => {
                if (snapshot.exists()) {
                    resolve(snapshot.val());
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
