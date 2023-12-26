import { BlockOfPostType } from './WritePost';

export type NewPostType = {
    PostDataBlocks: BlockOfPostType[];
    PostTitle: string;
    PostAuthorId: string | null;
    PostDate: number;
    PostLikes: number;
    PostShows: number;
    PostComments: object;
    PostReposts: number;
    PostId?: string | null;
    PostWithRepostUs?: string;
};
