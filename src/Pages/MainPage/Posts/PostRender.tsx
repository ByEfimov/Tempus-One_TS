import { FC, useEffect, useState } from 'react';
import { Post } from '../../../Store/slices/PostsSlice';
import { ModsOfWritePost } from '../../../Utils/ModsOfComps';
import { getUserFromId } from '../../../Api/Users/getUserdataFromId';
import ShowCode from '../../../Components/ShowPosts/postsComp/ShowCode';
import { useNavigate } from 'react-router-dom';
import { getTeamFromId } from '../../../Api/Teams/getTeamdataFromId';

interface PostRender {
    post: Post;
}

interface WhoWrotePost {
    name?: string;
    title?: string;
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

        function loadImage(image: HTMLImageElement, url: string) {
            image.onload = function () {
                setImageIsLoad(true);
            };
            image.onerror = function () {
                setImageIsLoad(false);
                console.error('Картинка не была обработана.');
            };
            image.src = url;
        }
        post.PostDataBlocks.map((block) => {
            block.type === ModsOfWritePost.image &&
                loadImage(new Image(), block.text);
        });
    }, []);

    return PostLoadIsDone ? (
        <div onClick={() => navigate('Post/' + post.PostId)}>
            {WhoWrotePost?.name || WhoWrotePost?.title}
            {post.PostTitle}
            {post.PostDate}
            {post.PostDataBlocks.map((block) =>
                block.type === ModsOfWritePost.image ? (
                    <img key={block.id} src={block.text}></img>
                ) : (
                    block.type === ModsOfWritePost.kod && (
                        <ShowCode
                            key={block.id}
                            UserCode={block.text}
                        ></ShowCode>
                    )
                )
            )}
        </div>
    ) : (
        <div>load</div>
    );
};

export default PostRender;
