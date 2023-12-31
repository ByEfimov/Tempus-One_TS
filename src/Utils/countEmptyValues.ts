type PostDataBlock = {
    id: number;
    text: string;
    title?: string;
    type: string;
};

type Post = {
    PostId: unknown;
    PostTitle: string;
    PostAuthorId: string | null;
    PostDate: number;
    PostLikes: number;
    PostShows: number;
    PostComments: Record<string, unknown>;
    PostDataBlocks: PostDataBlock[];
};
export function countEmptyValues(data: Post | PostDataBlock | unknown): number {
    if (Array.isArray(data)) {
        return data.reduce(
            (count: number, val: Post) => count + countEmptyValues(val),
            0,
        );
    } else if (typeof data === 'object' && data !== null) {
        return Object.values(data).reduce(
            (count: number, val: PostDataBlock) =>
                count + countEmptyValues(val),
            0,
        );
    } else {
        return !data ? 1 : 0;
    }
}
