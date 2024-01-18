import Styles from './UserPage.module.scss';
import { getUserFromId } from 'Api/Users/get-data/get-user-data-from-id';
import GiftIcon from 'Assets/Icons/User/gift.svg';
import UserIcon from 'Assets/Icons/User/user.svg';
import UsersIcon from 'Assets/Icons/User/users.svg';
import FakeOpenUser from 'Components/FakeData/fake-open-user';
import PreloaderPosts from 'Components/MiniComponents/PreloaderPosts';
import SubscribeButton from 'Components/MiniComponents/SubscribeButton';
import ButtonVoid from 'Components/MiniComponents/button';
import SettingsUserModal from 'Components/Modals/Settings/settings-user-modal';
import { ErrorNotification } from 'Components/Notifications/Notifications';
import ShowPosts from 'Components/ShowPosts/Posts/ShowPosts';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { useAuth } from 'Hooks/useAuth';
import { removeUser } from 'Store/slices/UserSlice';
import { OpenUserType } from 'Types/TypesOfData/TeamOrUser/OpenUserType';
import MaxXpToNextLevel from 'Utils/UsersOrTeams/MaxXpToNextLevel';
import { getAuth, signOut } from 'firebase/auth';
import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function UserPage() {
    const { id } = useParams();
    const auth = getAuth();
    const [OpenUser, setOpenUser] = useState<OpenUserType | null>(null);
    const [settingsModalOpen, setSettingsModalOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { UserId, UserEmailVerified } = useAuth();

    useEffect(() => {
        getUserFromId(id)
            .then((user) => {
                setOpenUser(user);
            })
            .catch(() => ErrorNotification('Пользователь не найден.'));
    }, []);

    function LogoutUser() {
        signOut(auth)
            .then(() => {
                dispatch(removeUser());
                navigate('/Login');
            })
            .catch(() => {
                ErrorNotification('Ошибка выхода.');
            });
    }
    if (OpenUser) {
        return (
            <>
                {settingsModalOpen && (
                    <SettingsUserModal
                        setModalOpen={setSettingsModalOpen}
                    ></SettingsUserModal>
                )}

                <UserData OpenUser={OpenUser} />

                {OpenUser.id === UserId && (
                    <ButtonVoid
                        title="Настройки"
                        clickHandler={() => setSettingsModalOpen(true)}
                    ></ButtonVoid>
                )}
                {OpenUser.id === UserId && !UserEmailVerified && (
                    <ButtonVoid
                        title="Подтвердить почту"
                        clickHandler={() => {
                            navigate('/VerifyingEmail');
                        }}
                    ></ButtonVoid>
                )}
                {OpenUser.id === UserId && (
                    <ButtonVoid
                        title="Выйти"
                        classes={Styles.ButtonLogout}
                        clickHandler={() => {
                            LogoutUser();
                        }}
                    ></ButtonVoid>
                )}

                <ShowPosts filter={OpenUser.id}></ShowPosts>
            </>
        );
    } else if (!OpenUser) {
        return (
            <>
                <FakeOpenUser></FakeOpenUser> <PreloaderPosts></PreloaderPosts>
            </>
        );
    }
}

interface UserDataProps {
    OpenUser: OpenUserType;
}

const UserData: FC<UserDataProps> = ({ OpenUser }) => (
    <div className={Styles.UserData}>
        <div className={Styles.TopBar}>
            <div className={Styles.UserPhoto}>
                <img src={OpenUser.photo || UserIcon} alt="UserPhoto" />
            </div>
            <div className={Styles.UserLevel}>
                {OpenUser.level}
                <progress
                    value={OpenUser.experience}
                    max={MaxXpToNextLevel(OpenUser.level)}
                ></progress>
            </div>
        </div>

        <div className={Styles.UserTexts}>
            <div className={Styles.left}>
                <div className={Styles.UserName}>
                    <img src={UserIcon} alt="" />
                    {OpenUser.name}
                </div>
                <div className={Styles.UserMembers}>
                    <img src={UsersIcon} alt="" />
                    {(OpenUser?.members &&
                        Object.values(OpenUser?.members).length) ||
                        0}{' '}
                    подписчиков
                </div>
                <div className={Styles.UserAge}>
                    <img src={GiftIcon} alt="" />
                    {OpenUser.age} лет
                </div>
            </div>
            <div className={Styles.ActiveButton}>
                <SubscribeButton WhoWrotePost={OpenUser}></SubscribeButton>
            </div>
        </div>
    </div>
);
