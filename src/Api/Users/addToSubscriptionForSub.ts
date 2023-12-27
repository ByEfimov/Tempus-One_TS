import { getDatabase, ref, set } from '@firebase/database';

export function addToSubscriptionsForSub(
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
        const subObject = {
            UserId: UserId,
            UserRole: 'subscriber',
        };
        set(subListRef, subObject);
    } else if (type === 'team') {
        const subListRef = ref(
            db,
            'teams/' + SubscribingId + '/members/' + UserId
        );
        const subObject = {
            UserId: UserId,
            UserRole: 'subscriber',
        };
        set(subListRef, subObject);
    }
}
