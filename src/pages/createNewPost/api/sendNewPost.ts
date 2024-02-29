import { AppDispatch } from '@/app/appStore';
import { AddUserXp } from '@/app/providers/levelProvider';
import { PostType, removePost } from '@/app/slices/witePost/writePostSlice';
import { postRequestWithNewId } from '@/features/api/requests/post-requests-with-new-id';
import AppRoutes from '@/shared/routes/app-routes';
import { countEmptyValues } from '@/shared/validate-data/countEmptyValues';
import { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';

export function sendNewPost(NewPost: PostType, dispatch: AppDispatch, navigate: NavigateFunction) {
  if (countEmptyValues(NewPost) === 0) {
    AddUserXp(40);
    postRequestWithNewId('posts/', NewPost);
    dispatch(removePost());
    navigate(AppRoutes.DEFAULT);
  } else {
    toast.error('Не все поля заполнены.');
  }
}
