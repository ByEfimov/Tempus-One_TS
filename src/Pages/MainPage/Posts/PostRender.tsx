import { FC, useEffect, useState } from 'react';
import { Post } from '../../../Store/slices/PostsSlice';
import { ModsOfWritePost } from '../../../Utils/ModsOfComps';
import { getUserFromId } from '../../../Api/Users/getUserdataFromId';
import { OpenUserType } from '../../User/UserPage';
import ShowCode from '../../../Components/ShowPosts/postsComp/ShowCode';

interface PostRender {
    post: Post;
}

const PostRender: FC<PostRender> = ({ post }) => {
    const [UserWhoWrotePost, setUserWhoWrotePost] =
        useState<OpenUserType | null>(null);
    const [ImageIsLoad, setImageIsLoad] = useState(false);

    const PostLoadIsDone = post.PostDataBlocks.some(
        (block) => block.type === ModsOfWritePost.image
    )
        ? !!UserWhoWrotePost && !!ImageIsLoad
        : !!UserWhoWrotePost;

    useEffect(() => {
        function LoadUser() {
            getUserFromId(post.PostAuthorId).then((user) =>
                setUserWhoWrotePost(user)
            );
        }
        LoadUser();

        function loadImage(image: HTMLImageElement, url: string) {
            image.onload = function () {
                setImageIsLoad(true);
            };
            image.onerror = function () {
                setImageIsLoad(false);
            };
            image.src = url;
        }
        post.PostDataBlocks.map((block) => {
            block.type === ModsOfWritePost.image &&
                loadImage(new Image(), block.text);
        });
    }, [post]);

    return PostLoadIsDone ? (
        <div>
            {UserWhoWrotePost?.name}
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
