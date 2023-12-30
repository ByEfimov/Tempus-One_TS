import { getDatabase, ref, set } from '@firebase/database';

export function viewPostForUser(PostId: string, UserId: string | null) {
    const db = getDatabase();
    const postListRef = ref(db, 'users/' + UserId + '/viewers/' + PostId);

    set(postListRef, PostId);
}
