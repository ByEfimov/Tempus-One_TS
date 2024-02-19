import { getFilteredUsers } from '../api/getFilteredUsers';
import Styles from './styles.module.scss';
import { Preloader, defaultContainer } from '@/Assets/Tempus-Ui';
import ShowUserOrTeam from '@/Components/show-users-or-team/show-users-or-team';
import { useHeader } from '@/Hooks/useHeader';
import { OpenUserType } from '@/Types/TypesOfData/team-or-user/open-user-type';
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

    return (
        <motion.ul {...defaultContainer} className={Styles.Users}>
            {users ? (
                users.map((user) => (
                    <ShowUserOrTeam key={user.id} User={user}></ShowUserOrTeam>
                ))
            ) : (
                <Preloader></Preloader>
            )}
        </motion.ul>
    );
}
