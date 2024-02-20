import Styles from '../styles.module.scss';
import {
    ButtonIcons,
    buttonIcons,
    defaultContainer,
    defaultItem,
} from '@/Assets/Tempus-Ui';
import { useAppDispatch } from '@/Hooks/redux-hooks';
import {
    blockType,
    removeBlock,
} from '@/Store/slices/wite-post/write-post-slice';
import { motion } from 'framer-motion';

const BottomInfo = ({
    block,
    removeBlockP,
    children,
}: {
    block: blockType;
    removeBlockP?: (blockId: number) => void;
    children?: React.ReactNode;
}) => {
    const dispatch = useAppDispatch();
    function removeBlockF(blockId: number) {
        dispatch(removeBlock({ blockId }));
    }

    return (
        block.isEditing && (
            <motion.ul {...defaultContainer} className={Styles.bottomInfo}>
                {children}
                <motion.li
                    onClick={() =>
                        (removeBlockP && removeBlockP(block.id)) ||
                        removeBlockF(block.id)
                    }
                    className={Styles.trash}
                    variants={defaultItem}
                >
                    <ButtonIcons Icon={buttonIcons.Trash}></ButtonIcons>
                </motion.li>
            </motion.ul>
        )
    );
};

export default BottomInfo;
