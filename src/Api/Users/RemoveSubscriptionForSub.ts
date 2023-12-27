import { getDatabase, ref, set } from '@firebase/database';

export function removeSubscriptionForSub(
    type: string,
    SubscribingId: string | null | undefined,
    UserId: string | null
) {
    const db = getDatabase();
    if (type === 'user') {
        const subListRef = ref(
            db,
            'users/' + SubscribingId + '/members/' + UserId
        );

        set(subListRef, null);
    } else if (type === 'team') {
        const subListRef = ref(
            db,
            'teams/' + SubscribingId + '/members/' + UserId
        );

        set(subListRef, null);
    }
}
