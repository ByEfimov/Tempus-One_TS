import Styles from './styles.module.scss';
import {
    Button,
    ButtonIcons,
    ButtonTypes,
    buttonIcons,
    formContainer,
    formItem,
} from '@/Assets/Tempus-Ui';
import { useAppDispatch, useAppSelector } from '@/Hooks/redux-hooks';
import { useAuth } from '@/Hooks/useAuth';
import { UserData } from '@/Pages/openUser/ui/Page';
import { UserType, removeUser } from '@/Store/slices/UserSlice';
import AppRoutes from '@/Utils/routes/app-routes';
import { ErrorNotification } from '@/features/notifications/notifications';
import SettingsUserModal from '@/widgets/settingsModal/settingsUserModal';
import { getAuth, signOut } from 'firebase/auth';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const MyProfilePage = () => {
    const { UserIsAuth } = useAuth();
    const OpenUser: UserType = useAppSelector((state) => state.user);
    const [settingsModalOpen, setSettingsModalOpen] = useState(false);

    if (UserIsAuth) {
        return (
            <motion.div className={Styles.ProfilePage}>
                <MyProfileModals
                    settingsModalOpen={settingsModalOpen}
                    setSettingsModalOpen={setSettingsModalOpen}
                />
                <UserData OpenUser={OpenUser} />
                <ActiveButtons setSettingsModalOpen={setSettingsModalOpen} />
            </motion.div>
        );
    } else {
        return <Navigate to={AppRoutes.DEFAULT} />;
    }
};

interface MyProfileModalsProps {
    settingsModalOpen: boolean;
    setSettingsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function MyProfileModals({
    settingsModalOpen,
    setSettingsModalOpen,
}: MyProfileModalsProps) {
    return (
        settingsModalOpen && (
            <SettingsUserModal setModalOpen={setSettingsModalOpen} />
        )
    );
}

const ActiveButtons = ({
    setSettingsModalOpen,
}: {
    setSettingsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { PathToProfile, UserEmailVerified } = useAuth();
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
    return (
        <motion.ul className={Styles.Buttons} {...formContainer}>
            {!UserEmailVerified && (
                <Button
                    Title="Подтвердить почту"
                    Variants={formItem}
                    Type={ButtonTypes.active}
                    Click={() => {
                        navigate(AppRoutes.VERIFYINGEMAIL);
                    }}
                />
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
                <ButtonIcons Icon={buttonIcons.User} />
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
                <ButtonIcons Icon={buttonIcons.Friends} />
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
                <ButtonIcons Icon={buttonIcons.Teams} />
            </Button>
            <Button
                Class={Styles.Button}
                Variants={formItem}
                Type={ButtonTypes.default}
                Title="Поделиться профилем"
                Click={() => {
                    navigator.clipboard.writeText(
                        'https://tempus-one-ts.vercel.app' + PathToProfile,
                    );
                }}
            >
                <ButtonIcons Icon={buttonIcons.Link} />
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
                <ButtonIcons Icon={buttonIcons.Theme} />
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
                <ButtonIcons Icon={buttonIcons.Support} />
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
                <ButtonIcons Icon={buttonIcons.Settings} />
            </Button>
            <Button
                Variants={formItem}
                Type={ButtonTypes.error}
                Title="Выйти"
                Click={LogoutUser}
            ></Button>
        </motion.ul>
    );
};

export { MyProfilePage };
