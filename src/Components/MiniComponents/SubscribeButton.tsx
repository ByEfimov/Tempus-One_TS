import PlusIcon from 'Assets/Icons/Post/plus-circle.svg';
import PlusDarkIcon from 'Assets/Icons/Post/plus-circle-dark.svg';
import { useAuth } from 'Hooks/useAuth';
import { FC } from 'react';
import Styles from './MiniComponents.module.scss';
import { WhoWrotePost } from 'Components/ShowPosts/Posts/PostRender';
import { addToSubscriptionsForUser } from 'Api/Users/addToSubscriptionsForUser';
import { removeSubscription } from 'Api/Users/RemoveSubscription';
import { MassageNotification } from 'Components/Notifications/Notifications';

interface SubscribeButton {
    WhoWrotePost: WhoWrotePost | null;
}

const SubscribeButton: FC<SubscribeButton> = ({ WhoWrotePost }) => {
    const { UserId, UserSubscriptions } = useAuth();

    const isMember =
        WhoWrotePost?.id === UserId ||
        (UserSubscriptions?.users &&
            Object.values(UserSubscriptions?.users).some(
                (member) => member === WhoWrotePost?.id
            )) ||
        (UserSubscriptions?.teams &&
            Object.values(UserSubscriptions?.teams).some(
                (member) => member === WhoWrotePost?.id
            ));

    const isTeam = WhoWrotePost?.id && WhoWrotePost?.id[0] === '-';

    function subbing() {
        if (!isMember) {
            addToSubscriptionsForUser(
                isTeam ? 'team' : 'user',
                WhoWrotePost?.id,
                UserId
            );
            MassageNotification('Вы успешно подписались!');
        } else {
            removeSubscription(
                isTeam ? 'team' : 'user',
                WhoWrotePost?.id,
                UserId
            );
            MassageNotification('Вы успешно отписались!');
        }
    }

    return (
        <button
            className={Styles.SubButton}
            onClick={(e) => {
                e.stopPropagation();
                subbing();
            }}
        >
            {isMember ? (
                <img src={PlusDarkIcon} alt="" />
            ) : (
                <img src={PlusIcon} alt="" />
            )}
        </button>
    );
};

export default SubscribeButton;
