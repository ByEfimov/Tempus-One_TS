import { getDatabase, ref, onValue } from 'firebase/database';
import { OpenUserType } from 'Types/TypesOfData/TeamOrUser/OpenUserType';

export function getUserFromId(
    id: string | undefined
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
            }
        );
    });
}
