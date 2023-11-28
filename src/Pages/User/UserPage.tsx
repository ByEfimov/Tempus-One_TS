import { useNavigate, useParams } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import Styles from './UserPage.module.scss';
import { useAuth } from '../../Hooks/useAuth';
import { useAppDispatch } from '../../Hooks/redus-hooks';
import { removeUser } from '../../Store/slices/UserSlice';
import ButtonVoid from '../../Components/minicops/B-void';
import { FC, useEffect, useState } from 'react';
import { getUserFromId } from '../../Api/Utils/getUserdataFromId';

export default function UserPage() {
    const { id } = useParams();
    const [OpenUser, setOpenUser] = useState<OpenUserType | null>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { UserId } = useAuth();

    useEffect(() => {
        getUserFromId(id).then((user) => setOpenUser(user));
    }, []);

    return (
        OpenUser && (
            <>
                <UserData OpenUser={OpenUser} />

                {OpenUser.id === UserId && (
                    <ButtonVoid
                        title="Редактировать профиль"
                        classes={Styles.Button}
                        clickHandler={() => console.log('da')}
                    ></ButtonVoid>
                )}

                {OpenUser.id === UserId && (
                    <ButtonVoid
                        title="Выйти"
                        classes={Styles.ButtonLogout}
                        clickHandler={() => {
                            dispatch(removeUser());
                            navigate('/Login');
                        }}
                    ></ButtonVoid>
                )}
            </>
        )
    );
}

export type OpenUserType = {
    photo: string;
    name: string;
    email: string;
    id: string;
    age: number;
};

interface UserDataProps {
    OpenUser: OpenUserType;
}

const UserData: FC<UserDataProps> = ({ OpenUser }) => {
    return (
        <div className={Styles.UserData}>
            <div className={Styles.UserPhoto}>
                <img src={OpenUser.photo} alt="UserPhoto" />
            </div>
            <div className={Styles.UserTexts}>
                <div className={Styles.UserName}>{OpenUser.name}</div>
                <div className={Styles.UserStatus}>{OpenUser.email}</div>
                <div className={Styles.UserStats}>
                    <div className={Styles.UserLevel}>
                        <FeatherIcon
                            icon="trending-up"
                            className={Styles.Img}
                        />
                        {OpenUser.id}
                    </div>
                    <div className={Styles.UserAge}>
                        <FeatherIcon icon="users" className={Styles.Img} />
                        {OpenUser.age}
                    </div>
                    <div className={Styles.UserLikes}>
                        <FeatherIcon icon="thumbs-up" className={Styles.Img} />
                        {OpenUser.id}
                    </div>
                </div>
            </div>
        </div>
    );
};
