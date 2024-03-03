import { UserType } from '@/app/slices/userSlice';
import { OpenUserType } from '@/app/types/TypesOfData/team-or-user/open-user-type';
import { LastQuiz, Subscribers } from '@/entities/infoGrouops';

const UserInfo = ({ OpenUser }: { OpenUser: OpenUserType | UserType }) => {
  return (
    <>
      <Subscribers title="Подписчики" errorAuthor="пользователя" members={OpenUser.members} />
      <LastQuiz errorAuthor="Этот пользователь еще не соревновался." />
    </>
  );
};
export default UserInfo;
