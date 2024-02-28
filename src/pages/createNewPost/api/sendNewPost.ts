import { AppDispatch } from '@/app/appStore';
import { AddUserXp } from '@/app/providers/levelProvider';
import { removePost } from '@/app/slices/wite-post/write-post-slice';
import { postRequestWithNewId } from '@/features/api/requests/post-requests-with-new-id';
import AppRoutes from '@/shared/routes/app-routes';
import { NavigateFunction } from 'react-router-dom';

export function sendNewPost(NewPost: unknown, dispatch: AppDispatch, navigate: NavigateFunction) {
  AddUserXp(40);
  postRequestWithNewId('posts/', NewPost);
  dispatch(removePost());
  navigate(AppRoutes.DEFAULT);
}
