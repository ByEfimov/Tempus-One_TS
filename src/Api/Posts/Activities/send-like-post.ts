import { getDatabase, ref, set } from '@firebase/database';

export function SendLikePost(
    PostId: string,
    UserId: string | null,
    PostLikes: number
) {
    const db = getDatabase();
    const SendLikeUserRef = ref(
        db,
        'users/' + UserId + '/postsLiked/' + PostId
    );
    const SendLikeRef = ref(db, 'posts/' + PostId + '/PostLikes');

    set(SendLikeUserRef, PostId);
    set(SendLikeRef, PostLikes);
}
