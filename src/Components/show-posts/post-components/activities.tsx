import Styles from '../posts/Styles.module.scss';
import { postRequestWithoutNewId } from 'Api/requests/post-requests-with-new-id';
import { removeRequest } from 'Api/requests/remove-request';
import { PostIcons, formItem, postIcons } from 'Assets/Tempus-Ui';
import { ErrorNotification } from 'Components/notifications/notifications';
import { useAuth } from 'Hooks/useAuth';
import { PostType } from 'Store/slices/wite-post/write-post-slice';
import { motion } from 'framer-motion';
import { FC, useState } from 'react';

interface ActivitiesProps {
    post: PostType;
    setCommentsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setRepostModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Activities: FC<ActivitiesProps> = ({
    post,
    setCommentsOpen,
    setRepostModalOpen,
}) => {
    const { UserId, UserCanChanging } = useAuth();
    const [PostLikes, setPostLikes] = useState(
        post.likes ? Object.values(post.likes).length : 0,
    );
    const [ItPostLiked, setItPostLiked] = useState(
        post.likes ? Object.values(post.likes).includes(UserId) : false,
    );

    const PostComments = Object.keys(post.comments || []).length;

    const LikePost = () => {
        if (UserCanChanging) {
            if (ItPostLiked) {
                setPostLikes(PostLikes - 1);
                removeRequest('posts/' + post.id + '/likes/', UserId);
                setItPostLiked(false);
            } else {
                postRequestWithoutNewId(
                    'posts/' + post.id + '/likes/' + UserId,
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
        <motion.div variants={formItem} className={Styles.PostActivity}>
            <div className={Styles.Buttons}>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        LikePost();
                    }}
                    className={(ItPostLiked && Styles.LikeHeart) || undefined}
                >
                    <PostIcons Icon={postIcons.like}></PostIcons>
                    <h1>{PostLikes}</h1>
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setCommentsOpen(true);
                    }}
                >
                    <PostIcons Icon={postIcons.comment}></PostIcons>
                    <h1>{PostComments}</h1>
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setRepostModalOpen(true);
                    }}
                >
                    <PostIcons Icon={postIcons.repost}></PostIcons>
                    <h1>{post.reposts || 0}</h1>
                </button>
            </div>
            <button className={Styles.Shows}>
                <PostIcons Icon={postIcons.eye}></PostIcons>
                <h1> {Object.keys(post.views || '').length}</h1>
            </button>
        </motion.div>
    );
};
export default Activities;
