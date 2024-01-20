import { CloseModal, IsModal } from '../is-modal';
import Styles from '../style.module.scss';
import { addNewCountOfReposts } from 'Api/Posts/Activities/add-new-count-of-repost';
import { addNewPost } from 'Api/Posts/add-new-post';
import ShowLogo from 'Components/mini-components/show-logo';
import {
    ErrorNotification,
    MassageNotification,
} from 'Components/notifications/notifications';
import { useAuth } from 'Hooks/useAuth';
import { NewPostType } from 'Types/TypesOfData/Post/NewPostType';
import { Post } from 'Types/TypesOfData/Post/Post';
import { countEmptyValues } from 'Utils/validate-data/count-empty-values';
import { getUnixTime } from 'date-fns';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface RepostModal {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    post: Post;
}

const RepostModal: FC<RepostModal> = ({ setModalOpen, post }) => {
    const { UserPhoto, UserId, UserIsAuth } = useAuth();
    const navigate = useNavigate();

    function repostToYou() {
        const currentDate = new Date();
        const currentUnixTime = getUnixTime(currentDate);

        const NewPost: NewPostType = {
            ...post,
            PostAuthorId: UserId,
            PostId: null,
            PostDate: currentUnixTime,
            PostLikes: 0,
            PostShows: 1,
            PostComments: {},
            PostReposts: 0,
            PostWithRepostUs: post.PostId,
        };

        if (countEmptyValues(NewPost) - 5 >= 0 && UserIsAuth) {
            addNewPost(NewPost);
            addNewCountOfReposts(post.PostReposts + 1, post.PostId);
            navigate('/User/' + UserId);
            MassageNotification('Пост отправлен!');
        } else {
            if (!UserIsAuth) {
                ErrorNotification('Нужно войти в аккаунт.');
            }
            ErrorNotification('Ошибка при отправке поста.');
        }
        CloseModal();
    }

    return (
        <IsModal title="Куда отправить?" setModalOpen={setModalOpen}>
            <button onClick={repostToYou} className={Styles.RepostToYou}>
                <ShowLogo ImageUrl={UserPhoto}></ShowLogo>
                Себе
            </button>
        </IsModal>
    );
};

export default RepostModal;
