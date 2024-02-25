import { getAuth, sendEmailVerification } from 'firebase/auth';
import { toast } from 'react-toastify';

export function sendMailForVerifying() {
  const auth = getAuth();
  if (auth.currentUser) {
    sendEmailVerification(auth.currentUser).then(() => {
      toast.info('Письмо отправлено.');
    });
  }
}
