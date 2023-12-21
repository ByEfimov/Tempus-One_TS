import { Post } from 'Types/TypesOfData/Post/Post';
import Styles from '../Posts/Styles.module.scss';
import HeartIcon from 'Assets/Icons/Post/heart.svg';
import FillHeartIcon from 'Assets/Icons/Post/fiil/heart.svg';
import CommentIcon from 'Assets/Icons/Post/comment.svg';
import ShareIcon from 'Assets/Icons/Post/share.svg';
import EyeIcon from 'Assets/Icons/Post/eye.svg';
import { FC, useState } from 'react';
import { useAuth } from 'Hooks/useAuth';
import { SendLikePost } from 'Api/Posts/Activities/SendLikePost';
import { ErrorNotification } from 'Components/Notifications/Notifications';
import { RemoveLikePost } from 'Api/Posts/Activities/RemoveLikePost';

interface ActivitiesProps {
    post: Post;
}

const Activities: FC<ActivitiesProps> = ({ post }) => {
    const { UserId, UserPostsLiked, UserCanChanging } = useAuth();
    const [PostLikes, setPostLikes] = useState(post.PostLikes);
    const ItPostLiked = Object.keys(UserPostsLiked || [])?.includes(
        post.PostId
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
                <button>
                    <img src={CommentIcon} alt="" />
                    <h1>{post.PostComments?.length || 0}</h1>
                </button>
                <button>
                    <img src={ShareIcon} alt="" />
                    <h1>{post.PostReposts}</h1>
                </button>
            </div>
            <button className={Styles.Shows}>
                <img src={EyeIcon} alt="" />
                <h1> {post.PostShows}</h1>
            </button>
        </div>
    );
};
export default Activities;
