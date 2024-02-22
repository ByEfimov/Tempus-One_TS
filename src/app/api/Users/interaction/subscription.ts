import { getDatabase, ref, set } from '@firebase/database';

export function Subscription(
    type: string,
    SubscribingId: string | undefined,
    UserId: string | null,
    reverse = false,
) {
    const db = getDatabase();
    if (reverse) {
        if (type === 'user') {
            const subListRef = ref(
                db,
                'users/' + UserId + '/subscriptions/users/' + SubscribingId,
            );

            set(subListRef, null);
            const subListSRef = ref(
                db,
                'users/' + SubscribingId + '/members/' + UserId,
            );

            set(subListSRef, null);
        } else if (type === 'team') {
            const subListRef = ref(
                db,
                'users/' + UserId + '/subscriptions/teams/' + SubscribingId,
            );

            set(subListRef, null);
            const subListSRef = ref(
                db,
                'teams/' + SubscribingId + '/members/' + UserId,
            );

            set(subListSRef, null);
        }
    } else {
        if (type === 'user') {
            const subListRef = ref(
                db,
                'users/' + UserId + '/subscriptions/users/' + SubscribingId,
            );

            set(subListRef, SubscribingId);
            const subListSRef = ref(
                db,
                'users/' + SubscribingId + '/members/' + UserId,
            );
            const subObject = {
                UserId: UserId,
                UserRole: 'subscriber',
            };
            set(subListSRef, subObject);
        } else if (type === 'team') {
            const subListRef = ref(
                db,
                'users/' + UserId + '/subscriptions/teams/' + SubscribingId,
            );

            set(subListRef, SubscribingId);
            const subListSRef = ref(
                db,
                'teams/' + SubscribingId + '/members/' + UserId,
            );
            const subObject = {
                UserId: UserId,
                UserRole: 'subscriber',
            };
            set(subListSRef, subObject);
        }
    }
}
