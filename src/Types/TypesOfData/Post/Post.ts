import { Comments } from './comments';

export type PostBlock = {
    id: number;
    text: string;
    type: string;
    title?: string;
    variants?: { id: number | undefined; text: string; selected?: number }[];
};

export type Post = {
    PostAuthorId: string;
    PostDataBlocks: PostBlock[];
    PostDate: number;
    PostId: string;
    PostLikes: number;
    PostShows: string[];
    PostTitle: string;
    PostReposts: number;
    PostComments: { [key: string]: Comments };
    PostWithRepostUs?: string;
};
