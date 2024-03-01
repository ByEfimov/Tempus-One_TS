import Styles from './styles.module.scss';
import { UserType } from '@/app/slices/userSlice';
import { OpenUserType } from '@/app/types/TypesOfData/team-or-user/open-user-type';

const UserInfo = ({ OpenUser }: { OpenUser: OpenUserType | UserType }) => {
  return <div className={Styles.Group}>{OpenUser.age}</div>;
};
export default UserInfo;
