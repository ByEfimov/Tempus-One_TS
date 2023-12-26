import { getDatabase, ref, set } from '@firebase/database';

export function addToSubscriptionsForUser(
    type: string,
    SubscribingId: string | null | undefined,
    UserId: string | null
) {
    const db = getDatabase();
    if (type === 'user') {
        const subListRef = ref(
            db,
            'users/' + UserId + '/subscriptions/users/' + SubscribingId
        );

        set(subListRef, SubscribingId);
    } else if (type === 'team') {
        const subListRef = ref(
            db,
            'users/' + UserId + '/subscriptions/teams/' + SubscribingId
        );

        set(subListRef, SubscribingId);
    }
}
