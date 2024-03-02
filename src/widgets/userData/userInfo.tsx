import { UserType } from '@/app/slices/userSlice';
import { OpenUserType } from '@/app/types/TypesOfData/team-or-user/open-user-type';
import { LastQuiz, Subscribers } from '@/entities/infoGrouops';

const UserInfo = ({ OpenUser }: { OpenUser: OpenUserType | UserType }) => {
  return (
    <>
      <Subscribers errorAuthor="пользователя" members={OpenUser.members} />
      <LastQuiz errorAuthor="пользователь" />
    </>
  );
};
export default UserInfo;
