import { User, getAuth, onAuthStateChanged } from 'firebase/auth';

export function getCurrentUserData() {
    const auth = getAuth();
    return new Promise<User>((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                resolve(user);
            } else {
                reject(null);
            }
        });
    });
}
