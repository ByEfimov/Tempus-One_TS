import { useAppSelector } from './redus-hooks';

export function usePosts() {
    const { posts } = useAppSelector((state) => state.Posts);
    const arrayForSort = [...posts];
    arrayForSort.sort((a, b) => (b.PostDate > a.PostDate ? 1 : -1));

    return {
        posts: arrayForSort,
    };
}
