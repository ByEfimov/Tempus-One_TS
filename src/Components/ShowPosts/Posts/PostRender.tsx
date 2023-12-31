/* eslint-disable react-hooks/exhaustive-deps */
import Activities from '../PostComponents/Activities';
import AuthorDataRender from '../PostComponents/AuthorDataRender';
import BlocksRender from '../PostComponents/BlocksRender';
import PostDataRender from '../PostComponents/PostDataRender';
import Styles from './Styles.module.scss';
import { viewPostForPost } from 'Api/Posts/Activities/viewPost';
import { getTeamFromId } from 'Api/Teams/getTeamDataFromId';
import { viewPostForUser } from 'Api/Users/Interaction/viewPost';
import { getUserFromId } from 'Api/Users/getData/getUserDataFromId';
import FakePost from 'Components/FakeData/FakePost';
import CommentsModal from 'Components/Modals/CommentsModal/CommentsModal';
import RepostModal from 'Components/Modals/RepostModal/RepostModal';
import ViewsModal from 'Components/Modals/ViewsModal/ViewsModal';
import { useAuth } from 'Hooks/useAuth';
import { Post } from 'Types/TypesOfData/Post/Post';
import { ModsOfWritePost } from 'Utils/ModsOfComps';
import { PostLoadIsDone } from 'Utils/Posts/PostLoadIsDone';
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
    const [ViewsModalOpen, setViewsModalOpen] = useState(false);
    const { UserViewings, UserId } = useAuth();
    const navigate = useNavigate();

    const [ImageIsLoad, setImageIsLoad] = useState(false);

    useEffect(() => {
        function LoadUser() {
            getUserFromId(post.PostAuthorId)
                .then((user) => setWhoWrotePost(user))
                .catch(() =>
                    getTeamFromId(post.PostAuthorId).then((team) =>
                        setWhoWrotePost(team),
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
            if (!UserViewings?.includes(post.PostId)) {
                viewPostForPost(post.PostId, UserId);
                viewPostForUser(post.PostId, UserId);
            }
        }
        ViewingPost();
    }, []);

    if (PostLoadIsDone(WhoWrotePost, ImageIsLoad, post)) {
        return (
            <>
                {CommentsOpen && (
                    <CommentsModal
                        PostId={post.PostId}
                        setModalOpen={setCommentsOpen}
                    ></CommentsModal>
                )}
                {RepostModalOpen && (
                    <RepostModal
                        post={post}
                        setModalOpen={setRepostModalOpen}
                    ></RepostModal>
                )}
                {ViewsModalOpen && (
                    <ViewsModal
                        post={post}
                        setModalOpen={setViewsModalOpen}
                    ></ViewsModal>
                )}

                <div
                    onClick={() => {
                        navigate('/Post/' + post.PostId);
                    }}
                    className={Styles.Post}
                >
                    <AuthorDataRender post={post} WhoWrotePost={WhoWrotePost} />
                    <PostDataRender post={post} />
                    {post.PostDataBlocks[1] && (
                        <div className={Styles.BlocksData}>
                            <BlocksRender
                                Blocks={post.PostDataBlocks}
                                postId={post.PostId}
                            ></BlocksRender>
                        </div>
                    )}
                    {post.PostWithRepostUs && (
                        <div
                            className={Styles.repost}
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate('/Post/' + post.PostWithRepostUs);
                                location.reload();
                            }}
                        >
                            Этот пост запосщен.
                        </div>
                    )}
                    <Activities
                        setCommentsOpen={setCommentsOpen}
                        setRepostModalOpen={setRepostModalOpen}
                        setViewsModalOpen={setViewsModalOpen}
                        post={post}
                    />
                </div>
            </>
        );
    } else if (!PostLoadIsDone) {
        return <FakePost></FakePost>;
    }
};

export default PostRender;
