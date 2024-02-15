import FakeLogo from 'Assets/Icons/Header/user.svg';
import { useAuth } from 'Hooks/useAuth';

const UserLogo = ({ Logo }: { Logo?: string }) => {
    const { UserPhoto, UserIsAuth } = useAuth();
    return (
        <img
            style={
                UserIsAuth || Logo
                    ? { width: '100%', height: '100%' }
                    : undefined
            }
            src={(Logo && Logo) || (UserIsAuth && UserPhoto) || FakeLogo}
            alt=""
        />
    );
};

export default UserLogo;
