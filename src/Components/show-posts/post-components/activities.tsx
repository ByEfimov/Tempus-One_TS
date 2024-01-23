import Styles from '../posts/Styles.module.scss';
import { postRequestWithoutNewId } from 'Api/requests/post-requests-with-new-id';
import { removeRequest } from 'Api/requests/remove-request';
import PostsIcons, {
    postsIcons,
} from 'Assets/Tempus-Ui/Icons/Posts/Posts-Icons';
import { ErrorNotification } from 'Components/notifications/notifications';
import { useAuth } from 'Hooks/useAuth';
import { Post } from 'Types/TypesOfData/post/post';
import { FC, useState } from 'react';

interface ActivitiesProps {
    post: Post;
    setCommentsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setRepostModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setViewsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Activities: FC<ActivitiesProps> = ({
    post,
    setCommentsOpen,
    setRepostModalOpen,
    setViewsModalOpen,
}) => {
    const { UserId, UserCanChanging } = useAuth();
    const [PostLikes, setPostLikes] = useState(
        post.PostLikes ? Object.values(post.PostLikes).length : 0,
    );
    const [ItPostLiked, setItPostLiked] = useState(
        post.PostLikes ? Object.values(post.PostLikes).includes(UserId) : false,
    );

    const PostComments = Object.keys(post.PostComments || []).length;

    const LikePost = () => {
        if (UserCanChanging) {
            if (ItPostLiked) {
                setPostLikes(PostLikes - 1);
                removeRequest('posts/' + post.id + '/PostLikes/', UserId);
                setItPostLiked(false);
            } else {
                postRequestWithoutNewId(
                    'posts/' + post.id + '/PostLikes/' + UserId,
                    UserId,
                );
                setPostLikes(PostLikes + 1);
                setItPostLiked(true);
            }
        } else {
            ErrorNotification('Нужно войти в аккаунт.');
        }
    };

    return (
        <div className={Styles.PostActivity}>
            <div className={Styles.Buttons}>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        LikePost();
                    }}
                    className={(ItPostLiked && Styles.LikeHeart) || undefined}
                >
                    <PostsIcons Icon={postsIcons.like}></PostsIcons>
                    <h1>{PostLikes}</h1>
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        document.body.style.overflowY = 'hidden';
                        setCommentsOpen(true);
                    }}
                >
                    <PostsIcons Icon={postsIcons.comment}></PostsIcons>
                    <h1>{PostComments}</h1>
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        document.body.style.overflowY = 'hidden';
                        setRepostModalOpen(true);
                    }}
                >
                    <PostsIcons Icon={postsIcons.repost}></PostsIcons>
                    <h1>{post.PostReposts}</h1>
                </button>
            </div>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    document.body.style.overflowY = 'hidden';
                    setViewsModalOpen(true);
                }}
                className={Styles.Shows}
            >
                <PostsIcons Icon={postsIcons.eye}></PostsIcons>
                <h1> {Object.keys(post.PostShows).length}</h1>
            </button>
        </div>
    );
};
export default Activities;
