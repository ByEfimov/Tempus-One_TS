import { MassageNotification } from '@/Components/notifications/notifications';
import { getAuth, sendEmailVerification } from 'firebase/auth';

export function sendMailForVerifying() {
    const auth = getAuth();
    if (auth.currentUser) {
        sendEmailVerification(auth.currentUser).then(() => {
            MassageNotification('Письмо отправлено.');
        });
    }
}
