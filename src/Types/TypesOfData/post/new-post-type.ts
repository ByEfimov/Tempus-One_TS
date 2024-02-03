import { BlockOfPostType } from './write-post';

export type NewPostType = {
    PostDataBlocks: BlockOfPostType[];
    PostTitle: string;
    PostAuthorId: string | null;
    PostDate: number;
    PostId?: string | null;
    PostWithRepostUs?: string;
    id?: null;
};
