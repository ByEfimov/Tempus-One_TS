import Styles from './Styles.module.scss';
import { getAllUsers } from 'Api/Users/get-data/get-all-users';
import PreloaderUsers from 'Components/mini-components/preloader-users';
import { ErrorNotification } from 'Components/notifications/notifications';
import ShowUserOrTeam from 'Components/show-users-or-team/ShowUsersOrTeam';
import { OpenUserType } from 'Types/TypesOfData/team-or-user/open-user-type';
import { useEffect, useState } from 'react';

export default function AllUsers() {
    const [users, setUsers] = useState<OpenUserType[] | null>(null);

    useEffect(() => {
        getAllUsers()
            .then((users) => setUsers(users))
            .catch(() => ErrorNotification('Пользователи не найдены.'));
    }, []);

    return users ? (
        <div className={Styles.Users}>
            {users.map((user) => (
                <ShowUserOrTeam key={user.id} User={user}></ShowUserOrTeam>
            ))}
        </div>
    ) : (
        <PreloaderUsers></PreloaderUsers>
    );
}
