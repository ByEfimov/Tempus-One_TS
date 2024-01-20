import { Post } from 'Types/TypesOfData/post/post';
import { getDatabase, onValue, ref } from 'firebase/database';

export function getPostFromId(id: string | undefined): Promise<Post | null> {
    const db = getDatabase();
    return new Promise((resolve, reject) => {
        onValue(
            ref(db, 'posts/' + id),
            (snapshot) => {
                if (snapshot.exists()) {
                    const Post = {
                        ...snapshot.val(),
                        PostId: snapshot.key,
                    };

                    resolve(Post);
                } else {
                    reject(null);
                }
            },
            {
                onlyOnce: true,
            },
        );
    });
}
