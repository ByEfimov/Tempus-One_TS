import { FC, useState } from 'react';
import Styles from '../Posts/Styles.module.scss';
import { Post } from 'Types/TypesOfData/Post/Post';
import { getPosts } from 'Api/Posts/getAllPosts';
import { setLastPostKey } from 'Store/slices/PostsSlice';
import { ErrorNotification } from 'Components/Notifications/Notifications';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { useAuth } from 'Hooks/useAuth';

interface FiltersProps {
    setPosts: React.Dispatch<React.SetStateAction<Post[] | null>>;
}

const FiltersPost: FC<FiltersProps> = ({ setPosts }) => {
    const [filter, setFilter] = useState<string | string[] | undefined | null>(
        ''
    );
    const { UserSubscriptions, UserId } = useAuth();
    const dispatch = useAppDispatch();

    function getPostsDefault() {
        getPosts(filter || null)
            .then((posts) => {
                setPosts(posts);
                dispatch(setLastPostKey(Object.keys(posts).pop()));
                console.log('get');
            })
            .catch(() => {
                ErrorNotification('Посты не найдены.');
            });
    }

    const teams =
        (UserSubscriptions?.teams && Object.values(UserSubscriptions?.teams)) ||
        [];
    const users =
        (UserSubscriptions?.users && Object.values(UserSubscriptions?.users)) ||
        [];
    const FilterInteresting = (UserSubscriptions?.teams ||
        UserSubscriptions?.users) && [...teams, ...users];

    return (
        <div className={Styles.Filters}>
            <button
                className={Styles.Filter}
                onClick={() => {
                    setFilter(''), getPostsDefault();
                }}
            >
                Все посты
            </button>
            <button
                className={Styles.Filter}
                onClick={() => {
                    setFilter(FilterInteresting), getPostsDefault();
                }}
            >
                Интересное
            </button>
            <button
                className={Styles.Filter}
                onClick={() => {
                    setFilter(UserId), getPostsDefault();
                }}
            >
                Только Мои
            </button>
        </div>
    );
};
export default FiltersPost;
