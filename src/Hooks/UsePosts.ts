import { useAppSelector } from './redus-hooks';

export function usePosts() {
    const { lastPostKey } = useAppSelector((state) => state.Posts);

    return {
        lastPostKey,
    };
}
