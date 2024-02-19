import Styles from '../../../createNewPost/ui/styles.module.scss';
import BottomInfo from '../components/bottom-block-info';
import {
    ButtonIcons,
    buttonIcons,
    defaultItem,
    formItem,
} from '@/Assets/Tempus-Ui';
import { useAppDispatch } from '@/Hooks/redux-hooks';
import {
    blockType,
    changeDataBlock,
} from '@/Store/slices/wite-post/write-post-slice';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { LiveEditor, LivePreview, LiveProvider } from 'react-live';

const CodeBlock = ({
    block,
    selectEditMode,
}: {
    block: blockType;
    selectEditMode: (blockId: number) => void;
}) => {
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
                        <EditingMode block={block} />
                    ) : (
                        <LivePreview />
                    )}

                    <BottomInfo block={block}>
                        <motion.li variants={defaultItem}>
                            <ButtonIcons Icon={buttonIcons.React}></ButtonIcons>
                        </motion.li>
                    </BottomInfo>
                </motion.div>
            </LiveProvider>
        )
    );
};

const EditingMode = ({ block }: { block: blockType }) => {
    const dispatch = useAppDispatch();
    return (
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
    );
};

export default CodeBlock;
