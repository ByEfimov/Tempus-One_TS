import { defaultContainer, defaultItem } from '../..';
import Styles from './members.module.scss';
import { OpenUserType } from '@/app/types/TypesOfData/team-or-user/open-user-type';
import { getUsersFromIdArray } from '@/features/api/Users/getUsersFromIdArray';
import AppRoutes from '@/shared/routes/app-routes';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Members = ({
  members,
}: {
  members:
    | null
    | {
        UserId: string;
        UserRole: string;
      }[];
}) => {
  const navigate = useNavigate();
  const [MembersArray, setMembersArray] = useState<OpenUserType[]>([]);

  useEffect(() => {
    const fetchMembersData = async () => {
      if (!members) {
        return null;
      }
      getUsersFromIdArray(members).then((users) => setMembersArray(users));
    };

    fetchMembersData();
  }, [members]);

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
