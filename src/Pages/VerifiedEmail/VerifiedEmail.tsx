import { Navigate } from 'react-router-dom';
import ButtonVoid from 'Components/MiniComponents/button';
import { useAuth } from 'Hooks/useAuth';
import { getAuth, sendEmailVerification } from 'firebase/auth';
import Styles from './Styles.module.scss';
import { getCurrentUserData } from 'Api/Users/getCurrentUserData';
import { getDatabase, ref, set } from '@firebase/database';
import { MassageNotification } from 'Components/Notifications/Notifications';

const VerifyingEmail = () => {
    const { UserEmailVerified, UserId } = useAuth();
    const db = getDatabase();
    const auth = getAuth();

    function sendMailForVerifying() {
        if (auth.currentUser) {
            sendEmailVerification(auth.currentUser).then(() => {
                MassageNotification('Письмо отправлено.');
            });
        }
    }

    function Verifying() {
        location.reload();
        getCurrentUserData().then((currentUser) => {
            if (currentUser.emailVerified === true) {
                set(ref(db, 'users/' + UserId + '/emailVerified'), true);
            }
        });
    }

    if (!UserEmailVerified) {
        return (
            <div className={Styles.buttons}>
                <div className={Styles.Title}>
                    Отправь письмо и подтверди почту!
                </div>
                <ButtonVoid
                    title="Отправить письмо"
                    clickHandler={() => sendMailForVerifying()}
                ></ButtonVoid>
                <ButtonVoid
                    title="Подтвердил"
                    clickHandler={() => Verifying()}
                ></ButtonVoid>
                <div>Обнови страницу если не сработало)</div>
            </div>
        );
    } else {
        return <Navigate to="/"></Navigate>;
    }
};
export default VerifyingEmail;
