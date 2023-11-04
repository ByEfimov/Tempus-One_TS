import { useAppSelector } from './redus-hooks';

export function usePosts() {
    const Posts = useAppSelector((state) => state.posts);
    return {
        Posts,
    };
}
