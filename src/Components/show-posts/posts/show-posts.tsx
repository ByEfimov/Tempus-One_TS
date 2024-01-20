import FiltersPost from '../post-components/filters-posts';
import Styles from './Styles.module.scss';
import PostRender from './post-render';
import PreloaderPosts from 'Components/mini-components/preloader-posts';
import { Post } from 'Types/TypesOfData/post/post';
import { FC, useState } from 'react';

interface ShowPosts {
    filter?: string;
    filterIsOpen?: boolean;
}

const ShowPosts: FC<ShowPosts> = ({ filter, filterIsOpen = false }) => {
    const [posts, setPosts] = useState<Post[] | null>(null);

    return (
        <div className={Styles.Posts}>
            <FiltersPost
                setPosts={setPosts}
                filter={filter}
                filterIsOpen={filterIsOpen}
            />

            {posts ? (
                posts.map((post) => (
                    <PostRender key={post.PostId} post={post} />
                ))
            ) : (
                <PreloaderPosts />
            )}
        </div>
    );
};
export default ShowPosts;
