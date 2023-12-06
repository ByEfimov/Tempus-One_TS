import { useEffect, useState } from 'react';
import Styles from './Styles.module.scss';
import { getPosts } from '../../../Api/Posts/getALLPosts';
import { Post, setLastPostKey } from '../../../Store/slices/PostsSlice';
import PostRender from './PostRender';
import { useAppDispatch } from '../../../Hooks/redus-hooks';

export default function ShowPosts() {
    const [posts, setPosts] = useState<Post[] | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        getPosts().then((posts) => {
            const scrollPosition = window.scrollY;
            if (scrollPosition === 0) {
                setPosts(posts);
                dispatch(setLastPostKey(Object.keys(posts).pop()));
            }
        });
    }, []);

    return (
        <div className={Styles.Posts}>
            {posts &&
                posts.map((post) => (
                    <PostRender key={post.PostId} post={post} />
                ))}
        </div>
    );
}
