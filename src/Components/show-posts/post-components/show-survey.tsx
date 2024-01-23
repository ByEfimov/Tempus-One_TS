import Styles from '../posts/Styles.module.scss';
import { postRequestWithoutNewId } from 'Api/requests/post-requests-with-new-id';
import { useAuth } from 'Hooks/useAuth';
import { PostBlock } from 'Types/TypesOfData/post/post';
import { FC, useState } from 'react';

interface ShowSurvey {
    block: PostBlock;
    postId: string;
}

const ShowSurvey: FC<ShowSurvey> = ({ block, postId }) => {
    const { UserId } = useAuth();
    const [SelectVariant, setSelectVariant] = useState<
        number | null | undefined
    >(null);
    const [ItPostSelect, setItPostSelect] = useState(
        Object.values(block.variants || 0).some(
            (obj) => obj.selected && obj.selected[UserId] === UserId,
        ),
    );

    function selectVariant(Variant: {
        id: number | undefined;
        text: string;
        selected?: { [key: string]: string };
    }) {
        if (!ItPostSelect) {
            postRequestWithoutNewId(
                'posts/' +
                    postId +
                    '/PostDataBlocks/' +
                    block.id +
                    '/variants/' +
                    Variant.id +
                    '/selected/' +
                    UserId,
                UserId,
            );
            setSelectVariant(Variant.id);
            setItPostSelect(true);
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
                            {variant.id === SelectVariant
                                ? Object.values(variant.selected || 0).length +
                                  1
                                : Object.values(variant.selected || 0).length}
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
                    ),
                )}
            </div>
        </div>
    );
};

export default ShowSurvey;
