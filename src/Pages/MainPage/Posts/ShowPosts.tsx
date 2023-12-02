import { useEffect } from 'react';
import Styles from './Styles.module.scss';
import { getPosts } from '../../../Api/Posts/getPosts';
import { useAppDispatch } from '../../../Hooks/redus-hooks';
import { setPosts } from '../../../Store/slices/PostsSlice';
import { usePosts } from '../../../Hooks/UsePosts';
import PostRender from './PostRender';

export default function ShowPosts() {
    const { posts } = usePosts();
    const dispatch = useAppDispatch();

    useEffect(() => {
        getPosts().then((posts) => {
            const scrollPosition = window.scrollY;
            if (scrollPosition === 0) {
                dispatch(setPosts({ posts: Object.values(posts) }));
            }
        });
    }, [dispatch, posts]);

    return (
        <div className={Styles.Posts}>
            {posts &&
                posts.map((post) => (
                    <PostRender key={post.PostId} post={post} />
                ))}
        </div>
    );
}
