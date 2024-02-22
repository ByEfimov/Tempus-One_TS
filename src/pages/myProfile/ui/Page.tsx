import ActiveButtons from './activities';
import { MyProfileModals } from './modals';
import Styles from './styles.module.scss';
import { useAppSelector } from '@/app/hooks/redux-hooks';
import { useAuth } from '@/app/hooks/useAuth';
import { UserType } from '@/app/slices/UserSlice';
import AppRoutes from '@/shared/routes/app-routes';
import UserData from '@/widgets/userData/userData';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const MyProfilePage = () => {
  const { UserIsAuth } = useAuth();
  const OpenUser: UserType = useAppSelector((state) => state.user);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  if (UserIsAuth) {
    return (
      <motion.div className={Styles.ProfilePage}>
        <MyProfileModals settingsModalOpen={settingsModalOpen} setSettingsModalOpen={setSettingsModalOpen} />
        <UserData OpenUser={OpenUser}></UserData>
        <ActiveButtons setSettingsModalOpen={setSettingsModalOpen} />
      </motion.div>
    );
  } else {
    return <Navigate to={AppRoutes.DEFAULT} />;
  }
};

export { MyProfilePage };
