import { getDatabase, ref, set } from '@firebase/database';

export default function changeTeamData(
    type: string,
    data: string | number,
    UserId: string | null
) {
    const db = getDatabase();
    const subListRef = ref(db, 'teams/' + UserId + '/' + type);

    set(subListRef, data);
}
