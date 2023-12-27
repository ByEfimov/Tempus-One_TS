import { getDatabase, ref, set } from '@firebase/database';

export function viewPostForPost(PostId: string, UserId: string | null) {
    const db = getDatabase();
    const postListRef = ref(db, 'posts/' + PostId + '/PostShows/' + UserId);

    set(postListRef, UserId);
}
