import { getDatabase, ref, set } from '@firebase/database';

export default function changePostData(
    type: string,
    data: string | number,
    PostId: string | null,
) {
    const db = getDatabase();
    const subListRef = ref(db, 'posts/' + PostId + '/' + type);

    set(subListRef, data);
}
