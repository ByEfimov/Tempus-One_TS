import {
    ErrorNotification,
    MassageNotification,
} from './notifications/notifications';
import { changeRequest } from '@/Api/requests/change-request';
import { postRequestWithNewId } from '@/Api/requests/post-requests-with-new-id';
import { PostType } from '@/Store/slices/wite-post/write-post-slice';
import AppRoutes from '@/Utils/routes/app-routes';
import { CloseModal } from '@/shared/isModal';
import { getUnixTime } from 'date-fns';
import { NavigateFunction } from 'react-router-dom';

export function repostToYou({
    post,
    UserIsAuth,
    UserId,
    navigate,
}: {
    post: PostType;
    UserIsAuth: boolean;
    UserId: string;
    navigate: NavigateFunction;
}) {
    const currentDate = new Date();
    const currentUnixTime = getUnixTime(currentDate);

    const NewPost: PostType = {
        ...post,
        PostWithRepostUs: post.id,
        author: UserId,
        date: currentUnixTime,
    };

    if (UserIsAuth) {
        postRequestWithNewId('posts/', NewPost);

        changeRequest('posts/' + post.id, '/reposts/', (post.reposts || 0) + 1);
        navigate(AppRoutes.USER + '/' + UserId);
        MassageNotification('Пост отправлен!');
    } else {
        if (!UserIsAuth) {
            ErrorNotification('Нужно войти в аккаунт.');
        }
        ErrorNotification('Ошибка при отправке поста.');
    }
    CloseModal();
}
