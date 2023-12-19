import { FC, useEffect, useState } from 'react';
import Styles from './Styles.module.scss';
import { getPosts } from 'Api/Posts/getAllPosts';
import { setLastPostKey } from 'Store/slices/PostsSlice';
import PostRender from './PostRender';
import { useAppDispatch } from 'Hooks/redux-hooks';
import PreloaderPosts from 'Components/MiniComponents/PreloaderPosts';
import { Post } from 'Types/TypesOfData/Post/Post';
import { ErrorNotification } from 'Components/Notifications/Notifications';

interface ShowPosts {
    filter?: string;
}

const ShowPosts: FC<ShowPosts> = ({ filter }) => {
    const [posts, setPosts] = useState<Post[] | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        getPosts(filter || null)
            .then((posts) => {
                setPosts(posts);
                dispatch(setLastPostKey(Object.keys(posts).pop()));
            })
            .catch(() => {
                ErrorNotification('Посты не найдены.');
            });
    }, []);

    return (
        <div className={Styles.Posts}>
            {posts ? (
                posts.map((post) => (
                    <PostRender key={post.PostId} post={post} />
                ))
            ) : (
                <PreloaderPosts></PreloaderPosts>
            )}
        </div>
    );
};
export default ShowPosts;
