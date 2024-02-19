import Styles from './Styles.module.scss';
import PostRender from './post-render';
import { getRequestArray } from '@/Api/requests/get-requests';
import {
    Preloader,
    Select,
    SelectTypes,
    defaultContainer,
    defaultItem,
} from '@/Assets/Tempus-Ui';
import { useAppDispatch } from '@/Hooks/redux-hooks';
import { useAuth } from '@/Hooks/useAuth';
import { useHeader } from '@/Hooks/useHeader';
import { setLastPostKey } from '@/Store/slices/PostsSlice';
import { PostType } from '@/Store/slices/wite-post/write-post-slice';
import { FiltersPosts, aplyFilterPosts } from '@/Utils/filters/filter-posts';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const ShowPosts = ({
    AuthorFilter = '',
    ShowFilters = false,
    ShowTitle = false,
}: {
    AuthorFilter?: string;
    ShowFilters?: boolean;
    ShowTitle?: boolean;
}) => {
    const [posts, setPosts] = useState<PostType[]>();
    const [selectFilter, setSelectFilter] = useState<string>('Default');
    const { UserSubscriptions, UserId } = useAuth();
    const { HeaderSearchBar } = useHeader();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (HeaderSearchBar) {
                const filteredPosts = aplyFilterPosts(
                    selectFilter,
                    UserSubscriptions,
                    UserId,
                    HeaderSearchBar,
                    AuthorFilter,
                    posts,
                );
                setPosts(filteredPosts);
            } else {
                getRequestArray('/posts').then((posts) => {
                    const filteredPosts = aplyFilterPosts(
                        selectFilter,
                        UserSubscriptions,
                        UserId,
                        HeaderSearchBar,
                        AuthorFilter,
                        posts,
                    );
                    setPosts(filteredPosts);
                    dispatch(setLastPostKey(Object.keys(posts).pop()));
                });
            }
        }, 1000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [selectFilter, HeaderSearchBar]);

    return (
        <div className={Styles.Posts}>
            {ShowFilters && (
                <Select
                    Array={FiltersPosts}
                    setSelect={setSelectFilter}
                    Select={selectFilter}
                    Type={SelectTypes.Row}
                ></Select>
            )}
            {ShowTitle && (
                <motion.div variants={defaultItem} className={Styles.Title}>
                    Посты <div>{posts?.length || 0}</div>
                </motion.div>
            )}
            {posts ? (
                <motion.div {...defaultContainer}>
                    <motion.div
                        className={Styles.Render}
                        variants={defaultItem}
                    >
                        {posts.map((post) => (
                            <PostRender key={post.id} post={post} />
                        ))}
                    </motion.div>
                </motion.div>
            ) : (
                <Preloader></Preloader>
            )}
        </div>
    );
};
export default ShowPosts;
