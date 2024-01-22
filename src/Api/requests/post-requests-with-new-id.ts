import { getDatabase, push, ref, set } from '@firebase/database';

export async function postRequestWithNewId<T>(
    Path: string,
    NewData: T,
): Promise<string> {
    const db = getDatabase();
    const postListRef = ref(db, Path);
    const newPostRef = push(postListRef);
    await set(newPostRef, NewData);

    return newPostRef.key as string;
}

export async function postRequestWithoutNewId<T>(
    Path: string,
    NewData: T,
): Promise<string> {
    const db = getDatabase();
    const postListRef = ref(db, Path);
    await set(postListRef, NewData);

    return postListRef.key as string;
}

export const postPaths = {};
