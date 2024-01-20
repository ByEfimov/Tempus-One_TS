import { getDatabase, ref, set } from '@firebase/database';

export default function unselectVariantOfSurvey(
    PostId: string,
    BlockId: number,
    VariantId: number | undefined,
    countOfSelect: number | undefined,
    UserId: string | null
) {
    const db = getDatabase();
    const subListRef = ref(
        db,
        'posts/' +
            PostId +
            '/PostDataBlocks/' +
            BlockId +
            '/variants/' +
            VariantId +
            '/selected/'
    );

    const userRef = ref(db, 'users/' + UserId + '/selectedVariants/' + PostId);
    const newVal = countOfSelect && countOfSelect - 1;
    set(subListRef, newVal);
    set(userRef, null);
}
