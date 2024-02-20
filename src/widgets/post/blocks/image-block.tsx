import BottomInfo from '../create/bottom-block-info';
import Styles from '../styles.module.scss';
import { formItem } from '@/Assets/Tempus-Ui';
import LoadImage, {
    LoadImageColors,
    LoadImageSizes,
} from '@/Assets/Tempus-Ui/Components/LoadImage/load-image';
import { useAppDispatch } from '@/Hooks/redux-hooks';
import {
    blockType,
    changeDataBlock,
    removeBlock,
} from '@/Store/slices/wite-post/write-post-slice';
import classNames from 'classnames';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import { motion } from 'framer-motion';

const ImageBlock = ({
    block,
    selectEditMode,
}: {
    block: blockType;
    selectEditMode: (blockId: number) => void;
}) => {
    const dispatch = useAppDispatch();

    function removeImage(blockId: number) {
        if (block && 'data' in block && 'imageUrl' in block.data) {
            const parts = block.data.imageUrl?.split('/') || '';
            const encodedId = parts[parts.length - 1].split('?')[0];
            const idWith7 = decodeURIComponent(encodedId);
            const idWithout7 = idWith7.substring(1);
            const storage = getStorage();
            const desertRef = ref(storage, 'P' + idWithout7);
            deleteObject(desertRef);
            dispatch(removeBlock({ blockId }));
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

                <BottomInfo
                    block={block}
                    removeBlockP={removeImage}
                ></BottomInfo>
            </motion.div>
        )
    );
};

export default ImageBlock;
