import { useAppSelector } from './redux-hooks';

export function usePosts() {
    const { lastPostKey } = useAppSelector((state) => state.Posts);

    return {
        lastPostKey,
    };
}
