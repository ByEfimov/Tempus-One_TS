import { getDatabase, ref, set } from '@firebase/database';

export default function changeUserData(
    type: string,
    data: string | number,
    UserId: string | null
) {
    const db = getDatabase();
    const subListRef = ref(db, 'users/' + UserId + '/' + type);

    set(subListRef, data);
}
