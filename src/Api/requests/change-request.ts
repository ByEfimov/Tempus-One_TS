import filterBadWords from '@/Utils/post-utils/filter-bad-words';
import { getDatabase, ref, set } from '@firebase/database';

export async function changeRequest<T>(
    Path: string,
    ChangedPath: string,
    NewData: T,
): Promise<string> {
    const db = getDatabase();
    let filteredData;
    if (typeof NewData === 'string') {
        filteredData = filterBadWords(NewData);
    }
    const postListRef = ref(db, Path + ChangedPath);
    await set(postListRef, filteredData || NewData);

    return postListRef.key as string;
}

export const changePaths = {};
