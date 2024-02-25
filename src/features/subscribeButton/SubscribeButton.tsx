import { WhoWrotePost } from '../../entities/post/postRender';
import Styles from './styles.module.scss';
import { Subscription } from '@/app/api/Users/interaction/subscription';
import { changeRequest } from '@/app/api/requests/change-request';
import { HeaderIcons, PostIcons, headerIcons, postIcons } from '@/app/assets/Tempus-Ui';
import { useAuth } from '@/app/hooks/useAuth';
import { itsMember } from '@/shared/users-or-teams/ist-member';
import classNames from 'classnames';
import { toast } from 'react-toastify';

interface SubscribeButton {
  WhoWrotePost?: WhoWrotePost;
  id: string | undefined;
}

const SubscribeButton = ({ WhoWrotePost, id }: SubscribeButton) => {
  const { UserId, UserSubscriptions, UserExperience, UserIsAuth } = useAuth();

  const isMember = itsMember(UserId, UserSubscriptions, WhoWrotePost);
  const isAdminPresent = Object.values(WhoWrotePost?.members || '').some(
    (user) => user.UserId === UserId && user.UserRole === 'Administrator',
  );
  const isTeam = WhoWrotePost?.id && WhoWrotePost.id[0] === '-';

  function subbing() {
    if (UserIsAuth && !isAdminPresent) {
      const message = isMember ? 'Вы отписались!' : 'Вы подписались';

      const NewXp = isMember ? UserExperience - 10 : UserExperience + 10;

      Subscription(isTeam ? 'team' : 'user', id, UserId, isMember ? true : false);

      changeRequest('users/' + UserId, '/experience', NewXp);
      toast.info(message);
    } else {
      toast.error('Нужно войти в аккаунт.');
    }
  }

  return (
    <button
      className={classNames(Styles.SubButton, (isMember || isAdminPresent) && Styles.sub)}
      onClick={(e) => {
        e.stopPropagation();
        subbing();
      }}
    >
      {isTeam ? <HeaderIcons Icon={headerIcons.SubTeam}></HeaderIcons> : <PostIcons Icon={postIcons.sub}></PostIcons>}
    </button>
  );
};

export default SubscribeButton;
