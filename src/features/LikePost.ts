import { postRequestWithoutNewId } from '@/app/api/requests/post-requests-with-new-id';
import { removeRequest } from '@/app/api/requests/remove-request';
import { PostType } from '@/app/slices/wite-post/write-post-slice';
import { ErrorNotification } from '@/features/notifications/notifications';

export const LikePost = ({
  UserCanChanging,
  ItPostLiked,
  setPostLikes,
  setItPostLiked,
  UserId,
  post,
  PostLikes,
}: {
  UserCanChanging: boolean;
  ItPostLiked: boolean;
  setPostLikes: React.Dispatch<React.SetStateAction<number>>;
  setItPostLiked: React.Dispatch<React.SetStateAction<boolean>>;
  UserId: string;
  post: PostType;
  PostLikes: number;
}) => {
  if (UserCanChanging) {
    if (ItPostLiked) {
      setPostLikes(PostLikes - 1);
      removeRequest('posts/' + post.id + '/likes/', UserId);
      setItPostLiked(false);
    } else {
      postRequestWithoutNewId('posts/' + post.id + '/likes/' + UserId, UserId);
      setPostLikes(PostLikes + 1);
      setItPostLiked(true);
    }
  } else {
    ErrorNotification('Нужно войти в аккаунт.');
  }
};
