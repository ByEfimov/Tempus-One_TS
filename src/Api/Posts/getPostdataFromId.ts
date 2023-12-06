import { getDatabase, ref, onValue } from 'firebase/database';
import { Post } from '../../Store/slices/PostsSlice';

export function getPostFromId(id: string | undefined): Promise<Post | null> {
    const db = getDatabase();
    return new Promise((resolve, reject) => {
        onValue(
            ref(db, 'posts/' + id),
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
