import { getDatabase, onValue, ref } from '@firebase/database';
import { Comments } from 'Types/TypesOfData/post/comments';

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
                    reject(null);
                }
            },
            {
                onlyOnce: true,
            },
        );
    });
}
