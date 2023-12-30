import { FC, useState } from 'react';
import Styles from '../Posts/Styles.module.scss';
import { PostBlock } from 'Types/TypesOfData/Post/Post';
import selectVariantOfSurvey from 'Api/Users/Interaction/selectVariantOfSurvey';
import { useAuth } from 'Hooks/useAuth';

interface ShowSurvey {
    block: PostBlock;
    postId: string;
}

const ShowSurvey: FC<ShowSurvey> = ({ block, postId }) => {
    const { UserId, UserSelectedVariants } = useAuth();
    const [SelectVariant, setSelectVariant] = useState<
        number | null | undefined
    >(null);

    const ItPostSelect =
        UserSelectedVariants &&
        Object.keys(UserSelectedVariants).includes(postId);

    function selectVariant(Variant: {
        id: number | undefined;
        text: string;
        selected?: number | undefined;
    }) {
        if (!ItPostSelect) {
            selectVariantOfSurvey(
                postId,
                block.id,
                Variant.id,
                (Variant.selected && Variant.selected + 1) || 1,
                UserId
            );
            setSelectVariant(Variant.id);
        }
    }

    return (
        <div className={Styles.SurveyMode}>
            <div className={Styles.title}>{block.title}</div>
            <div className={Styles.variants}>
                {block.variants?.map((variant) =>
                    ItPostSelect ? (
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                                selectVariant(variant);
                            }}
                            className={Styles.variant}
                            key={variant.id}
                        >
                            {variant.text}{' '}
                            {variant.selected && variant.id === SelectVariant
                                ? variant.selected + 1
                                : variant.selected}
                        </div>
                    ) : (
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                                selectVariant(variant);
                            }}
                            className={Styles.variant}
                            key={variant.id}
                        >
                            {variant.text}
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default ShowSurvey;
