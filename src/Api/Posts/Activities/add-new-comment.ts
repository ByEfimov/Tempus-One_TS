import { getDatabase, push, ref, set } from '@firebase/database';

export function addNewComment(
    NewComment: {
        CommentatorId: string | null;
        CommentText: string;
        CommentDate: number;
    },
    PostId: string
) {
    const db = getDatabase();
    const postListRef = ref(db, 'posts/' + PostId + '/PostComments/');
    const newPostRef = push(postListRef);
    set(newPostRef, NewComment);
}
