import FakeLogo from '@/Assets/Icons/Header/user.svg';
import { useAuth } from '@/app/hooks/useAuth';

const UserLogo = ({ Logo }: { Logo?: string | null }) => {
  const { UserPhoto, UserIsAuth } = useAuth();
  return (
    <img
      style={UserIsAuth || Logo ? { width: '100%', height: '100%', borderRadius: '50%' } : undefined}
      src={(Logo && Logo) || (UserIsAuth && UserPhoto) || FakeLogo}
      alt=""
    />
  );
};

export default UserLogo;
