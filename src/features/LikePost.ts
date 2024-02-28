import { postRequestWithoutNewId } from './api/requests/post-requests-with-new-id';
import { removeRequest } from './api/requests/remove-request';
import { PostType } from '@/app/slices/witePost/writePostSlice';
import { toast } from 'react-toastify';

export const LikePost = ({
  ItPostLiked,
  setPostLikes,
  setItPostLiked,
  UserId,
  post,
  PostLikes,
}: {
  ItPostLiked: boolean;
  setPostLikes: React.Dispatch<React.SetStateAction<number>>;
  setItPostLiked: React.Dispatch<React.SetStateAction<boolean>>;
  UserId: string;
  post: PostType;
  PostLikes: number;
}) => {
  if (UserId) {
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
    toast.error('Нужно войти в аккаунт.');
  }
};
