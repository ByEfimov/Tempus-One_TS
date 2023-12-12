import {
    getDatabase,
    ref,
    onValue,
    query,
    orderByKey,
    orderByChild,
    equalTo,
} from 'firebase/database';
import { Post } from '../../Store/slices/PostsSlice';

export function getPosts(filter: string | null) {
    const db = getDatabase();
    const postsRef = ref(db, '/posts/');
    let Posts = query(postsRef, orderByKey());
    if (filter) {
        Posts = query(postsRef, orderByChild('PostAuthorId'), equalTo(filter));
    }

    return new Promise<Post[]>((resolve, reject) => {
        onValue(
            Posts,
            (snapshot) => {
                if (snapshot.exists()) {
                    const posts = snapshot.val();
                    const outputArray =
                        posts &&
                        Object.keys(posts).map((key) => ({
                            ...posts[key],
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
