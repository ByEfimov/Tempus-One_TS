import { BlockOfPostType } from './write-post';

export type NewPostType = {
    PostDataBlocks: BlockOfPostType[];
    PostTitle: string;
    PostAuthorId: string | null;
    PostDate: number;
    PostLikes: { [key: string]: string } | 0;
    PostShows: number;
    PostComments: object;
    PostReposts: number;
    PostId?: string | null;
    PostWithRepostUs?: string;
    id: null;
};
