import { sendMailForVerifying } from '../api/sendMail';
import { Verifying } from '../api/verifying';
import Styles from './styles.module.scss';
import { Button, ButtonTypes } from '@/Assets/Tempus-Ui';
import { useAuth } from '@/Hooks/useAuth';
import AppRoutes from '@/Utils/routes/app-routes';
import { Navigate } from 'react-router-dom';

const VerifyingEmailPage = () => {
    const { UserEmailVerified, UserId } = useAuth();

    if (!UserEmailVerified) {
        return (
            <div className={Styles.buttons}>
                <div className={Styles.Title}>
                    Отправь письмо и подтверди почту!
                </div>
                <Button
                    Type={ButtonTypes.active}
                    Title="Отправить письмо"
                    Click={() => sendMailForVerifying()}
                ></Button>
                <Button
                    Type={ButtonTypes.active}
                    Title="Подтвердил"
                    Click={() => Verifying(UserId)}
                ></Button>
                <div>Обнови страницу если не сработало</div>
            </div>
        );
    } else {
        return <Navigate to={AppRoutes.DEFAULT}></Navigate>;
    }
};
export { VerifyingEmailPage };
