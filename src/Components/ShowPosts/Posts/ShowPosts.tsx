import { FC, useState } from 'react';
import Styles from './Styles.module.scss';
import PostRender from './PostRender';
import PreloaderPosts from 'Components/MiniComponents/PreloaderPosts';
import { Post } from 'Types/TypesOfData/Post/Post';
import FiltersPost from '../PostComponents/FiltersPosts';

interface ShowPosts {
    filter?: string;
}

const ShowPosts: FC<ShowPosts> = ({ filter }) => {
    const [posts, setPosts] = useState<Post[] | null>(null);

    return (
        <div className={Styles.Posts}>
            <FiltersPost setPosts={setPosts} filter={filter}></FiltersPost>
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
