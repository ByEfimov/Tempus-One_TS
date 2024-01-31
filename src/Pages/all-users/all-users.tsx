import Styles from './Styles.module.scss';
import { getRequestArray } from 'Api/requests/get-requests';
import { defaultContainer } from 'Assets/Tempus-Ui/Animation/Form-animate';
import Preloader from 'Assets/Tempus-Ui/Components/Preloader/Preloader';
import { ErrorNotification } from 'Components/notifications/notifications';
import ShowUserOrTeam from 'Components/show-users-or-team/show-users-or-team';
import { OpenUserType } from 'Types/TypesOfData/team-or-user/open-user-type';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function AllUsers() {
    const [users, setUsers] = useState<OpenUserType[] | null>(null);

    useEffect(() => {
        getRequestArray('users/')
            .then((users) => setUsers(users))
            .catch(() => ErrorNotification('Пользователи не найдены.'));
    }, []);

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
