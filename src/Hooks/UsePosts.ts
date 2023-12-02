import { useAppSelector } from './redus-hooks';

export function usePosts() {
    const { posts } = useAppSelector((state) => state.Posts);

    return {
        posts,
    };
}
