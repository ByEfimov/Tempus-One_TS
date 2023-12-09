import { Navigate } from 'react-router-dom';
import ButtonVoid from '../../Components/minicops/B-void';
import { useAuth } from '../../Hooks/useAuth';
import { getAuth, sendEmailVerification } from 'firebase/auth';
import Styles from './Styles.module.scss';
import { getCurrentUserData } from '../../Api/Users/getCurrentUserData';
import { getDatabase, ref, set } from '@firebase/database';

const VerifiedingEmail = () => {
    const { UserEmailVerified, UserId } = useAuth();
    const db = getDatabase();
    const auth = getAuth();
    function sendMailForVerifieding() {
        if (auth.currentUser) {
            sendEmailVerification(auth.currentUser).then(() => {
                console.log('Отправлено');
            });
        }
    }

    function Verifieding() {
        location.reload();
        getCurrentUserData().then((currentUser) => {
            if (currentUser.emailVerified === true) {
                set(ref(db, 'users/' + UserId + '/emailVerified'), true);
            }
        });
    }

    return !UserEmailVerified ? (
        <div className={Styles.buttons}>
            <ButtonVoid
                title="Отправить письмо"
                clickHandler={() => sendMailForVerifieding()}
            ></ButtonVoid>
            <ButtonVoid
                title="Подтвердил"
                clickHandler={() => Verifieding()}
            ></ButtonVoid>
            <div>Обнови страницу если не сработало)</div>
        </div>
    ) : (
        <Navigate to="/"></Navigate>
    );
};
export default VerifiedingEmail;
