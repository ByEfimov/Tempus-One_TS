import Styles from '../Modal.module.scss';
import { CloseModal, IsModal } from '../isModal';
import { addNewCountOfReposts } from 'Api/Posts/Activities/addNewCountOfRepost';
import { addNewPost } from 'Api/Posts/addNewPost';
import ShowLogo from 'Components/MiniComponents/ShowLogo';
import {
    ErrorNotification,
    MassageNotification,
} from 'Components/Notifications/Notifications';
import { useAuth } from 'Hooks/useAuth';
import { NewPostType } from 'Types/TypesOfData/Post/NewPostType';
import { Post } from 'Types/TypesOfData/Post/Post';
import { countEmptyValues } from 'Utils/countEmptyValues';
import { getUnixTime } from 'date-fns';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface RepostModal {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    post: Post;
}

const RepostModal: FC<RepostModal> = ({ setModalOpen, post }) => {
    const { UserPhoto, UserId } = useAuth();
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
