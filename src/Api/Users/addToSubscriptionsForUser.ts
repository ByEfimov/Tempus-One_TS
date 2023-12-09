import { getDatabase, push, ref, set } from '@firebase/database';

export function addToSubscriptionsForUser(
    type: string,
    SubscribingId: string | null,
    UserId: string
) {
    const db = getDatabase();
    if (type === 'user') {
        const subListRef = ref(db, 'users/' + UserId + '/subscriptions/users/');
        const newPostRef = push(subListRef);
        set(newPostRef, SubscribingId);
    } else if (type === 'team') {
        const subListRef = ref(db, 'users/' + UserId + '/subscriptions/teams/');
        const newPostRef = push(subListRef);
        set(newPostRef, SubscribingId);
    }
}
