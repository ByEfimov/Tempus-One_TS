import { useNavigate, useParams } from 'react-router-dom';
import { UsersList } from '../../Api/Users';
import FeatherIcon from 'feather-icons-react';
import Styles from './UserPage.module.scss';
import { UserAchives } from '../../Api/UserAchives';
import { useAuth } from '../../Hooks/useAuth';
import { useAppDispatch } from '../../Hooks/redus-hooks';
import { removeUser } from '../../Store/slices/UserSlice';
import ButtonVoid from '../../Components/minicops/B-void';
import { FC } from 'react';

interface UserDataProps {
    OpenUser: {
        photo: string;
        name: string;
        email: string;
        id: number;
        age: number;
    };
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

const ShowcaseAchives = () => {
    interface AchiveProps {
        AchiveData: {
            AchivePhoto: string;
            AchiveTitle: string;
            AchiveDate: string;
            AchiveDesc: string;
            AchiveId: number;
        };
    }
    const Achive: FC<AchiveProps> = ({ AchiveData }) => {
        return (
            <div className={Styles.Achiwement}>
                <img
                    src={AchiveData.AchivePhoto}
                    className={Styles.AchIcon}
                    alt=""
                />
                <p className={Styles.AchText}>{AchiveData.AchiveTitle}</p>
            </div>
        );
    };
    return (
        <div className={Styles.Showcase}>
            <div className={Styles.title}>
                Ветрина достижений
                <FeatherIcon icon="eye"></FeatherIcon>
            </div>
            {UserAchives.map((AchiveData) => (
                <Achive
                    AchiveData={AchiveData}
                    key={AchiveData.AchiveId}
                ></Achive>
            ))}
        </div>
    );
};

export default function UserPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { UserId } = useAuth();
    const OpenUser = UsersList.find((user) => user.id.toString() == id);

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

                <ShowcaseAchives />

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
