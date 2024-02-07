import Styles from './Styles.module.scss';
import { getRequestArray } from 'Api/requests/get-requests';
import { defaultContainer } from 'Assets/Tempus-Ui/Animation/Form-animate';
import Preloader from 'Assets/Tempus-Ui/Components/Preloader/Preloader';
import ShowUserOrTeam from 'Components/show-users-or-team/show-users-or-team';
import { useHeader } from 'Hooks/useHeader';
import { OpenUserType } from 'Types/TypesOfData/team-or-user/open-user-type';
import { filterUsers } from 'Utils/filters/filter-users';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function AllUsers() {
    const [users, setUsers] = useState<OpenUserType[]>();
    const { HeaderSearchBar } = useHeader();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (HeaderSearchBar) {
                const filteredUsers = filterUsers(HeaderSearchBar, users);
                setUsers(filteredUsers);
            } else {
                getRequestArray('users/').then((users) => {
                    setUsers(users);
                });
            }
        }, 1000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [HeaderSearchBar]);

    return (
        <motion.ul
            initial="hidden"
            animate="visible"
            variants={defaultContainer}
            className={Styles.Users}
        >
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
