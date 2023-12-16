/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react';
import { Post } from 'Types/TypesOfData/Post/Post';
import { ModsOfWritePost } from 'Utils/ModsOfComps';
import { getUserFromId } from 'Api/Users/getUserDataFromId';
import { useNavigate } from 'react-router-dom';
import UserIcon from 'Assets/Icons/Header/user.svg';
import PlusIcon from 'Assets/Icons/Post/plus-circle.svg';
import HeartIcon from 'Assets/Icons/Post/heart.svg';
import CommentIcon from 'Assets/Icons/Post/comment.svg';
import ShareIcon from 'Assets/Icons/Post/share.svg';
import EyeIcon from 'Assets/Icons/Post/eye.svg';
import Styles from './Styles.module.scss';
import BlocksRender from './BlocksRender';
import FakePost from 'Components/FakeData/FakePost';
import { getTeamFromId } from 'Api/Teams/getTeamDataFromId';

interface PostRender {
    post: Post;
}

interface WhoWrotePost {
    name?: string;
    title?: string;
    photo?: string;
    image?: string;
}

const PostRender: FC<PostRender> = ({ post }) => {
    const [WhoWrotePost, setWhoWrotePost] = useState<WhoWrotePost | null>(null);
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
            <div
                onClick={() => {
                    navigate('/Post/' + post.PostId);
                }}
                className={Styles.Post}
            >
                <div className={Styles.AuthorData}>
                    <div className={Styles.Data}>
                        <div className={Styles.Photo}>
                            <img
                                src={
                                    WhoWrotePost?.image ||
                                    WhoWrotePost?.photo ||
                                    UserIcon
                                }
                                alt=""
                            />
                        </div>
                        <div className={Styles.Text}>
                            <div className={Styles.Name}>
                                {WhoWrotePost?.name || WhoWrotePost?.title}
                            </div>
                            <div className={Styles.Date}>{post.PostDate}</div>
                        </div>
                    </div>
                    <button className={Styles.ActiveButton}>
                        <img src={PlusIcon} alt="" />
                    </button>
                </div>
                <div className={Styles.PostData}>
                    <div className={Styles.Title}>{post.PostTitle}</div>
                    {!post.PostDataBlocks[1] && (
                        <div className={Styles.Text}>
                            {post.PostDataBlocks[0].text}
                        </div>
                    )}
                </div>
                {post.PostDataBlocks[1] && (
                    <div className={Styles.BlocksData}>
                        <BlocksRender
                            Blocks={post.PostDataBlocks}
                        ></BlocksRender>
                    </div>
                )}
                <div className={Styles.PostActivity}>
                    <div className={Styles.Buttons}>
                        <button>
                            <img src={HeartIcon} alt="" />
                            <h1>{post.PostLikes}</h1>
                        </button>
                        <button>
                            <img src={CommentIcon} alt="" />
                            <h1>{post.PostComments?.length || 0}</h1>
                        </button>
                        <button>
                            <img src={ShareIcon} alt="" />
                            <h1>{post.PostReposts}</h1>
                        </button>
                    </div>
                    <button className={Styles.Shows}>
                        <img src={EyeIcon} alt="" />
                        <h1> {post.PostShows}</h1>
                    </button>
                </div>
            </div>
        );
    } else if (!PostLoadIsDone) {
        return <FakePost></FakePost>;
    }
};

export default PostRender;
