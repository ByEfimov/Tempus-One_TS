import { useEffect, useState } from 'react';
import { getAllUsers } from '../../Api/Users/getAllUsers';
import { OpenUserType } from '../OpenUser/UserPage';
import { useNavigate } from 'react-router-dom';
import {
    TypesOfHeader,
    setHeader,
} from '../../Store/slices/Header/HeaderSlice';
import { useAppDispatch } from '../../Hooks/redus-hooks';
import PreloaderUsers from '../../Components/minicops/PreloaderUsers';
import Styles from './Styles.module.scss';
import PlussIcon from '../../Assets/Icons/Post/plus-circle.svg';
import UserIcon from '../../Assets/Icons/Header/user.svg';

export default function AllUsers() {
    const [users, setUsers] = useState<OpenUserType[] | null>(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        getAllUsers().then((users) => setUsers(users));
        dispatch(
            setHeader({ Title: 'Люди', Type: TypesOfHeader.WithSearchBar })
        );
    }, []);

    return users ? (
        <div className={Styles.Users}>
            {users.map((user) => (
                <div
                    key={user.id}
                    className={Styles.User}
                    onClick={() => navigate('/User/' + user.id)}
                >
                    <div className={Styles.Data}>
                        <div className={Styles.Photo}>
                            <img src={user.photo || UserIcon} alt="" />
                        </div>
                        <div className={Styles.Text}>
                            <div className={Styles.Title}>{user.name}</div>
                            <div className={Styles.Members}>
                                {Object.values(user.level).length} уровень
                            </div>
                        </div>
                    </div>
                    <div className={Styles.Activity}>
                        <button className={Styles.SubButton}>
                            <img src={PlussIcon} alt="" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    ) : (
        <PreloaderUsers></PreloaderUsers>
    );
}
