/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from 'react-router-dom';
import Styles from './UserPage.module.scss';
import { useAuth } from 'Hooks/useAuth';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { removeUser } from 'Store/slices/UserSlice';
import ButtonVoid from 'Components/MiniComponents/button';
import { FC, useEffect, useState } from 'react';
import { getUserFromId } from 'Api/Users/getUserDataFromId';
import { getAuth, signOut } from 'firebase/auth';
import { setTitleOfHeader } from 'Store/slices/Header/HeaderSlice';
import { OpenUserType } from 'Types/TypesOfData/TeamOrUser/OpenUserType';
import FakeOpenUser from 'Components/FakeData/FakeOpenUser';
import ShowPosts from 'Components/ShowPosts/Posts/ShowPosts';
import UserIcon from 'Assets/Icons/User/user.svg';
import GiftIcon from 'Assets/Icons/User/gift.svg';
import UsersIcon from 'Assets/Icons/User/users.svg';
import PlusIcon from 'Assets/Icons/Post/plus-circle.svg';
import PreloaderPosts from 'Components/MiniComponents/PreloaderPosts';
import { ErrorNotification } from 'Components/Notifications/Notifications';

export default function UserPage() {
    const { id } = useParams();
    const auth = getAuth();
    const [OpenUser, setOpenUser] = useState<OpenUserType | null>(null);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { UserId, UserEmailVerified } = useAuth();

    useEffect(() => {
        getUserFromId(id)
            .then((user) => {
                setOpenUser(user);
                dispatch(setTitleOfHeader({ Title: user?.name }));
            })
            .catch(() => ErrorNotification('Пользователь не найден.'));
    }, []);

    function LogoutUser() {
        signOut(auth)
            .then(() => {
                dispatch(removeUser());
                navigate('/Login');
            })
            .catch((error) => {
                console.error(error);
            });
    }
    if (OpenUser) {
        return (
            <>
                <UserData OpenUser={OpenUser} />

                {OpenUser.id === UserId && (
                    <ButtonVoid
                        title="Настройки"
                        clickHandler={() => console.log('da')}
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

const UserData: FC<UserDataProps> = ({ OpenUser }) => {
    return (
        <div className={Styles.UserData}>
            <div className={Styles.TopBar}>
                <div className={Styles.UserPhoto}>
                    <img src={OpenUser.photo || UserIcon} alt="UserPhoto" />
                </div>
                <div className={Styles.UserLevel}>{OpenUser.level}</div>
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
                    <button className={Styles.SubButton}>
                        <img src={PlusIcon} alt="" />
                    </button>
                </div>
            </div>
        </div>
    );
};
