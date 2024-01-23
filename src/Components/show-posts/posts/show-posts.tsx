import Styles from './Styles.module.scss';
import PostRender from './post-render';
import { getRequestArray } from 'Api/requests/get-requests';
import List from 'Assets/Tempus-Ui/Components/Select/Select';
import { ErrorNotification } from 'Components/notifications/notifications';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { setLastPostKey } from 'Store/slices/PostsSlice';
import { Post } from 'Types/TypesOfData/post/post';
import { useEffect, useState } from 'react';

const ShowPosts = () => {
    const [posts, setPosts] = useState<Post[] | null>(null);
    const [selectFilter, setSelectFilter] = useState<string>('Default');
    const Filters = [
        { name: 'Все посты', value: 'Default' },
        { name: 'Интересное', value: 'Interesting' },
        { name: 'Только мои', value: 'OnlyMy' },
    ];
    const dispatch = useAppDispatch();

    useEffect(() => {
        getRequestArray('/posts')
            .then((posts) => {
                setPosts(posts);
                dispatch(setLastPostKey(Object.keys(posts).pop()));
            })
            .catch(() => {
                ErrorNotification('Посты не найдены.');
            });
    }, [selectFilter]);

    return (
        <div className={Styles.Posts}>
            <List
                Array={Filters}
                setSelect={setSelectFilter}
                selectFilter={selectFilter}
            ></List>

            {posts &&
                posts.map((post) => <PostRender key={post.id} post={post} />)}
        </div>
    );
};
export default ShowPosts;
