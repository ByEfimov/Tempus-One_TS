import Styles from '../posts/Styles.module.scss';
import { postRequestWithoutNewId } from 'Api/requests/post-requests-with-new-id';
import { useAuth } from 'Hooks/useAuth';
import { blockType } from 'Store/slices/wite-post/write-post-slice';
import { FC, useState } from 'react';

interface ShowSurvey {
    block: blockType;
    postId: string | undefined;
}

const ShowSurvey: FC<ShowSurvey> = ({ block, postId }) => {
    const { UserId, UserIsAuth } = useAuth();
    const [SelectVariant, setSelectVariant] = useState<
        number | null | undefined
    >(null);
    const [ItPostSelect, setItPostSelect] = useState(
        'variants' in block.data &&
            Object.values(block.data.variants || 0).some(
                (obj) => obj.selected && obj.selected[UserId] === UserId,
            ),
    );

    const selectedUsers = Object.values(
        ('variants' in block.data && block.data.variants) || 0,
    ).reduce((acc, obj) => {
        if (obj.selected) {
            const users = Object.keys(obj.selected);
            acc.push(...users);
        }
        return acc;
    }, []);

    function selectVariant(Variant: {
        id: number | undefined;
        text: string;
        selected?: { [key: string]: string };
    }) {
        if (!ItPostSelect && UserIsAuth) {
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
            <div className={Styles.title}>
                {'question' in block.data && block.data.question}
            </div>
            <div className={Styles.variants}>
                {'variants' in block.data &&
                    block.data.variants?.map((variant) =>
                        ItPostSelect ? (
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    selectVariant(variant);
                                }}
                                className={Styles.variant}
                                key={variant.id}
                            >
                                <progress
                                    max={selectedUsers.length}
                                    value={
                                        variant.id === SelectVariant
                                            ? Object.values(
                                                  variant.selected || 0,
                                              ).length + 1
                                            : Object.values(
                                                  variant.selected || 0,
                                              ).length
                                    }
                                ></progress>
                                {variant.text}{' '}
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
