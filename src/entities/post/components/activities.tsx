import Styles from '../styles.module.scss';
import { PostIcons, formItem, postIcons } from '@/app/assets/Tempus-Ui';
import { useAuth } from '@/app/hooks/useAuth';
import { PostType } from '@/app/slices/witePost/writePostSlice';
import { LikePost } from '@/features/api/Users/posts/LikePost';
import { NOTIFI_TEXTS } from '@/shared/notifyTexts/notifyTexts';
import { motion } from 'framer-motion';
import { FC, useState } from 'react';
import { toast } from 'react-toastify';

interface ActivitiesProps {
  post: PostType;
  setCommentsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRepostModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Activities: FC<ActivitiesProps> = ({ post, setCommentsOpen, setRepostModalOpen }) => {
  const user = useAuth();
  const [postLikes, setPostLikes] = useState(post.likes ? Object.values(post.likes).length : 0);
  const [itPostLiked, setItPostLiked] = useState(post.likes ? Object.values(post.likes).includes(user.id) : false);
  const postComments = post.comments ? Object.keys(post.comments).length : 0;

  const likePostHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    LikePost({
      itPostLiked,
      setPostLikes,
      setItPostLiked: setItPostLiked,
      UserId: user.id,
      post: post,
      PostLikes: postLikes,
    });
  };

  return (
    <motion.div variants={formItem} className={Styles.PostActivity}>
      <div className={Styles.Buttons}>
        <button onClick={likePostHandler} className={itPostLiked ? Styles.LikeHeart : undefined}>
          <PostIcons Icon={postIcons.like}></PostIcons>
          <h1>{postLikes}</h1>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCommentsOpen(true);
          }}
        >
          <PostIcons Icon={postIcons.comment}></PostIcons>
          <h1>{postComments}</h1>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (user.canChanging) {
              setRepostModalOpen(true);
            } else if (!user.isAuth) {
              toast.error(NOTIFI_TEXTS.ERROR_NOT_AUTH);
            } else if (!user.canChanging) {
              toast.warning(NOTIFI_TEXTS.ERROR_NOT_VERIFIED_EMAIL);
            }
          }}
        >
          <PostIcons Icon={postIcons.repost}></PostIcons>
          <h1>{post.reposts || 0}</h1>
        </button>
      </div>
      <button className={Styles.Shows}>
        <PostIcons Icon={postIcons.eye}></PostIcons>
        <h1>{Object.keys(post.views || {}).length}</h1>
      </button>
    </motion.div>
  );
};
export default Activities;
