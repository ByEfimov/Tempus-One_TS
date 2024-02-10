import Styles from './my-profile.module.scss';
import {
    Button,
    ButtonIcons,
    ButtonTypes,
    buttonIcons,
    formContainer,
    formItem,
} from 'Assets/Tempus-Ui';
import SettingsUserModal from 'Components/modals/settings-modal/settings-user-modal';
import { ErrorNotification } from 'Components/notifications/notifications';
import { useAppDispatch, useAppSelector } from 'Hooks/redux-hooks';
import { useAuth } from 'Hooks/useAuth';
import { UserData } from 'Pages/open-pages/open-user/user-page';
import { UserType, removeUser } from 'Store/slices/UserSlice';
import AppRoutes from 'Utils/routes/app-routes';
import { getAuth, signOut } from 'firebase/auth';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const MyProfile = () => {
    const { UserIsAuth, PathToProfile, UserEmailVerified } = useAuth();
    const OpenUser: UserType = useAppSelector((state) => state.user);
    const [settingsModalOpen, setSettingsModalOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const auth = getAuth();

    function LogoutUser() {
        signOut(auth)
            .then(() => {
                dispatch(removeUser());
                Cookies.remove('UserId');
                navigate(AppRoutes.LOGIN);
            })
            .catch(() => {
                ErrorNotification('Ошибка выхода.');
            });
    }

    if (UserIsAuth) {
        return (
            <>
                {settingsModalOpen && (
                    <SettingsUserModal
                        setModalOpen={setSettingsModalOpen}
                    ></SettingsUserModal>
                )}

                <UserData OpenUser={OpenUser}></UserData>
                <motion.ul
                    className={Styles.Buttons}
                    variants={formContainer}
                    initial="hidden"
                    animate="visible"
                >
                    {!UserEmailVerified && (
                        <Button
                            Title="Подтвердить почту"
                            Variants={formItem}
                            Type={ButtonTypes.active}
                            Click={() => {
                                navigate(AppRoutes.VERIFYINGEMAIL);
                            }}
                        ></Button>
                    )}
                    <Button
                        Class={Styles.Button}
                        Type={ButtonTypes.default}
                        Variants={formItem}
                        Title="Перейти в профиль"
                        Click={() => {
                            navigate(PathToProfile);
                        }}
                    >
                        <ButtonIcons Icon={buttonIcons.User}></ButtonIcons>
                    </Button>
                    <Button
                        Class={Styles.Button}
                        Type={ButtonTypes.default}
                        Variants={formItem}
                        Title="Друзья"
                        Click={() => {
                            navigate(AppRoutes.USERS);
                        }} // Переделать
                    >
                        <ButtonIcons Icon={buttonIcons.Friends}></ButtonIcons>
                    </Button>
                    <Button
                        Class={Styles.Button}
                        Type={ButtonTypes.default}
                        Variants={formItem}
                        Click={() => {
                            navigate(AppRoutes.TEAMS); // Переделать
                        }}
                        Title="Мои сообщества"
                    >
                        <ButtonIcons Icon={buttonIcons.Teams}></ButtonIcons>
                    </Button>
                    <Button
                        Class={Styles.Button}
                        Variants={formItem}
                        Type={ButtonTypes.default}
                        Title="Поделиться профилем"
                        Click={() => {
                            navigator.clipboard.writeText(
                                'https://tempus-one-ts.vercel.app' +
                                    PathToProfile,
                            );
                        }}
                    >
                        <ButtonIcons Icon={buttonIcons.Link}></ButtonIcons>
                    </Button>
                    <Button
                        Variants={formItem}
                        Class={Styles.Button}
                        Type={ButtonTypes.default}
                        Title="Тема приложения"
                        Click={() => {
                            // Переделать
                        }}
                    >
                        <ButtonIcons Icon={buttonIcons.Theme}></ButtonIcons>
                    </Button>
                    <Button
                        Variants={formItem}
                        Class={Styles.Button}
                        Type={ButtonTypes.default}
                        Title="Поддержка"
                        Click={() => {
                            window.open('https://t.me/NikitaEfimovv');
                        }}
                    >
                        <ButtonIcons Icon={buttonIcons.Support}></ButtonIcons>
                    </Button>
                    <Button
                        Variants={formItem}
                        Class={Styles.Button}
                        Type={ButtonTypes.default}
                        Title="Настройки"
                        Click={() => {
                            setSettingsModalOpen(true);
                        }}
                    >
                        <ButtonIcons Icon={buttonIcons.Settings}></ButtonIcons>
                    </Button>
                    <Button
                        Variants={formItem}
                        Type={ButtonTypes.error}
                        Title="Выйти"
                        Click={LogoutUser}
                    ></Button>
                </motion.ul>
            </>
        );
    } else {
        return <Navigate to={AppRoutes.DEFAULT}></Navigate>;
    }
};

export default MyProfile;
