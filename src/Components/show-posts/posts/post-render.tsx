import Activities from '../post-components/activities';
import AuthorDataRender from '../post-components/author-data-render';
import BlocksRender from '../post-components/blocks-render';
import PostDataRender from '../post-components/post-data-render';
import Styles from './Styles.module.scss';
import { getRequestObject } from 'Api/requests/get-requests';
import { postRequestWithoutNewId } from 'Api/requests/post-requests-with-new-id';
import { defaultItem } from 'Assets/Tempus-Ui/Animation/Form-animate';
import FakePost from 'Components/fake-data/fake-post';
import CommentsModal from 'Components/modals/comments-modal/comments-modal';
import RepostModal from 'Components/modals/repost-modal/repost-modal';
import { useAuth } from 'Hooks/useAuth';
import { Post } from 'Types/TypesOfData/post/post';
import { ModsOfWritePost } from 'Utils/mods-of-comps';
import { PostLoadIsDone } from 'Utils/post-utils/post-load-is-done';
import AppRoutes from 'Utils/routes/app-routes';
import { motion } from 'framer-motion';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface PostRender {
    post: Post;
}

export interface WhoWrotePost {
    name?: string;
    title?: string;
    photo?: string;
    image?: string;
    id?: string;
    members: { UserId: string; UserRole: string }[];
}

const PostRender: FC<PostRender> = ({ post }) => {
    const [WhoWrotePost, setWhoWrotePost] = useState<WhoWrotePost | null>(null);
    const [CommentsOpen, setCommentsOpen] = useState(false);
    const [RepostModalOpen, setRepostModalOpen] = useState(false);
    const { UserId, UserIsAuth } = useAuth();
    const navigate = useNavigate();

    const [ImageIsLoad, setImageIsLoad] = useState(false);

    useEffect(() => {
        function LoadUser() {
            getRequestObject('users/' + post.PostAuthorId)
                .then((user) => setWhoWrotePost(user))
                .catch(() =>
                    getRequestObject('teams/' + post.PostAuthorId).then(
                        (team) => setWhoWrotePost(team),
                    ),
                );
        }
        LoadUser();

        function loadImages() {
            post.PostDataBlocks.map((block) => {
                const image = new Image();
                if (block.type === ModsOfWritePost.image) {
                    image.src = block.text;
                    image.onload = () => {
                        setImageIsLoad(true);
                    };
                }
            });
        }
        loadImages();

        function ViewingPost() {
            if (
                !Object.values(post.PostShows || 0).includes(UserId) &&
                UserIsAuth
            ) {
                postRequestWithoutNewId(
                    'posts/' + post.id + '/PostShows/' + UserId,
                    UserId,
                );
            }
        }
        ViewingPost();
    }, []);

    if (PostLoadIsDone(WhoWrotePost, ImageIsLoad, post)) {
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
                    {post.PostDataBlocks[1] && (
                        <div className={Styles.BlocksData}>
                            <BlocksRender
                                Blocks={post.PostDataBlocks}
                                postId={post.id}
                            ></BlocksRender>
                        </div>
                    )}
                    {post.PostWithRepostUs && (
                        <a
                            className={Styles.repost}
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(
                                    AppRoutes.POST +
                                        '/' +
                                        post.PostWithRepostUs,
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
    } else if (!PostLoadIsDone) {
        return <FakePost></FakePost>;
    }
};

export default PostRender;
