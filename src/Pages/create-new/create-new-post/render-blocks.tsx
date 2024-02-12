import Styles from './Styles.module.scss';
import {
    ButtonIcons,
    HeaderIcons,
    LoadImage,
    LoadImageColors,
    buttonIcons,
    defaultContainer,
    defaultItem,
    formContainer,
    formItem,
    headerIcons,
} from 'Assets/Tempus-Ui';
import { LoadImageSizes } from 'Assets/Tempus-Ui/Components/LoadImage/load-image';
import { useAppDispatch } from 'Hooks/redux-hooks';
import {
    activeEditing,
    addVariant,
    blockType,
    blockTypes,
    blocksType,
    changeDataBlock,
    changeVariantData,
    removeBlock,
    removeVariant,
} from 'Store/slices/wite-post/write-post-slice';
import classNames from 'classnames';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import { motion } from 'framer-motion';
import { LiveEditor, LivePreview, LiveProvider } from 'react-live';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

const RenderBlocks = ({ blocksData }: { blocksData: blocksType }) => {
    const dispatch = useAppDispatch();
    function selectEditMode(blockId: number) {
        dispatch(activeEditing({ blockId }));
    }

    function removeBlockF(blockId: number) {
        dispatch(removeBlock({ blockId }));
    }

    return blocksData.map((block) => {
        if (block?.type === blockTypes.Text) {
            return (
                <TextBlock
                    key={block.id}
                    block={block}
                    removeBlock={removeBlockF}
                    selectEditMode={selectEditMode}
                ></TextBlock>
            );
        }
        if (block?.type === blockTypes.Image) {
            return (
                <ImageBlock
                    key={block.id}
                    block={block}
                    removeBlock={removeBlockF}
                    selectEditMode={selectEditMode}
                ></ImageBlock>
            );
        }
        if (block?.type === blockTypes.Code) {
            return (
                <CodeBlock
                    key={block.id}
                    block={block}
                    removeBlock={removeBlockF}
                    selectEditMode={selectEditMode}
                ></CodeBlock>
            );
        }
        if (block?.type === blockTypes.Survey) {
            return (
                <SurveyBlock
                    key={block.id}
                    block={block}
                    removeBlock={removeBlockF}
                    selectEditMode={selectEditMode}
                ></SurveyBlock>
            );
        }
    });
};

