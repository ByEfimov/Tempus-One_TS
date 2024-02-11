import Styles from './Styles.module.scss';
import {
    ButtonIcons,
    buttonIcons,
    defaultContainer,
    defaultItem,
    formItem,
} from 'Assets/Tempus-Ui';
import { useAppDispatch } from 'Hooks/redux-hooks';
import {
    activeEditing,
    blockType,
    blockTypes,
    blocksType,
    changeDataBlock,
} from 'Store/slices/wite-post/write-post-slice';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

const RenderBlocks = ({ blocksData }: { blocksData: blocksType }) => {
    return blocksData.map((block) => {
        if (block?.type === blockTypes.Text) {
            return <TextBlock key={block.id} block={block}></TextBlock>;
        }
        if (block?.type === blockTypes.Image) {
            return <ImageBlock key={block.id} block={block}></ImageBlock>;
        }
        if (block?.type === blockTypes.Code) {
            return <CodeBlock key={block.id} block={block}></CodeBlock>;
        }

        if (block?.type === blockTypes.Survey) {
            return <SurveyBlock key={block.id} block={block}></SurveyBlock>;
        }
    });
};

const TextBlock = ({ block }: { block: blockType }) => {
    const dispatch = useAppDispatch();

    function selectEditMode() {
        dispatch(activeEditing({ blockId: block.id }));
    }

    if ('content' in block.data) {
        return (
            <motion.div
                variants={formItem}
                className={Styles.block}
                onClick={selectEditMode}
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
                    </motion.ul>
                )}
            </motion.div>
        );
    }
};
const ImageBlock = ({ block }: { block: blockType }) => {
    return 'imageUrl' in block.data && <div>{block.data.imageUrl}</div>;
};
const CodeBlock = ({ block }: { block: blockType }) => {
    return 'code' in block.data && <div>{block.data.code}</div>;
};
const SurveyBlock = ({ block }: { block: blockType }) => {
    return 'question' in block.data && <div>{block.data.question}</div>;
};

export default RenderBlocks;
