import { useAppSelector } from './redus-hooks';

export function useWritePost() {
    const { TitleOfPost, BlocksOfPost, selectMode, PostForWhom } =
        useAppSelector((state) => state.WritePost);

    return {
        postForWhom: PostForWhom,
        TitleOfPost,
        BlocksOfPost,
        selectMode,
    };
}
