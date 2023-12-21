import { Comments } from './Comments';

export type PostBlock = {
    id: number;
    text: string;
    type: string;
    title?: string;
};

export type Post = {
    PostAuthorId: string;
    PostDataBlocks: PostBlock[];
    PostDate: number;
    PostId: string;
    PostLikes: number;
    PostShows: number;
    PostTitle: string;
    PostReposts: number;
    PostComments: { [key: string]: Comments };
};
