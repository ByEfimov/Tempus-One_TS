import { getDatabase, ref, set } from '@firebase/database';

export async function changeRequest<T>(
    Path: string,
    ChangedPath: string,
    NewData: T,
): Promise<string> {
    const db = getDatabase();
    const postListRef = ref(db, Path + ChangedPath);
    await set(postListRef, NewData);

    return postListRef.key as string;
}

export const changePaths = {};
