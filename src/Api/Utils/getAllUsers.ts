import { getDatabase, ref, child, get } from 'firebase/database';

export function getAllUsers() {
    const dbRef = ref(getDatabase());
    return new Promise((resolve, reject) => {
        get(child(dbRef, 'users/'))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    resolve(snapshot.val());
                } else {
                    resolve(null);
                }
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
}
