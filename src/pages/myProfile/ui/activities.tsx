import Styles from './styles.module.scss';
import { Button, ButtonIcons, ButtonTypes, buttonIcons, formContainer, formItem } from '@/app/assets/Tempus-Ui';
import { useAppDispatch } from '@/app/hooks/redux-hooks';
import { useAuth } from '@/app/hooks/useAuth';
import { removeUser } from '@/app/slices/userSlice';
import AppRoutes from '@/shared/routes/app-routes';
import { getAuth, signOut } from 'firebase/auth';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
        toast.error('Ошибка выхода.');
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
          navigator.clipboard.writeText('https://tempus-one-ts.vercel.app' + PathToProfile);
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
      <Button Variants={formItem} Type={ButtonTypes.error} Title="Выйти" Click={LogoutUser}></Button>
    </motion.ul>
  );
};

export default ActiveButtons;
