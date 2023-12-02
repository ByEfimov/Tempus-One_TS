import { useNavigate } from 'react-router-dom';
import ButtonVoid from '../../Components/minicops/B-void';
import Styles from './MainPage.module.scss';
import { useEffect } from 'react';
import { getPosts } from '../../Api/Utils/getPosts';
import { useAppDispatch } from '../../Hooks/redus-hooks';
import { setPosts } from '../../Store/slices/PostsSlice';
import { usePosts } from '../../Hooks/UsePosts';

export default function MainPage() {
    const { posts } = usePosts();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        getPosts().then((posts) => {
            const scrollPosition = window.scrollY;
            if (scrollPosition === 0) {
                dispatch(setPosts({ posts: Object.values(posts) }));
            }
        });
    }, []);

    return (
        <>
            <ButtonVoid
                classes={Styles.button}
                title="Написать пост"
                clickHandler={() => {
                    navigate('WriteNewPost');
                }}
            ></ButtonVoid>
            {posts &&
                posts.map((post) => (
                    <div key={post.PostId}>{post.PostTitle}</div>
                ))}
        </>
    );
}
