import { useEffect, useState } from 'react';
import { getAllUsers } from '../../Api/Users/getAllUsers';
import { OpenUserType } from '../OpenUser/UserPage';
import { useNavigate } from 'react-router-dom';

export default function AllUsers() {
    const [users, setUsers] = useState<OpenUserType[] | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        getAllUsers().then((users) => setUsers(users));
    }, []);

    return (
        users && (
            <div
                style={{
                    marginTop: 80,
                    padding: 20,
                    display: 'flex',
                    gap: 10,
                    flexDirection: 'column',
                }}
            >
                {users.map((user) => (
                    <div
                        key={user.id}
                        onClick={() => navigate('/User/' + user.id)}
                    >
                        {user.name} {user.email}
                    </div>
                ))}
            </div>
        )
    );
}