const TextBlock = ({
    block,
    selectEditMode,
    removeBlock,
}: {
    block: blockType;
    selectEditMode: (blockId: number) => void;
    removeBlock: (blockId: number) => void;
}) => {
    const dispatch = useAppDispatch();

    if ('content' in block.data) {
        return (
            <motion.div
                variants={formItem}
                className={classNames(
                    Styles.block,
                    block.isEditing && Styles.active,
                )}
                onClick={() => selectEditMode(block.id)}
            >
                {block.isEditing ? (
                    <motion.textarea
                        value={block.data.content}
                        variants={defaultItem}
                        autoFocus
                        onChange={(e) =>
                            dispatch(
                                changeDataBlock({
                                    content: e.target.value,
                                    blockId: block.id,
                                    type: block.type,
                                }),
                            )
                        }
                    ></motion.textarea>
                ) : (
                    <motion.div variants={defaultItem}>
                        <ReactMarkdown
                            skipHtml
                            rehypePlugins={[rehypeHighlight]}
                            remarkPlugins={[remarkGfm]}
                            children={block.data.content}
                        />
                    </motion.div>
                )}

                {block.isEditing && (
                    <motion.ul
                        variants={defaultContainer}
                        className={Styles.bottomInfo}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.li variants={defaultItem}>
                            <ButtonIcons
                                Icon={buttonIcons.MarkDown}
                            ></ButtonIcons>
                        </motion.li>
                        <motion.li
                            onClick={() => removeBlock(block.id)}
                            className={Styles.trash}
                            variants={defaultItem}
                        >
                            <ButtonIcons Icon={buttonIcons.Trash}></ButtonIcons>
                        </motion.li>
                    </motion.ul>
                )}
            </motion.div>
        );
    }
};
const ImageBlock = ({
    block,
    selectEditMode,
    removeBlock,
}: {
    block: blockType;
    selectEditMode: (blockId: number) => void;
    removeBlock: (blockId: number) => void;
}) => {
    const dispatch = useAppDispatch();

    function removeImage() {
        if (block && 'data' in block && 'imageUrl' in block.data) {
            const parts = block.data.imageUrl?.split('/') || '';
            const encodedId = parts[parts.length - 1].split('?')[0];
            const idWith7 = decodeURIComponent(encodedId);
            const idWithout7 = idWith7.substring(1);
            const storage = getStorage();
            const desertRef = ref(storage, 'P' + idWithout7);
            deleteObject(desertRef);
            removeBlock(block.id);
        }
    }
    return (
        'imageUrl' in block.data && (
            <motion.div
                onClick={() => selectEditMode(block.id)}
                variants={formItem}
                className={classNames(
                    Styles.block,
                    block.isEditing && Styles.active,
                )}
            >
                <LoadImage
                    Size={LoadImageSizes.Large}
                    Callback={(imageUrl: string) => {
                        dispatch(
                            changeDataBlock({
                                imageUrl: imageUrl,
                                blockId: block.id,
                                type: block.type,
                            }),
                        );
                    }}
                    Path="PostsImages"
                    Colors={LoadImageColors.Default}
                    Image={block.data.imageUrl}
                ></LoadImage>
                {block.isEditing && (
                    <motion.ul
                        variants={defaultContainer}
                        className={Styles.bottomInfo}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.li
                            onClick={removeImage}
                            className={Styles.trash}
                            variants={defaultItem}
                        >
                            <ButtonIcons Icon={buttonIcons.Trash}></ButtonIcons>
                        </motion.li>
                    </motion.ul>
                )}
            </motion.div>
        )
    );
};
const CodeBlock = ({
    block,
    selectEditMode,
    removeBlock,
}: {
    block: blockType;
    selectEditMode: (blockId: number) => void;
    removeBlock: (blockId: number) => void;
}) => {
    const dispatch = useAppDispatch();
    return (
        'code' in block.data && (
            <LiveProvider code={block.data.code}>
                <motion.div
                    className={classNames(
                        Styles.block,
                        block.isEditing && Styles.active,
                    )}
                    variants={formItem}
                    onClick={() => selectEditMode(block.id)}
                >
                    {block.isEditing ? (
                        <>
                            <LiveEditor
                                onChange={(e) =>
                                    dispatch(
                                        changeDataBlock({
                                            blockId: block.id,
                                            code: e,
                                            type: block.type,
                                        }),
                                    )
                                }
                            ></LiveEditor>
                            <motion.ul
                                variants={defaultContainer}
                                className={Styles.bottomInfo}
                                initial="hidden"
                                animate="visible"
                            >
                                <motion.li variants={defaultItem}>
                                    <ButtonIcons
                                        Icon={buttonIcons.React}
                                    ></ButtonIcons>
                                </motion.li>
                                <motion.li
                                    onClick={() => removeBlock(block.id)}
                                    className={Styles.trash}
                                    variants={defaultItem}
                                >
                                    <ButtonIcons
                                        Icon={buttonIcons.Trash}
                                    ></ButtonIcons>
                                </motion.li>
                            </motion.ul>
                        </>
                    ) : (
                        <LivePreview />
                    )}
                </motion.div>
            </LiveProvider>
        )
    );
};
const SurveyBlock = ({
    block,
    removeBlock,
    selectEditMode,
}: {
    block: blockType;
    removeBlock: (blockId: number) => void;
    selectEditMode: (blockId: number) => void;
}) => {
    const dispatch = useAppDispatch();

    return (
        'question' in block.data && (
            <motion.div
                onClick={() => selectEditMode(block.id)}
                className={classNames(
                    Styles.block,
                    block.isEditing && Styles.active,
                )}
                variants={formItem}
            >
                {!block.isEditing && (
                    <>
                        <div className={Styles.Quest}>
                            {block.data.question}
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
                                    {variant.text}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </>
                )}
                {block.isEditing && (
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
                        <motion.ul
                            variants={defaultContainer}
                            className={Styles.bottomInfo}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.li
                                onClick={() =>
                                    dispatch(addVariant({ blockId: block.id }))
                                }
                                variants={defaultItem}
                            >
                                <HeaderIcons
                                    Icon={headerIcons.Add}
                                ></HeaderIcons>
                            </motion.li>
                            <motion.li
                                onClick={() => removeBlock(block.id)}
                                className={Styles.trash}
                                variants={defaultItem}
                            >
                                <ButtonIcons
                                    Icon={buttonIcons.Trash}
                                ></ButtonIcons>
                            </motion.li>
                        </motion.ul>
                    </>
                )}
            </motion.div>
        )
    );
};

export default RenderBlocks;
