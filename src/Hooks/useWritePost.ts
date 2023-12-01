import { useAppSelector } from './redus-hooks';

export function useWritePost() {
    const { TitleOfPost, BlocksOfPost, selectMode } = useAppSelector(
        (state) => state.WritePost
    );

    return {
        TitleOfPost,
        BlocksOfPost,
        selectMode,
    };
}
