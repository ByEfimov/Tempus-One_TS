import { get, getDatabase, ref } from '@firebase/database';

export async function getRequestArray(Path: string) {
    const db = getDatabase();
    const snapshot = await get(ref(db, Path));
    const outputArray = Object.keys(snapshot.val()).map((key) => ({
        ...snapshot.val()[key],
        id: key,
    }));

    if (!snapshot.exists()) {
        throw new Error('Snapshot does not exist');
    }
    return outputArray;
}

export async function getRequestObject(Path: string) {
    const db = getDatabase();
    const snapshot = await get(ref(db, Path));
    const outputObject = {
        ...snapshot.val(),
        PostId: snapshot.key,
    };

    if (!snapshot.exists()) {
        throw new Error('Snapshot does not exist');
    }
    return outputObject;
}

export const getPaths = {};
