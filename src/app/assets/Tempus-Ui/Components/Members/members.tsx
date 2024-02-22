import { defaultContainer, defaultItem } from '../..';
import Styles from './members.module.scss';
import { OpenUserType } from '@/app/types/TypesOfData/team-or-user/open-user-type';
import AppRoutes from '@/shared/routes/app-routes';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Members = ({ MembersArray }: { MembersArray: OpenUserType[] }) => {
  const navigate = useNavigate();
  return (
    <motion.ul {...defaultContainer} className={Styles.Members}>
      {MembersArray.map((user) => (
        <motion.li
          key={user.id}
          variants={defaultItem}
          className={Styles.Member}
          onClick={() => {
            navigate(AppRoutes.USER + '/' + user.id);
          }}
        >
          <img src={user.photo} alt="" />
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default Members;
