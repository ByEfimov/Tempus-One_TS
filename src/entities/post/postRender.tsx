import Activities from './components/activities';
import AuthorDataRender from './components/authorDataRender';
import BlocksRender from './components/blocksRender';
import LinkToOrig from './components/link-to-orig';
import PostTextRender from './components/postTextRender';
import PostModals from './modals';
import Styles from './styles.module.scss';
import { defaultItem } from '@/app/assets/Tempus-Ui';
import { useAuth } from '@/app/hooks/useAuth';
import { PostType, blockTypes } from '@/app/slices/witePost/writePostSlice';
import { getRequestObject } from '@/features/api/requests/get-requests';
import { postRequestWithoutNewId } from '@/features/api/requests/post-requests-with-new-id';
import AppRoutes from '@/shared/routes/app-routes';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

export interface WhoWrotePost {
  name?: string;
  title?: string;
  photo?: string;
  image?: string;
  id?: string;
  members: { UserId: string; UserRole: string }[];
}

const PostRender = ({ post }: { post: PostType }) => {
  const [whoWrotePost, setWhoWrotePost] = useState<WhoWrotePost>();
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [repostModalOpen, setRepostOpen] = useState(false);
  const haveBlockNoText = post.blocks.find((block) => block?.type !== blockTypes.Text);
  const user = useAuth();
  const navigate = useNavigate();
  const { ref, inView } = useInView();

  useEffect(() => {
    function LoadUser() {
      getRequestObject('users/' + post.author)
        .then((user) => setWhoWrotePost(user))
        .catch(() => getRequestObject('teams/' + post.author).then((team) => setWhoWrotePost(team)));
    }
    LoadUser();
  }, []);

  useEffect(() => {
    function ViewingPost() {
      if (!Object.values(post.views || 0).includes(user.id) && user.isAuth && inView) {
        postRequestWithoutNewId('posts/' + post.id + '/views/' + user.id, user.id);
      }
    }
    ViewingPost();
  }, [inView]);

  const navigateToPost = () => {
    navigate(AppRoutes.POST + '/' + post.id);
  };

  return (
    <>
      <PostModals
        post={post}
        setCommentsOpen={setCommentsOpen}
        setRepostModalOpen={setRepostOpen}
        CommentsOpen={commentsOpen}
        RepostModalOpen={repostModalOpen}
      ></PostModals>
      <motion.div ref={ref} onClick={navigateToPost} variants={defaultItem} className={Styles.Post}>
        <AuthorDataRender post={post} WhoWrotePost={whoWrotePost} />

        <motion.div className={haveBlockNoText ? Styles.main : undefined}>
          <PostTextRender post={post} />
          <BlocksRender Blocks={post.blocks} inView={inView} postId={post.id} />
        </motion.div>

        <LinkToOrig post={post} />
        <Activities setCommentsOpen={setCommentsOpen} setRepostModalOpen={setRepostOpen} post={post} />
      </motion.div>
    </>
  );
};

export default PostRender;
