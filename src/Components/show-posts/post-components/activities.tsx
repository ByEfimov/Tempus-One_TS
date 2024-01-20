import Styles from '../Posts/Styles.module.scss';
import { RemoveLikePost } from 'Api/Posts/Activities/remove-like-post';
import { SendLikePost } from 'Api/Posts/Activities/send-like-post';
import CommentIcon from 'Assets/Icons/Post/comment.svg';
import EyeIcon from 'Assets/Icons/Post/eye.svg';
import FillHeartIcon from 'Assets/Icons/Post/fiil/heart.svg';
import HeartIcon from 'Assets/Icons/Post/heart.svg';
import ShareIcon from 'Assets/Icons/Post/share.svg';
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
    const { UserId, UserPostsLiked, UserCanChanging } = useAuth();
    const [PostLikes, setPostLikes] = useState(post.PostLikes);

    const PostComments = Object.keys(post.PostComments || []).length;

    const ItPostLiked = Object.keys(UserPostsLiked || [])?.includes(
        post.PostId,
    );

    const LikePost = () => {
        if (UserCanChanging) {
            if (ItPostLiked) {
                RemoveLikePost(post.PostId, UserId, PostLikes - 1);
                setPostLikes(PostLikes - 1);
            } else {
                SendLikePost(post.PostId, UserId, PostLikes + 1);
                setPostLikes(PostLikes + 1);
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
                    <img src={ItPostLiked ? FillHeartIcon : HeartIcon} alt="" />
                    <h1>{PostLikes}</h1>
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        document.body.style.overflowY = 'hidden';
                        setCommentsOpen(true);
                    }}
                >
                    <img src={CommentIcon} alt="" />
                    <h1>{PostComments}</h1>
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        document.body.style.overflowY = 'hidden';
                        setRepostModalOpen(true);
                    }}
                >
                    <img src={ShareIcon} alt="" />
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
                <img src={EyeIcon} alt="" />
                <h1> {Object.keys(post.PostShows).length}</h1>
            </button>
        </div>
    );
};
export default Activities;
