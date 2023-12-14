import { useEffect, useState } from 'react';
import { getAllUsers } from '../../Api/Users/getAllUsers';
import { OpenUserType } from '../OpenUser/UserPage';
import PreloaderUsers from '../../Components/minicops/PreloaderUsers';
import Styles from './Styles.module.scss';
import ShowUserOrTeam from '../../Components/ShowUsersOrTeam/ShowUsersOrTeam';

export default function AllUsers() {
    const [users, setUsers] = useState<OpenUserType[] | null>(null);

    useEffect(() => {
        getAllUsers().then((users) => setUsers(users));
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
