import { getDatabase, ref, onValue } from 'firebase/database';
import { Post } from 'Types/TypesOfData/Post/Post';

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
                    console.error('Пост не найден.');
                    reject(null);
                }
            },
            {
                onlyOnce: true,
            }
        );
    });
}
