/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react';
import { Post } from 'Types/TypesOfData/Post/Post';
import { ModsOfWritePost } from 'Utils/ModsOfComps';
import { getUserFromId } from 'Api/Users/getUserDataFromId';
import { useNavigate } from 'react-router-dom';
import Styles from './Styles.module.scss';
import BlocksRender from '../PostComponents/BlocksRender';
import FakePost from 'Components/FakeData/FakePost';
import { getTeamFromId } from 'Api/Teams/getTeamDataFromId';
import Activities from '../PostComponents/Activities';
import AuthorDataRender from '../PostComponents/AuthorDataRender';
import PostDataRender from '../PostComponents/PostDataRender';
import CommentsModal from 'Components/Modals/CommentsModal/CommentsModal';

interface PostRender {
    post: Post;
}

export interface WhoWrotePost {
    name?: string;
    title?: string;
    photo?: string;
    image?: string;
    id?: string;
}

const PostRender: FC<PostRender> = ({ post }) => {
    const [WhoWrotePost, setWhoWrotePost] = useState<WhoWrotePost | null>(null);
    const [CommentsOpen, setCommentsOpen] = useState(false);
    const navigate = useNavigate();

    const [ImageIsLoad, setImageIsLoad] = useState(false);

    const PostLoadIsDone = post.PostDataBlocks.some(
        (block) => block.type === ModsOfWritePost.image
    )
        ? !!WhoWrotePost && !!ImageIsLoad
        : !!WhoWrotePost;

    useEffect(() => {
        function LoadUser() {
            getUserFromId(post.PostAuthorId)
                .then((user) => setWhoWrotePost(user))
                .catch(() =>
                    getTeamFromId(post.PostAuthorId).then((team) =>
                        setWhoWrotePost(team)
                    )
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
    }, []);

    if (PostLoadIsDone) {
        return (
            <>
                {CommentsOpen && (
                    <CommentsModal
                        PostId={post.PostId}
                        setModalOpen={setCommentsOpen}
                    ></CommentsModal>
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
                            ></BlocksRender>
                        </div>
                    )}
                    <Activities setCommentsOpen={setCommentsOpen} post={post} />
                </div>
            </>
        );
    } else if (!PostLoadIsDone) {
        return <FakePost></FakePost>;
    }
};

export default PostRender;
