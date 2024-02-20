import { getFilteredUsers } from '../api/getFilteredUsers';
import Styles from './styles.module.scss';
import { defaultContainer } from '@/Assets/Tempus-Ui';
import { useHeader } from '@/Hooks/useHeader';
import { OpenUserType } from '@/Types/TypesOfData/team-or-user/open-user-type';
import ShowUserOrTeam from '@/entities/show-users-or-team/show-users-or-team';
import ShowDataOrPreloader from '@/shared/showDataOrPreloader';
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
            <ShowDataOrPreloader data={users}>
                {users?.map((user) => (
                    <ShowUserOrTeam key={user.id} User={user}></ShowUserOrTeam>
                ))}
            </ShowDataOrPreloader>
        </motion.ul>
    );
}
