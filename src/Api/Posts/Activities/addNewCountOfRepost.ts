import { getDatabase, ref, set } from '@firebase/database';

export function addNewCountOfReposts(NewCount: number, PostId: string) {
    const db = getDatabase();
    const postRepostedRef = ref(db, 'posts/' + PostId + '/PostReposts/');
    set(postRepostedRef, NewCount);
}
