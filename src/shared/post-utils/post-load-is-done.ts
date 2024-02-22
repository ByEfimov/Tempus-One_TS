import { ModsOfWritePost } from '../mods-of-comps';
import { Post } from '@/app/types/TypesOfData/post/post';
import { WhoWrotePost } from '@/entities/post/postRender';

export const PostLoadIsDone = (WhoWrotePost: WhoWrotePost | null, ImageIsLoad: boolean, post: Post) => {
  return post.PostDataBlocks.some((block) => block.type === ModsOfWritePost.image)
    ? !!WhoWrotePost && !!ImageIsLoad
    : !!WhoWrotePost;
};
