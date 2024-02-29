import { sendMailForVerifying } from '../api/sendMail';
import { Verifying } from '../api/verifying';
import Styles from './styles.module.scss';
import { Button, ButtonTypes, formContainer, formItem } from '@/app/assets/Tempus-Ui';
import { useAuth } from '@/app/hooks/useAuth';
import AppRoutes from '@/shared/routes/app-routes';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';

const VerifyingEmailPage = () => {
  const { UserEmailVerified, UserId } = useAuth();

  if (!UserEmailVerified) {
    return (
      <motion.div className={Styles.wrapper}>
        <motion.div {...formContainer} className={Styles.buttons}>
          <motion.h1 variants={formItem} className={Styles.Title}>
            Отправь письмо и подтверди почту!
          </motion.h1>
          <Button
            Variants={formItem}
            Type={ButtonTypes.active}
            Title="Отправить письмо"
            Click={() => sendMailForVerifying()}
          />
          <Button Variants={formItem} Type={ButtonTypes.active} Title="Подтвердил" Click={() => Verifying(UserId)} />
        </motion.div>
      </motion.div>
    );
  } else {
    return <Navigate to={AppRoutes.DEFAULT}></Navigate>;
  }
};
export { VerifyingEmailPage };
