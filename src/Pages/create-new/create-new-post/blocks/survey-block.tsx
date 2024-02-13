import Styles from '../Styles.module.scss';
import BottomInfo from '../components/bottom-block-info';
import {
    ButtonIcons,
    HeaderIcons,
    buttonIcons,
    defaultItem,
    formContainer,
    formItem,
    headerIcons,
} from 'Assets/Tempus-Ui';
import { useAppDispatch } from 'Hooks/redux-hooks';
import {
    addVariant,
    blockType,
    changeDataBlock,
    changeVariantData,
    removeVariant,
} from 'Store/slices/wite-post/write-post-slice';
import classNames from 'classnames';
import { motion } from 'framer-motion';

const SurveyBlock = ({
    block,
    selectEditMode,
}: {
    block: blockType;
    selectEditMode: (blockId: number) => void;
}) => {
    const dispatch = useAppDispatch();

    return (
        <motion.div
            onClick={() => selectEditMode(block.id)}
            className={classNames(
                Styles.block,
                block.isEditing && Styles.active,
            )}
            variants={formItem}
        >
            {block.isEditing ? (
                <EditingMode block={block}></EditingMode>
            ) : (
                <RenderMode block={block}></RenderMode>
            )}
            <BottomInfo block={block}>
                <motion.li
                    onClick={() => dispatch(addVariant({ blockId: block.id }))}
                    variants={defaultItem}
                >
                    <HeaderIcons Icon={headerIcons.Add}></HeaderIcons>
                </motion.li>
            </BottomInfo>
        </motion.div>
    );
};

const EditingMode = ({ block }: { block: blockType }) => {
    const dispatch = useAppDispatch();
    return (
        'question' in block.data && (
            <>
                <div className={Styles.Quest}>
                    <input
                        value={block.data.question}
                        onChange={(e) =>
                            dispatch(
                                changeDataBlock({
                                    question: e.target.value,
                                    blockId: block.id,
                                    type: block.type,
                                }),
                            )
                        }
                    />
                </div>

                <motion.ul
                    variants={formContainer}
                    initial="hidden"
                    animate="visible"
                    className={Styles.variants}
                >
                    {block.data.variants?.map((variant) => (
                        <motion.li
                            key={variant.id}
                            variants={formItem}
                            className={Styles.variant}
                        >
                            <input
                                type="text"
                                value={variant.text}
                                onChange={(e) =>
                                    dispatch(
                                        changeVariantData({
                                            blockId: block.id,
                                            type: block.type,
                                            variant: e.target.value,
                                            variantId: variant.id,
                                        }),
                                    )
                                }
                            />
                            <div
                                onClick={() =>
                                    dispatch(
                                        removeVariant({
                                            blockId: block.id,
                                            variantId: variant.id,
                                        }),
                                    )
                                }
                                className={Styles.removeVariant}
                            >
                                <ButtonIcons
                                    Icon={buttonIcons.Trash}
                                ></ButtonIcons>
                            </div>
                        </motion.li>
                    ))}
                </motion.ul>
            </>
        )
    );
};

const RenderMode = ({ block }: { block: blockType }) => {
    return (
        'question' in block.data && (
            <>
                <div className={Styles.Quest}>{block.data.question}</div>
                <motion.ul
                    variants={formContainer}
                    initial="hidden"
                    animate="visible"
                    className={Styles.variants}
                >
                    {block.data.variants?.map((variant) => (
                        <motion.li
                            key={variant.id}
                            variants={formItem}
                            className={Styles.variant}
                        >
                            {variant.text}
                        </motion.li>
                    ))}
                </motion.ul>
            </>
        )
    );
};

export default SurveyBlock;
export { RenderMode };
