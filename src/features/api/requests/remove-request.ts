import { getDatabase, ref, set } from '@firebase/database';

export async function removeRequest(
    Path: string,
    RomovedPath: string,
): Promise<string> {
    const db = getDatabase();
    const postListRef = ref(db, Path + RomovedPath);
    await set(postListRef, null);

    return postListRef.key as string;
}

export const removePaths = {};
