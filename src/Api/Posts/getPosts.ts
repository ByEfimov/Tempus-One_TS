import { getDatabase, ref, child, get } from 'firebase/database';
import { PostsType } from '../../Store/slices/PostsSlice';

export function getPosts() {
    const dbRef = ref(getDatabase());
    return new Promise<PostsType>((resolve, reject) => {
        get(child(dbRef, 'posts/'))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    resolve(snapshot.val());
                }
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
}
