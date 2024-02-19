import { MassageNotification } from '../notifications/notifications';
import { WhoWrotePost } from '../show-posts/posts/post-render';
import Styles from './styles.module.scss';
import { Subscription } from '@/Api/Users/interaction/subscription';
import { changeRequest } from '@/Api/requests/change-request';
import {
    HeaderIcons,
    PostIcons,
    headerIcons,
    postIcons,
} from '@/Assets/Tempus-Ui';
import { useAuth } from '@/Hooks/useAuth';
import { itsMember } from '@/Utils/users-or-teams/ist-member';
import classNames from 'classnames';
import { FC } from 'react';

interface SubscribeButton {
    WhoWrotePost?: WhoWrotePost;
    id: string | undefined;
}

const SubscribeButton: FC<SubscribeButton> = ({ WhoWrotePost, id }) => {
    const { UserId, UserSubscriptions, UserExperience, UserIsAuth } = useAuth();

    const isMember = itsMember(UserId, UserSubscriptions, WhoWrotePost);
    const isAdminPresent = Object.values(WhoWrotePost?.members || '').some(
        (user) => user.UserId === UserId && user.UserRole === 'Administrator',
    );
    const isTeam = WhoWrotePost?.id && WhoWrotePost.id[0] === '-';

    function subbing() {
        if (UserIsAuth && !isAdminPresent) {
            const message = isMember
                ? 'Вы успешно отписались!'
                : 'Вы успешно подписались';

            const NewXp = isMember ? UserExperience - 10 : UserExperience + 10;

            Subscription(
                isTeam ? 'team' : 'user',
                id,
                UserId,
                isMember ? true : false,
            );

            changeRequest('users/' + UserId, '/experience', NewXp);
            MassageNotification(message);
        }
    }

    return (
        <button
            className={classNames(
                Styles.SubButton,
                (isMember || isAdminPresent) && Styles.sub,
            )}
            onClick={(e) => {
                e.stopPropagation();
                subbing();
            }}
        >
            {isTeam ? (
                <HeaderIcons Icon={headerIcons.SubTeam}></HeaderIcons>
            ) : (
                <PostIcons Icon={postIcons.sub}></PostIcons>
            )}
        </button>
    );
};

export default SubscribeButton;
