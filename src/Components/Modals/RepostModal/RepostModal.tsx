import { FC } from 'react';
import { CloseModal, IsModal } from '../isModal';
import { Post } from 'Types/TypesOfData/Post/Post';
import Styles from '../Modal.module.scss';
import { useAuth } from 'Hooks/useAuth';
import { NewPostType } from 'Types/TypesOfData/Post/NewPostType';
import {
    ErrorNotification,
    MassageNotification,
} from 'Components/Notifications/Notifications';
import { addNewPost } from 'Api/Posts/addNewPost';
import { countEmptyValues } from 'Utils/countEmptyValues';
import { addNewCountOfReposts } from 'Api/Posts/Activities/addNewCountOfRepost';
import { useNavigate } from 'react-router-dom';
import ShowLogo from 'Components/MiniComponents/ShowLogo';

interface RepostModal {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    post: Post;
}

const RepostModal: FC<RepostModal> = ({ setModalOpen, post }) => {
    const { UserPhoto, UserId } = useAuth();
    const navigate = useNavigate();

    function repostToYou() {
        const ToDay = new Date().getTime();
        const NewPost: NewPostType = {
            ...post,
            PostAuthorId: UserId,
            PostId: null,
            PostDate: ToDay,
            PostLikes: 0,
            PostShows: 1,
            PostComments: {},
            PostReposts: 0,
            PostWithRepostUs: post.PostId,
        };

        if (countEmptyValues(NewPost) - 5 === 0) {
            addNewPost(NewPost);
            addNewCountOfReposts(post.PostReposts + 1, post.PostId);
            navigate('/User/' + UserId);
            MassageNotification('Пост отправлен!');
        } else {
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
