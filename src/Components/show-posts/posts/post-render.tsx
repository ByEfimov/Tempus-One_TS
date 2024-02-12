import Activities from '../post-components/activities';
import AuthorDataRender from '../post-components/author-data-render';
import BlocksRender from '../post-components/blocks-render';
import PostDataRender from '../post-components/post-data-render';
import Styles from './Styles.module.scss';
import { getRequestObject } from 'Api/requests/get-requests';
import { postRequestWithoutNewId } from 'Api/requests/post-requests-with-new-id';
import { defaultItem } from 'Assets/Tempus-Ui';
import CommentsModal from 'Components/modals/comments-modal/comments-modal';
import RepostModal from 'Components/modals/repost-modal/repost-modal';
import { useAuth } from 'Hooks/useAuth';
import { PostType } from 'Store/slices/wite-post/write-post-slice';
import AppRoutes from 'Utils/routes/app-routes';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
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
    const [WhoWrotePost, setWhoWrotePost] = useState<WhoWrotePost | null>(null);
    const [CommentsOpen, setCommentsOpen] = useState(false);
    const [RepostModalOpen, setRepostModalOpen] = useState(false);
    const { UserId, UserIsAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        function LoadUser() {
            getRequestObject('users/' + post.author)
                .then((user) => setWhoWrotePost(user))
                .catch(() =>
                    getRequestObject('teams/' + post.author).then((team) =>
                        setWhoWrotePost(team),
                    ),
                );
        }
        LoadUser();

        function ViewingPost() {
            if (
                !Object.values(post.views || 0).includes(UserId) &&
                UserIsAuth
            ) {
                postRequestWithoutNewId(
                    'posts/' + post.id + '/views/' + UserId,
                    UserId,
                );
            }
        }
        ViewingPost();
    }, []);

    return (
        <>
            {CommentsOpen && (
                <CommentsModal
                    PostId={post.id}
                    setModalOpen={setCommentsOpen}
                ></CommentsModal>
            )}
            {RepostModalOpen && (
                <RepostModal
                    post={post}
                    setModalOpen={setRepostModalOpen}
                ></RepostModal>
            )}

            <motion.div
                onClick={() => {
                    navigate(AppRoutes.POST + '/' + post.id);
                }}
                variants={defaultItem}
                className={Styles.Post}
            >
                <AuthorDataRender post={post} WhoWrotePost={WhoWrotePost} />
                <PostDataRender post={post} />

                <BlocksRender
                    Blocks={post.blocks}
                    postId={post.id}
                ></BlocksRender>

                {post.PostWithRepostUs && (
                    <a
                        className={Styles.repost}
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(
                                AppRoutes.POST + '/' + post.PostWithRepostUs,
                            );
                        }}
                    >
                        Ссылка на оригинал.
                    </a>
                )}
                <Activities
                    setCommentsOpen={setCommentsOpen}
                    setRepostModalOpen={setRepostModalOpen}
                    post={post}
                />
            </motion.div>
        </>
    );
};

export default PostRender;
