import { User, getAuth, onAuthStateChanged } from 'firebase/auth';

export function getCurrentUserData() {
    const auth = getAuth();
    return new Promise<User>((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                resolve(user);
            } else {
                console.error('Пользователь не найден.');
                reject(null);
            }
        });
    });
}
