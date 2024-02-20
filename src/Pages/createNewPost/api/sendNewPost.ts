import { postRequestWithNewId } from '@/Api/requests/post-requests-with-new-id';
import { removePost } from '@/Store/slices/wite-post/write-post-slice';
import AppRoutes from '@/Utils/routes/app-routes';
import { AppDispatch } from '@/app/appStore';
import { AddUserXp } from '@/app/providers/levelProvider';
import { NavigateFunction } from 'react-router-dom';

export function sendNewPost(
    NewPost: unknown,
    dispatch: AppDispatch,
    navigate: NavigateFunction,
) {
    AddUserXp(40);
    postRequestWithNewId('posts/', NewPost);
    dispatch(removePost());
    navigate(AppRoutes.DEFAULT);
}
