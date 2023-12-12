import classNames from 'classnames';
import ShowCode from '../../../Components/ShowPosts/postsComp/ShowCode';
import ShowImage from '../../../Components/ShowPosts/postsComp/ShowImage';
import { ModsOfWritePost } from '../../../Utils/ModsOfComps';
import Styles from '../Styles.module.scss';
import { FC } from 'react';
import {
    BlockOfPostType,
    SelectModeType,
} from '../../../Store/slices/WritePost/WritePostSlice';

interface ControlBlockRenderProps {
    blockData: BlockOfPostType;
    openMod: (blockData: SelectModeType) => void;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    SelectMode: SelectModeType;
    setSelectBlockForModal: React.Dispatch<
        React.SetStateAction<BlockOfPostType | undefined>
    >;
}

const ControlBlockRender: FC<ControlBlockRenderProps> = ({
    blockData,
    openMod,
    setIsModalOpen,
    SelectMode,
    setSelectBlockForModal,
}) => {
    let TimeHoldOnButton: undefined | ReturnType<typeof setTimeout>;

    const handleInteractionStart = (blockData: BlockOfPostType) => {
        TimeHoldOnButton = setTimeout(() => {
            setIsModalOpen(true);
            window.navigator.vibrate(50);
            clearTimeout(TimeHoldOnButton);
            setSelectBlockForModal(blockData);
        }, 700);
    };

    const handleInteractionEnd = () => {
        clearTimeout(TimeHoldOnButton);
    };

    return (
        blockData && (
            <div
                key={blockData.id}
                onMouseDown={() => handleInteractionStart(blockData)}
                onMouseUp={handleInteractionEnd}
                onTouchStart={() => handleInteractionStart(blockData)}
                onTouchEnd={handleInteractionEnd}
                className={classNames(
                    Styles.wrapper,
                    blockData.id === SelectMode.id && Styles.wrapperActive
                )}
            >
                {blockData.type === ModsOfWritePost.text ? (
                    <div
                        onClick={() => openMod(blockData)}
                        className={Styles.OneceMode}
                        key={blockData.id}
                    >
                        {blockData.text}
                    </div>
                ) : blockData.type === ModsOfWritePost.code ? (
                    <div
                        onClick={() => openMod(blockData)}
                        className={Styles.OneceMode}
                        key={blockData.id}
                    >
                        <div>
                            <ShowCode UserCode={blockData.text} />
                        </div>
                    </div>
                ) : (
                    blockData.type === ModsOfWritePost.image && (
                        <div
                            onClick={() => openMod(blockData)}
                            className={Styles.OneceMode}
                            key={blockData.id}
                        >
                            <ShowImage imageSrc={blockData.text}></ShowImage>
                        </div>
                    )
                )}
            </div>
        )
    );
};

export default ControlBlockRender;
