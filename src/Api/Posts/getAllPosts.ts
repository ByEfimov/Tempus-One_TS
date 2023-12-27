import {
    getDatabase,
    ref,
    onValue,
    query,
    orderByKey,
    orderByChild,
    equalTo,
} from 'firebase/database';
import { Post } from 'Types/TypesOfData/Post/Post';

export function getPosts(filter: string | null | string[]) {
    const db = getDatabase();
    const postsRef = ref(db, '/posts/');
    let Posts = query(postsRef, orderByKey());
    if (filter && typeof filter === 'string') {
        Posts = query(postsRef, orderByChild('PostAuthorId'), equalTo(filter));
    }

    return new Promise<Post[]>((resolve, reject) => {
        onValue(
            Posts,
            (snapshot) => {
                if (snapshot.exists()) {
                    const posts = snapshot.val();

                    const outputArray: Post[] =
                        posts &&
                        Object.keys(posts).map((key) => ({
                            ...posts[key],
                            PostId: key,
                        }));

                    const filteredData = outputArray.filter(
                        (item) => filter?.includes(item.PostAuthorId)
                    );

                    if (filteredData.length > 0) {
                        resolve(filteredData);
                    } else {
                        resolve(outputArray);
                    }
                } else {
                    console.error('Посты не были получены.');
                    reject(null);
                }
            },
            {
                onlyOnce: true,
            }
        );
    });
}
