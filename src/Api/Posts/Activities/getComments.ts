import { getDatabase, onValue, ref } from '@firebase/database';
import { Comments } from 'Types/TypesOfData/Post/Comments';

export function getComments(id: string | undefined) {
    const db = getDatabase();
    return new Promise<Comments[]>((resolve, reject) => {
        onValue(
            ref(db, 'posts/' + id + '/PostComments/'),
            (snapshot) => {
                if (snapshot.exists()) {
                    const comments = snapshot.val();
                    const outputArray =
                        comments &&
                        Object.keys(comments).map((key) => ({
                            ...comments[key],
                            CommentId: key,
                        }));
                    resolve(outputArray);
                } else {
                    console.error('Комментариев нет.');
                    reject(null);
                }
            },
            {
                onlyOnce: true,
            }
        );
    });
}
