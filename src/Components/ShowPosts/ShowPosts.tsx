import React, { FC, LegacyRef, useState } from 'react';
import { usePosts } from '../../Hooks/usePosts';
import { Post } from '../../Store/slices/PostsSlice';
import Styles from './Styles.module.scss';
import { UsersList } from '../../Api/Users';
import FeatherIcon from 'feather-icons-react';
import { ModsOfWritePost } from '../../Utils/ModsOfComps';
import { LiveProvider, LivePreview } from 'react-live';

interface PostProps {
    post: Post;
}

const PostRender: FC<PostProps> = ({ post }) => {
    const UserData = UsersList.find((user) => (user.id = post.PostAuthorId));
    const DescRef: LegacyRef<HTMLDivElement> = React.createRef();
    const [selectBlock, setSelectBlock] = useState(1);
    const CountPostBlock = post.PostDataBlocks.length - 1;

    const swapLeft = () => {
        selectBlock != 1 && setSelectBlock(selectBlock - 1);
    };
    const swapRight = () => {
        selectBlock != CountPostBlock && setSelectBlock(selectBlock + 1);
    };

    return (
        <div className={Styles.Post}>
            <div className={Styles.TopBlock}>
                <div className={Styles.user}>
                    <div className={Styles.logo}>
                        <img src={UserData?.photo} alt="" />
                    </div>
                    <div className={Styles.info}>
                        <h1>{UserData?.name}</h1>
                        <h2>{post.PostDate}</h2>
                    </div>
                </div>
                <div className={Styles.action}>
                    <FeatherIcon icon="user-check" />
                </div>
            </div>
            <div className={Styles.TextPost}>
                <div className={Styles.title}>
                    {post.PostTitle}

                    <button
                        onClick={() =>
                            DescRef.current?.classList.toggle(Styles.descOpen)
                        }
                    >
                        <FeatherIcon icon="eye" />
                    </button>
                </div>
                <div className={Styles.desc} ref={DescRef}>
                    <div style={{ minHeight: 0 }}>
                        {post.PostDataBlocks[0].text}
                    </div>
                </div>
            </div>
            <div className={Styles.Blocks}>
                <div className={Styles.title}>
                    {post.PostDataBlocks[selectBlock].title}
                    <div className={Styles.arrows}>
                        <button onClick={swapLeft}>
                            <FeatherIcon icon="chevron-left" />
                        </button>
                        {selectBlock} / {CountPostBlock}
                        <button onClick={swapRight}>
                            <FeatherIcon icon="chevron-right" />
                        </button>
                    </div>
                </div>
                <div className={Styles.ShowBlock}>
                    {post.PostDataBlocks[selectBlock].type ==
                        ModsOfWritePost.kod && (
                        <div className={Styles.code}>
                            <LiveProvider
                                code={post.PostDataBlocks[selectBlock].text}
                            >
                                <LivePreview />
                            </LiveProvider>
                        </div>
                    )}
                    {post.PostDataBlocks[selectBlock].type ==
                        ModsOfWritePost.image && (
                        <div className={Styles.image}>
                            <img
                                src={post.PostDataBlocks[selectBlock].text}
                                alt=""
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className={Styles.actions}>
                <div className={Styles.buttons}>
                    <div className={Styles.Likes}>
                        <FeatherIcon icon="heart" /> 0
                    </div>
                    <div className={Styles.Comments}>
                        <FeatherIcon icon="message-circle" /> 0
                    </div>
                    <div className={Styles.Views}>
                        <FeatherIcon icon="eye" /> 1
                    </div>
                </div>
                <div className={Styles.more}>
                    <FeatherIcon icon="more-horizontal" />
                </div>
            </div>
        </div>
    );
};

const ShowPosts = () => {
    const { Posts } = usePosts();
    return Posts.map((post) => (
        <PostRender key={post.PostId} post={post}></PostRender>
    ));
};

export default ShowPosts;
