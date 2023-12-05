import { getDatabase, set, ref } from '@firebase/database';

export function addUserToRealtimeDB(
    email: string | null,
    uid: string | null,
    displayName: string | null,
    photoURL: string | null,
    inputAge: number | null,
    emailVerified: boolean | null
) {
    const db = getDatabase();
    const NewUser = {
        email: email,
        experience: 0,
        id: uid,
        level: 1,
        name: displayName,
        photo: photoURL,
        age: inputAge,
        emailVerified: emailVerified,
    };

    set(ref(db, 'users/' + uid + '/'), NewUser);
}
