import Styles from './styles.module.scss';
import { defaultItem, formContainer, formItem } from '@/app/assets/Tempus-Ui';
import { UserType } from '@/app/slices/userSlice';
import { OpenUserType } from '@/app/types/TypesOfData/team-or-user/open-user-type';
import { UserLogoWithXp } from '@/shared/userLogo/userLogoWithXp';
import { motion } from 'framer-motion';

const UserData = ({ OpenUser }: { OpenUser: OpenUserType | UserType }) => {
  return (
    <motion.mark className={Styles.UserData} id="UserData" variants={defaultItem}>
      <motion.ul {...formContainer} className={Styles.UserTexts}>
        <UserLogoWithXp OpenUser={OpenUser} />
        <div className={Styles.data}>
          <motion.li variants={formItem} className={Styles.UserName}>
            {OpenUser.name}
          </motion.li>
          <motion.li variants={formItem} className={Styles.UserEmail}>
            {OpenUser.specialization ? OpenUser.specialization : OpenUser.email}
          </motion.li>
          <motion.li variants={formItem} className={Styles.UserLevel}>
            {OpenUser.level} уровень
          </motion.li>
        </div>
      </motion.ul>
    </motion.mark>
  );
};
export default UserData;
