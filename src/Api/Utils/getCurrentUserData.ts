import { getAuth, onAuthStateChanged } from 'firebase/auth';

export function getCurrentUserData() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            return user;
        } else {
            console.error('Пользователь не авторизован.');
        }
    });
}
