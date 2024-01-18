import Styles from './Styles.module.scss';
import { getAllUsers } from 'Api/Users/get-data/get-all-users';
import PreloaderUsers from 'Components/MiniComponents/PreloaderUsers';
import { ErrorNotification } from 'Components/Notifications/Notifications';
import ShowUserOrTeam from 'Components/ShowPosts/PostComponents/ShowUsersOrTeam/ShowUsersOrTeam';
import { OpenUserType } from 'Types/TypesOfData/TeamOrUser/OpenUserType';
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
