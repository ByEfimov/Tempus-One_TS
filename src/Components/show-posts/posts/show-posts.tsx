import Styles from './Styles.module.scss';
import PostRender from './post-render';
import { getRequestArray } from 'Api/requests/get-requests';
import { defaultContainer } from 'Assets/Tempus-Ui/Animation/Form-animate';
import Preloader from 'Assets/Tempus-Ui/Components/Preloader/Preloader';
import Select from 'Assets/Tempus-Ui/Components/Select/Select';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { useAuth } from 'Hooks/useAuth';
import { useHeader } from 'Hooks/useHeader';
import { setLastPostKey } from 'Store/slices/PostsSlice';
import { Post } from 'Types/TypesOfData/post/post';
import { FiltersPosts, aplyFilterPosts } from 'Utils/filters/filter-posts';
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
    const [posts, setPosts] = useState<Post[] | undefined>();
    const [selectFilter, setSelectFilter] = useState<string>('Default');
    const { UserSubscriptions, UserId } = useAuth();
    const { HeaderSearchBar } = useHeader();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const TimeSearch = HeaderSearchBar;
        function getPosts() {
            getRequestArray('/posts').then((posts) => {
                const filteredPosts = aplyFilterPosts(
                    posts,
                    selectFilter,
                    UserSubscriptions,
                    UserId,
                    HeaderSearchBar,
                    AuthorFilter,
                );
                setPosts(filteredPosts);
                dispatch(setLastPostKey(Object.keys(posts).pop()));
            });
        }
        setTimeout(() => {
            if (TimeSearch === HeaderSearchBar) {
                getPosts();
            }
        }, 1000);
    }, [selectFilter, HeaderSearchBar]);

    return (
        <div className={Styles.Posts}>
            {ShowFilters && (
                <Select
                    Array={FiltersPosts}
                    setSelect={setSelectFilter}
                    selectFilter={selectFilter}
                ></Select>
            )}
            {posts ? (
                <>
                    {ShowTitle && (
                        <motion.div className={Styles.Title}>
                            Посты <div>{posts.length}</div>
                        </motion.div>
                    )}
                    <motion.div
                        className={Styles.Render}
                        initial="hidden"
                        animate="visible"
                        variants={defaultContainer}
                    >
                        {posts.map((post) => (
                            <PostRender key={post.id} post={post} />
                        ))}
                    </motion.div>
                </>
            ) : (
                <Preloader></Preloader>
            )}
        </div>
    );
};
export default ShowPosts;
