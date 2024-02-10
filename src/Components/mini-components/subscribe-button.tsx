import Styles from './styles.module.scss';
import { Subscription } from 'Api/Users/interaction/subscription';
import { changeRequest } from 'Api/requests/change-request';
import {
    HeaderIcons,
    PostIcons,
    headerIcons,
    postIcons,
} from 'Assets/Tempus-Ui';
import {
    ErrorNotification,
    MassageNotification,
} from 'Components/notifications/notifications';
import { WhoWrotePost } from 'Components/show-posts/posts/post-render';
import { useAuth } from 'Hooks/useAuth';
import { itsMember } from 'Utils/users-or-teams/ist-member';
import classNames from 'classnames';
import { FC } from 'react';

interface SubscribeButton {
    WhoWrotePost: WhoWrotePost | null;
    id: string | undefined;
}

const SubscribeButton: FC<SubscribeButton> = ({ WhoWrotePost, id }) => {
    const { UserId, UserSubscriptions, UserExperience, UserIsAuth } = useAuth();

    const isMember = itsMember(WhoWrotePost, UserId, UserSubscriptions);
    const isAdminPresent = Object.values(WhoWrotePost?.members || '').some(
        (user) => user.UserId === UserId && user.UserRole === 'Administrator',
    );
    const isTeam = WhoWrotePost?.id && WhoWrotePost.id[0] === '-';

    function subbing() {
        if (UserIsAuth) {
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
        } else {
            ErrorNotification('Нужно войти в аккаунт.');
        }
    }

    return (
        !isAdminPresent && (
            <button
                className={classNames(Styles.SubButton, isMember && Styles.sub)}
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
        )
    );
};

export default SubscribeButton;
