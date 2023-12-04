import {
    getDatabase,
    ref,
    onValue,
    query,
    orderByKey,
} from 'firebase/database';
import { Post } from '../../Store/slices/PostsSlice';

export function getPosts() {
    const db = getDatabase();
    const postsRef = ref(db, '/posts');
    const lastTenPostsQuery = query(postsRef, orderByKey()); //Сдесь нужно добавить по последнему ключу

    return new Promise<{ [key: string | number]: Post }>((resolve, reject) => {
        onValue(
            lastTenPostsQuery,
            (snapshot) => {
                if (snapshot.exists()) {
                    resolve(snapshot.val());
                } else {
                    reject(null);
                }
            },
            {
                onlyOnce: true,
            }
        );
    });
}
