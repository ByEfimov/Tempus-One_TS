import FakeLogo from '@/app/assets/Icons/Header/user.svg';
import { useAuth } from '@/app/hooks/useAuth';

const UserLogo = ({ Logo }: { Logo?: string | null }) => {
  const user = useAuth();

  return (
    <img
      style={user.isAuth || Logo ? { width: '100%', height: '100%', borderRadius: '50%' } : undefined}
      src={(Logo && Logo) || (!user.isAuth && FakeLogo) || (user.isAuth && user.photo)}
      alt="user logo"
    />
  );
};

export default UserLogo;
