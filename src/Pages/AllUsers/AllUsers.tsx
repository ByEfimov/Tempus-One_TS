import { useEffect, useState } from 'react';
import { getAllUsers } from 'Api/Users/getAllUsers';
import PreloaderUsers from 'Components/MiniComponents/PreloaderUsers';
import Styles from './Styles.module.scss';
import ShowUserOrTeam from 'Components/ShowPosts/ShowUsersOrTeam/ShowUsersOrTeam';
import { OpenUserType } from 'Types/TypesOfData/TeamOrUser/OpenUserType';

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
