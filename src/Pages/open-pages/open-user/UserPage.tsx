import Styles from './Styles.module.scss';
import { getRequestObject } from 'Api/requests/get-requests';
import GiftIcon from 'Assets/Icons/User/gift.svg';
import UserIcon from 'Assets/Icons/User/user.svg';
import UsersIcon from 'Assets/Icons/User/users.svg';
import FakeOpenUser from 'Components/fake-data/fake-open-user';
import ButtonVoid from 'Components/mini-components/button';
import PreloaderPosts from 'Components/mini-components/preloader-posts';
import SubscribeButton from 'Components/mini-components/subscribe-button';
import SettingsUserModal from 'Components/modals/settings-modal/settings-user-modal';
import { ErrorNotification } from 'Components/notifications/notifications';
import ShowPosts from 'Components/show-posts/posts/show-posts';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { useAuth } from 'Hooks/useAuth';
import { removeUser } from 'Store/slices/UserSlice';
import { OpenUserType } from 'Types/TypesOfData/team-or-user/open-user-type';
import MaxXpToNextLevel from 'Utils/users-or-teams/max-xp-to-next-level';
import { getAuth, signOut } from 'firebase/auth';
import Cookies from 'js-cookie';
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
        getRequestObject('users/' + id)
            .then((user) => {
                setOpenUser(user);
            })
            .catch(() => ErrorNotification('Пользователь не найден.'));
    }, []);

    function LogoutUser() {
        signOut(auth)
            .then(() => {
                dispatch(removeUser());
                Cookies.remove('UserId');
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

                <ShowPosts></ShowPosts>
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
