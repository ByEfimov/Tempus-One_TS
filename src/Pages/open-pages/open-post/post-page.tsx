import Styles from './Styles.module.scss';
import BlocksRender from './blocks-render';
import { getRequestObject } from 'Api/requests/get-requests';
import {
    Button,
    ButtonIcons,
    ButtonTypes,
    buttonIcons,
    defaultContainer,
    formItem,
} from 'Assets/Tempus-Ui';
import FakePost from 'Components/fake-data/fake-post';
import CommentsModal from 'Components/modals/comments-modal/comments-modal';
import RepostModal from 'Components/modals/repost-modal/repost-modal';
import { ErrorNotification } from 'Components/notifications/notifications';
import Activities from 'Components/show-posts/post-components/activities';
import AuthorDataRender from 'Components/show-posts/post-components/author-data-render';
import { WhoWrotePost } from 'Components/show-posts/posts/post-render';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { useAuth } from 'Hooks/useAuth';
import { setExecuteButton } from 'Store/slices/header/header-slice';
import { PostType } from 'Store/slices/wite-post/write-post-slice';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function PostPage() {
    const { id } = useParams();
    const { UserId } = useAuth();
    const [OpenPost, setOpenPost] = useState<PostType>();
    const [WhoWrotePost, setWhoWrotePost] = useState<WhoWrotePost | null>(null);
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
                            icon: '',
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

    if (OpenPost) {
        return (
            <motion.div
                initial="hidden"
                animate="visible"
                variants={defaultContainer}
                style={{ padding: 10, paddingTop: 20 }}
            >
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

                <motion.div variants={formItem} className={Styles.author}>
                    <AuthorDataRender
                        post={OpenPost}
                        WhoWrotePost={WhoWrotePost}
                    ></AuthorDataRender>
                </motion.div>

                <BlocksRender post={OpenPost}></BlocksRender>
                <motion.div variants={formItem} className={Styles.activities}>
                    <Activities
                        setCommentsOpen={setCommentsModalOpen}
                        setRepostModalOpen={setRepostsModalOpen}
                        post={OpenPost}
                    ></Activities>
                </motion.div>
            </motion.div>
        );
    } else {
        return <FakePost></FakePost>;
    }
}
