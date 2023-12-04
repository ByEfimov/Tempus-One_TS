import { getDatabase, push, ref, set } from '@firebase/database';
import { NewPost } from '../../Pages/WriteHewPost/WritePost';

export function addNewPost(NewPost: NewPost) {
    const db = getDatabase();
    const postListRef = ref(db, 'posts/');
    const newPostRef = push(postListRef);
    set(newPostRef, NewPost);
}
