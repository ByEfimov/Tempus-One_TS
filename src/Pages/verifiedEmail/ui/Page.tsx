import { sendMailForVerifying } from '../api/sendMail';
import { Verifying } from '../api/verifying';
import Styles from './styles.module.scss';
import { Button, ButtonTypes } from '@/Assets/Tempus-Ui';
import { useAuth } from '@/Hooks/useAuth';
import AppRoutes from '@/Utils/routes/app-routes';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';

const VerifyingEmailPage = () => {
    const { UserEmailVerified, UserId } = useAuth();

    if (!UserEmailVerified) {
        return (
            <motion.div className={Styles.buttons}>
                <motion.h1 className={Styles.Title}>
                    Отправь письмо и подтверди почту!
                </motion.h1>
                <Button
                    Type={ButtonTypes.active}
                    Title="Отправить письмо"
                    Click={() => sendMailForVerifying()}
                />
                <Button
                    Type={ButtonTypes.active}
                    Title="Подтвердил"
                    Click={() => Verifying(UserId)}
                />
            </motion.div>
        );
    } else {
        return <Navigate to={AppRoutes.DEFAULT}></Navigate>;
    }
};
export { VerifyingEmailPage };
