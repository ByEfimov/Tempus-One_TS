import { getFilteredUsers } from '../api/getFilteredUsers';
import Styles from './styles.module.scss';
import { Preloader, defaultContainer } from '@/Assets/Tempus-Ui';
import { useHeader } from '@/Hooks/useHeader';
import { OpenUserType } from '@/Types/TypesOfData/team-or-user/open-user-type';
import ShowUserOrTeam from '@/entities/showUsersOrTeam/showUsersOrTeam';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function UsersPage() {
  const [users, setUsers] = useState<OpenUserType[]>();
  const { HeaderSearchBar } = useHeader();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getFilteredUsers(HeaderSearchBar, setUsers, users);
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [HeaderSearchBar]);

  if (!users) {
    return <Preloader></Preloader>;
  }
  return (
    <motion.ul {...defaultContainer} className={Styles.Users}>
      {users?.map((user) => <ShowUserOrTeam key={user.id} User={user}></ShowUserOrTeam>)}
    </motion.ul>
  );
}
