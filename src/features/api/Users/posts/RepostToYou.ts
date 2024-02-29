import { changeRequest } from '../../requests/change-request';
import { postRequestWithNewId } from '../../requests/post-requests-with-new-id';
import { PostType } from '@/app/slices/witePost/writePostSlice';
import { CloseModal } from '@/shared/modals/isModal';
import AppRoutes from '@/shared/routes/app-routes';
import { getUnixTime } from 'date-fns';
import { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';

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
    toast.info('Пост отправлен!');
  } else {
    toast.error('Нужно войти в аккаунт.');
  }
  CloseModal();
}
