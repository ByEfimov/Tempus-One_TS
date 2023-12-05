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
    const postsRef = ref(db, '/posts/');
    const lastTenPostsQuery = query(postsRef, orderByKey()); //Сдесь нужно добавить по последнему ключу

    return new Promise<Post[]>((resolve, reject) => {
        onValue(
            lastTenPostsQuery,
            (snapshot) => {
                if (snapshot.exists()) {
                    const posts = snapshot.val();
                    const outputArray =
                        posts &&
                        Object.keys(posts).map((key) => ({
                            PostAuthorId: posts[key].PostAuthorId,
                            PostDataBlocks: posts[key].PostDataBlocks,
                            PostDate: posts[key].PostDate,
                            PostLikes: posts[key].PostLikes,
                            PostShows: posts[key].PostShows,
                            PostTitle: posts[key].PostTitle,
                            PostId: key,
                        }));

                    resolve(outputArray);
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
