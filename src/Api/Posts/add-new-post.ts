/* eslint-disable import/order */
import { getDatabase, push, ref, set } from '@firebase/database';
import { NewPostType } from 'Types/TypesOfData/post/new-post-type';

export function addNewPost(NewPost: NewPostType) {
    const db = getDatabase();
    const postListRef = ref(db, 'posts/');
    const newPostRef = push(postListRef);
    set(newPostRef, NewPost);
}
