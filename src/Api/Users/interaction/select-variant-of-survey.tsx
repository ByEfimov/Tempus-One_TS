import { getDatabase, ref, set } from '@firebase/database';

export default function selectVariantOfSurvey(
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
    const userRef = ref(
        db,
        'users/' +
            UserId +
            '/selectedVariants/' +
            PostId +
            '/' +
            BlockId +
            '/' +
            VariantId
    );

    set(subListRef, countOfSelect);
    set(userRef, VariantId);
}
