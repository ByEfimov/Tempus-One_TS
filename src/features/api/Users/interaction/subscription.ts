import { getDatabase, ref, set } from '@firebase/database';

export function Subscription(
  type: string,
  SubscribingId: string | undefined,
  UserId: string | null,
  reverse = false,
  role = 'subscriber',
) {
  const db = getDatabase();
  if (reverse) {
    if (type === 'user') {
      const subListRef = ref(db, 'users/' + UserId + '/subscriptions/users/' + SubscribingId);

      set(subListRef, null);
      const subListSRef = ref(db, 'users/' + SubscribingId + '/members/' + UserId);

      set(subListSRef, null);
    } else if (type === 'team') {
      const subListRef = ref(db, 'users/' + UserId + '/subscriptions/teams/' + SubscribingId);

      set(subListRef, null);
      const subListSRef = ref(db, 'teams/' + SubscribingId + '/members/' + UserId);

      set(subListSRef, null);
    }
  } else {
    if (type === 'user') {
      const subObject = {
        UserId: UserId,
        UserRole: 'subscriber',
      };

      const subListRef = ref(db, 'users/' + UserId + '/subscriptions/users/' + SubscribingId);
      set(subListRef, SubscribingId);

      const subListSRef = ref(db, 'users/' + SubscribingId + '/members/' + UserId);
      set(subListSRef, subObject);
    } else if (type === 'team') {
      const subObject = {
        UserId: UserId,
        UserRole: role,
      };
      const subObjectT = {
        TeamId: SubscribingId,
        UserRole: role,
      };

      const subListRef = ref(db, 'users/' + UserId + '/subscriptions/teams/' + SubscribingId);
      set(subListRef, subObjectT);

      const subListSRef = ref(db, 'teams/' + SubscribingId + '/members/' + UserId);
      set(subListSRef, subObject);
    }
  }
}
