import { changeRequest } from '@/Api/requests/change-request';
import { postRequestWithNewId } from '@/Api/requests/post-requests-with-new-id';
import { removePost } from '@/Store/slices/wite-post/write-post-slice';
import AppRoutes from '@/Utils/routes/app-routes';
import { AppDispatch } from '@/app/appStore';
import { NavigateFunction } from 'react-router-dom';

export function sendNewPost(
    UserId: string,
    UserExperience: number,
    NewPost: unknown,
    dispatch: AppDispatch,
    navigate: NavigateFunction,
) {
    changeRequest('users/' + UserId, '/experience', UserExperience + 40);
    postRequestWithNewId('posts/', NewPost);
    dispatch(removePost());
    navigate(AppRoutes.DEFAULT);
}
