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
        selected?: Record<string, string>;
    }) {
        if (ItPostSelect === false && UserIsAuth) {
            postRequestWithoutNewId(
                'posts/' +
                    postId +
                    '/blocks/' +
                    block.id +
                    '/data/variants/' +
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
                    block.data.variants?.map((variant) => (
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                                selectVariant(variant);
                            }}
                            className={Styles.variant}
                            key={variant.id}
                        >
                            <progress
                                max={
                                    typeof SelectVariant === 'number'
                                        ? selectedUsers.length + 1
                                        : selectedUsers.length
                                }
                                value={
                                    ItPostSelect
                                        ? SelectVariant === variant.id
                                            ? Object.values(
                                                  variant.selected || '',
                                              ).length + 1
                                            : Object.values(
                                                  variant.selected || '',
                                              ).length
                                        : 0
                                }
                            ></progress>
                            {variant.text}
                            {ItPostSelect && (
                                <div className={Styles.stat}>
                                    {SelectVariant === variant.id
                                        ? Object.values(variant.selected || '')
                                              .length + 1
                                        : Object.values(variant.selected || '')
                                              .length}
                                    /
                                    {typeof SelectVariant === 'number'
                                        ? selectedUsers.length + 1
                                        : selectedUsers.length}
                                </div>
                            )}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ShowSurvey;
