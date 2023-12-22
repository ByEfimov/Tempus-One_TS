import { WhoWrotePost } from 'Components/ShowPosts/Posts/PostRender';
import { Post } from 'Types/TypesOfData/Post/Post';
import { ModsOfWritePost } from 'Utils/ModsOfComps';

export const PostLoadIsDone = (
    WhoWrotePost: WhoWrotePost | null,
    ImageIsLoad: boolean,
    post: Post
) => {
    return post.PostDataBlocks.some(
        (block) => block.type === ModsOfWritePost.image
    )
        ? !!WhoWrotePost && !!ImageIsLoad
        : !!WhoWrotePost;
};
