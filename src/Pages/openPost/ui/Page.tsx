import BlocksRender from './blocks-render';
import Styles from './styles.module.scss';
import { getRequestObject } from '@/Api/requests/get-requests';
import {
    Button,
    ButtonIcons,
    ButtonTypes,
    Preloader,
    buttonIcons,
    defaultContainer,
    formItem,
} from '@/Assets/Tempus-Ui';
import CommentsModal from '@/Components/modals/comments-modal/comments-modal';
import RepostModal from '@/Components/modals/repost-modal/repost-modal';
import { ErrorNotification } from '@/Components/notifications/notifications';
import Activities from '@/Components/show-posts/post-components/activities';
import AuthorDataRender from '@/Components/show-posts/post-components/author-data-render';
import { WhoWrotePost } from '@/Components/show-posts/posts/post-render';
import { useAppDispatch } from '@/Hooks/redux-hooks';
import { useAuth } from '@/Hooks/useAuth';
import { setExecuteButton } from '@/Store/slices/header/header-slice';
import { PostType } from '@/Store/slices/wite-post/write-post-slice';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
                .catch(() =>
                    getRequestObject('teams/' + OpenPost.author).then((team) =>
                        setWhoWrotePost(team),
                    ),
                );
        }

        getRequestObject('posts/' + id)
            .then((OpenPost) => {
                setOpenPost(OpenPost);
                LoadUser(OpenPost);
                dispatch(
                    setExecuteButton({
                        button: {
                            component: OpenPost?.author === UserId && (
                                <Button
                                    Type={ButtonTypes.icon}
                                    Click={() => {}}
                                >
                                    <ButtonIcons Icon={buttonIcons.Settings} />
                                </Button>
                            ),
                        },
                    }),
                );
            })
            .catch(() => ErrorNotification('Пост не найден.'));
    }, []);

    if (openPost) {
        return (
            <motion.div {...defaultContainer}>
                <PostModals
                    commentsModalOpen={commentsModalOpen}
                    setCommentsModalOpen={setCommentsModalOpen}
                    repostsModalOpen={repostsModalOpen}
                    setRepostsModalOpen={setRepostsModalOpen}
                    OpenPost={openPost}
                ></PostModals>
                <motion.div variants={formItem} className={Styles.author}>
                    <AuthorDataRender
                        post={openPost}
                        WhoWrotePost={whoWrotePost}
                    ></AuthorDataRender>
                </motion.div>
                <BlocksRender post={openPost}></BlocksRender>
                <motion.div variants={formItem} className={Styles.activities}>
                    <Activities
                        setCommentsOpen={setCommentsModalOpen}
                        setRepostModalOpen={setRepostsModalOpen}
                        post={openPost}
                    ></Activities>
                </motion.div>
            </motion.div>
        );
    } else {
        return <Preloader></Preloader>;
    }
}

interface modalInterface {
    setRepostsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    OpenPost: PostType;
    setCommentsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    commentsModalOpen: boolean;
    repostsModalOpen: boolean;
}

function PostModals({
    commentsModalOpen,
    OpenPost,
    setCommentsModalOpen,
    repostsModalOpen,
    setRepostsModalOpen,
}: modalInterface) {
    return (
        <>
            {commentsModalOpen && (
                <CommentsModal
                    PostId={OpenPost.id}
                    setModalOpen={setCommentsModalOpen}
                ></CommentsModal>
            )}
            {repostsModalOpen && (
                <RepostModal
                    post={OpenPost}
                    setModalOpen={setRepostsModalOpen}
                ></RepostModal>
            )}
        </>
    );
}
