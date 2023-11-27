import { getDatabase, ref, child, get } from 'firebase/database';
import { OpenUserType } from '../../Pages/User/UserPage';

export function getUserFromId(id: string | undefined): Promise<OpenUserType> {
    const dbRef = ref(getDatabase());
    return new Promise((resolve, reject) => {
        get(child(dbRef, 'users/' + id))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    resolve(snapshot.val());
                    console.log(snapshot.val());
                }
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
}
