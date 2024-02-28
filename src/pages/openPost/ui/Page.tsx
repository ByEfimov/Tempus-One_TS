import BlocksRender from './blocksRender';
import { PostModals } from './modals';
import Styles from './styles.module.scss';
import {
  Button,
  ButtonIcons,
  ButtonTypes,
  Preloader,
  buttonIcons,
  defaultContainer,
  formItem,
} from '@/app/assets/Tempus-Ui';
import { useAppDispatch } from '@/app/hooks/redux-hooks';
import { useAuth } from '@/app/hooks/useAuth';
import { setExecuteButton } from '@/app/slices/header/headerSlice';
import { PostType } from '@/app/slices/witePost/writePostSlice';
import Activities from '@/entities/post/components/activities';
import AuthorDataRender from '@/entities/post/components/authorDataRender';
import { WhoWrotePost } from '@/entities/post/postRender';
import { getRequestObject } from '@/features/api/requests/get-requests';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export function PostPage() {
  const { id } = useParams();
  const { UserId } = useAuth();
  const [openPost, setOpenPost] = useState<PostType>();
  const [whoWrotePost, setWhoWrotePost] = useState<WhoWrotePost>();
  const [commentsModalOpen, setCommentsModalOpen] = useState(false);
  const [repostsModalOpen, setRepostsModalOpen] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    function LoadUser(OpenPost: PostType) {
      getRequestObject('users/' + OpenPost.author)
        .then((user) => setWhoWrotePost(user))
        .catch(() => getRequestObject('teams/' + OpenPost.author).then((team) => setWhoWrotePost(team)));
    }

    getRequestObject('posts/' + id)
      .then((OpenPost) => {
        setOpenPost(OpenPost);
        LoadUser(OpenPost);
        dispatch(
          setExecuteButton({
            button: {
              component: OpenPost?.author === UserId && (
                <Button Type={ButtonTypes.icon} Click={() => {}}>
                  <ButtonIcons Icon={buttonIcons.Settings} />
                </Button>
              ),
            },
          }),
        );
      })
      .catch(() => toast.error('Пост не найден.'));
  }, []);

  if (openPost) {
    return (
      <motion.div {...defaultContainer} style={{ padding: '20px 10px' }}>
        <PostModals
          commentsModalOpen={commentsModalOpen}
          setCommentsModalOpen={setCommentsModalOpen}
          repostsModalOpen={repostsModalOpen}
          setRepostsModalOpen={setRepostsModalOpen}
          OpenPost={openPost}
        />
        <motion.div variants={formItem} className={Styles.author}>
          <AuthorDataRender post={openPost} WhoWrotePost={whoWrotePost} />
        </motion.div>
        <BlocksRender post={openPost} />
        <motion.div variants={formItem} className={Styles.activities}>
          <Activities setCommentsOpen={setCommentsModalOpen} setRepostModalOpen={setRepostsModalOpen} post={openPost} />
        </motion.div>
      </motion.div>
    );
  } else {
    return <Preloader></Preloader>;
  }
}
