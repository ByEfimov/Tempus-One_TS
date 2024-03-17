import { WhoWrotePost } from '../../entities/post/postRender';
import { Subscription } from '../api/Users/interaction/subscription';
import { changeRequest } from '../api/requests/change-request';
import Styles from './styles.module.scss';
import { HeaderIcons, PostIcons, headerIcons, postIcons } from '@/app/assets/Tempus-Ui';
import { useAuth } from '@/app/hooks/useAuth';
import { NOTIFI_TEXTS } from '@/shared/notifyTexts/notifyTexts';
import { itsMember } from '@/shared/users-or-teams/ist-member';
import classNames from 'classnames';
import { toast } from 'react-toastify';

interface SubscribeButton {
  WhoWrotePost?: WhoWrotePost;
  id: string | undefined;
}

const SubscribeButton = ({ WhoWrotePost, id }: SubscribeButton) => {
  const user = useAuth();

  const isMember = itsMember(user.id, user.subscriptions, WhoWrotePost);
  const isAdminPresent = Object.values(WhoWrotePost?.members || '').some(
    (User) => User.UserId === user.id && User.UserRole === 'Administrator',
  );
  const isTeam = WhoWrotePost?.id && WhoWrotePost.id[0] === '-';

  function subbing() {
    if (user.isAuth && !isAdminPresent && WhoWrotePost?.id !== user.id) {
      const message = isMember ? 'Вы отписались!' : 'Вы подписались!';

      const NewXp = isMember ? user.experience - 10 : user.experience + 10;

      Subscription(isTeam ? 'team' : 'user', id, user.id, isMember ? true : false);

      changeRequest('users/' + user.id, '/experience', NewXp);
      toast.info(message);
    } else {
      if (isAdminPresent) {
        toast.warning('Это сообщество принадлежит вам.');
      }
      if (WhoWrotePost?.id === user.id) {
        toast.warning('Этот аккаунт принадлежит вам.');
      }
      if (!user.isAuth) {
        toast.error(NOTIFI_TEXTS.ERROR_NOT_AUTH);
      }
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
