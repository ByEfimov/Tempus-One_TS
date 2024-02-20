import Activities from './components/activities';
import AuthorDataRender from './components/authorDataRender';
import BlocksRender from './components/blocksRender';
import LinkToOrig from './components/link-to-orig';
import PostTextRender from './components/postTextRender';
import PostModals from './modals';
import Styles from './styles.module.scss';
import { getRequestObject } from '@/Api/requests/get-requests';
import { postRequestWithoutNewId } from '@/Api/requests/post-requests-with-new-id';
import { defaultItem } from '@/Assets/Tempus-Ui';
import { useAuth } from '@/Hooks/useAuth';
import { PostType } from '@/Store/slices/wite-post/write-post-slice';
import AppRoutes from '@/Utils/routes/app-routes';
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
    const [whoWrotePost, setWhoWrotePost] = useState<WhoWrotePost>();
    const [commentsOpen, setCommentsOpen] = useState(false);
    const [repostModalOpen, setRepostOpen] = useState(false);
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
            <motion.div
                onClick={navigateToPost}
                variants={defaultItem}
                className={Styles.Post}
            >
                <AuthorDataRender post={post} WhoWrotePost={whoWrotePost} />
                <PostTextRender post={post} />
                <BlocksRender Blocks={post.blocks} postId={post.id} />
                <LinkToOrig post={post} />
                <Activities
                    setCommentsOpen={setCommentsOpen}
                    setRepostModalOpen={setRepostOpen}
                    post={post}
                />
            </motion.div>
        </>
    );
};

export default PostRender;