import PlusIcon from 'Assets/Icons/Post/plus-circle.svg';
import PlusDarkIcon from 'Assets/Icons/Post/plus-circle-dark.svg';
import { useAuth } from 'Hooks/useAuth';
import { FC } from 'react';
import Styles from './MiniComponents.module.scss';
import { WhoWrotePost } from 'Components/ShowPosts/Posts/PostRender';
import { addToSubscriptionsForUser } from 'Api/Users/addToSubscriptionsForUser';
import { removeSubscriptionForUser } from 'Api/Users/RemoveSubscriptionForUser';
import { MassageNotification } from 'Components/Notifications/Notifications';
import { addToSubscriptionsForSub } from 'Api/Users/addToSubscriptionForSub';
import { removeSubscriptionForSub } from 'Api/Users/RemoveSubscriptionForSub';
import changeUserData from 'Api/Users/changeUserData';

interface SubscribeButton {
    WhoWrotePost: WhoWrotePost | null;
}

const SubscribeButton: FC<SubscribeButton> = ({ WhoWrotePost }) => {
    const { UserId, UserSubscriptions, UserExperience } = useAuth();

    const isMember =
        WhoWrotePost?.id === UserId ||
        (UserSubscriptions?.users &&
            Object.values(UserSubscriptions?.users).some(
                (member) => member === WhoWrotePost?.id
            )) ||
        (UserSubscriptions?.teams &&
            Object.values(UserSubscriptions?.teams).some(
                (member) => member === WhoWrotePost?.id
            )) ||
        (WhoWrotePost?.members &&
            Object.values(WhoWrotePost?.members).some(
                (member) =>
                    member.UserId === UserId &&
                    member.UserRole === 'Administrator'
            ));

    const isTeam = WhoWrotePost?.id && WhoWrotePost?.id[0] === '-';

    function subbing() {
        if (!isMember) {
            addToSubscriptionsForUser(
                isTeam ? 'team' : 'user',
                WhoWrotePost?.id,
                UserId
            );
            addToSubscriptionsForSub(
                isTeam ? 'team' : 'user',
                WhoWrotePost?.id,
                UserId
            );
            changeUserData('experience', UserExperience + 10, UserId);
            MassageNotification('Вы успешно подписались!');
        } else {
            removeSubscriptionForUser(
                isTeam ? 'team' : 'user',
                WhoWrotePost?.id,
                UserId
            );
            removeSubscriptionForSub(
                isTeam ? 'team' : 'user',
                WhoWrotePost?.id,
                UserId
            );
            changeUserData('experience', UserExperience - 10, UserId);
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
