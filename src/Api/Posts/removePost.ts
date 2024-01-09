import { getDatabase, ref, set } from '@firebase/database';

export default function removePost(PostId: string | null) {
    const db = getDatabase();
    const subListRef = ref(db, 'posts/' + PostId);

    set(subListRef, null);
}
