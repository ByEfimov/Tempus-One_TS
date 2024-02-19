import { WhoWrotePost } from '@/Components/show-posts/posts/post-render';
import { Post } from '@/Types/TypesOfData/post/post';
import { ModsOfWritePost } from '@/Utils/mods-of-comps';

export const PostLoadIsDone = (
    WhoWrotePost: WhoWrotePost | null,
    ImageIsLoad: boolean,
    post: Post,
) => {
    return post.PostDataBlocks.some(
        (block) => block.type === ModsOfWritePost.image,
    )
        ? !!WhoWrotePost && !!ImageIsLoad
        : !!WhoWrotePost;
};
