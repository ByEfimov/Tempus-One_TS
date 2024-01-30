import { Filters, aplyFilter } from '../post-components/filters';
import Styles from './Styles.module.scss';
import PostRender from './post-render';
import { getRequestArray } from 'Api/requests/get-requests';
import { formContainer } from 'Assets/Tempus-Ui/Animation/Form-animate';
import Preloader from 'Assets/Tempus-Ui/Components/Preloader/Preloader';
import Select from 'Assets/Tempus-Ui/Components/Select/Select';
import TextWithLine from 'Assets/Tempus-Ui/Components/Texts/Text-with-line';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { useAuth } from 'Hooks/useAuth';
import { useHeader } from 'Hooks/useHeader';
import { setLastPostKey } from 'Store/slices/PostsSlice';
import { Post } from 'Types/TypesOfData/post/post';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const ShowPosts = ({ AuthorFilter = '' }: { AuthorFilter: string }) => {
    const [posts, setPosts] = useState<Post[] | undefined>();
    const [selectFilter, setSelectFilter] = useState<string>('Default');
    const { UserSubscriptions, UserId } = useAuth();
    const { HeaderSearchBar } = useHeader();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const TimeSearch = HeaderSearchBar;
        function getPosts() {
            getRequestArray('/posts').then((posts) => {
                const filteredPosts = aplyFilter(
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
            <Select
                Array={Filters}
                setSelect={setSelectFilter}
                selectFilter={selectFilter}
            ></Select>{' '}
            {posts ? (
                <motion.div
                    className={Styles.Render}
                    initial="hidden"
                    animate="visible"
                    variants={formContainer}
                >
                    {posts.map((post) => (
                        <PostRender key={post.id} post={post} />
                    ))}
                    <TextWithLine>Постов больше нет</TextWithLine>
                </motion.div>
            ) : (
                <Preloader></Preloader>
            )}
        </div>
    );
};
export default ShowPosts;
