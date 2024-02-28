import Styles from '../styles.module.scss';
import { PostIcons, formItem, postIcons } from '@/app/assets/Tempus-Ui';
import { useAuth } from '@/app/hooks/useAuth';
import { PostType } from '@/app/slices/witePost/writePostSlice';
import { LikePost } from '@/features/LikePost';
import { motion } from 'framer-motion';
import { FC, useState } from 'react';

interface ActivitiesProps {
  post: PostType;
  setCommentsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRepostModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Activities: FC<ActivitiesProps> = ({ post, setCommentsOpen, setRepostModalOpen }) => {
  const { UserId } = useAuth();
  const [PostLikes, setPostLikes] = useState(post.likes ? Object.values(post.likes).length : 0);
  const [ItPostLiked, setItPostLiked] = useState(post.likes ? Object.values(post.likes).includes(UserId) : false);

  const PostComments = Object.keys(post.comments || []).length;

  const LikePostConfig = {
    ItPostLiked,
    setPostLikes,
    setItPostLiked,
    UserId,
    post,
    PostLikes,
  };

  return (
    <motion.div variants={formItem} className={Styles.PostActivity}>
      <div className={Styles.Buttons}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            LikePost(LikePostConfig);
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
