import { Post } from '@/Types/TypesOfData/post/post';
import { ModsOfWritePost } from '@/Utils/mods-of-comps';
import { WhoWrotePost } from '@/entities/post/postRender';

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
