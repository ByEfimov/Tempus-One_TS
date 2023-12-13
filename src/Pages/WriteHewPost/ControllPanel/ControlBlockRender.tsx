import classNames from 'classnames';
import { ModsOfWritePost } from '../../../Utils/ModsOfComps';
import Styles from '../Styles.module.scss';
import { FC } from 'react';
import {
    BlockOfPostType,
    SelectModeType,
} from '../../../Store/slices/WritePost/WritePostSlice';
import ImageMode from './Mods/ImageMode';
import CodeMode from './Mods/CodeMode';
import TextMode from './Mods/TextMode';

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
                <WhatTheBlock
                    blockData={blockData}
                    openMod={openMod}
                ></WhatTheBlock>
            </div>
        )
    );
};

interface WhatTheBlock {
    blockData: BlockOfPostType;
    openMod: (blockData: SelectModeType) => void;
}

const WhatTheBlock: FC<WhatTheBlock> = ({ blockData, openMod }) => {
    const OpenMode = () => openMod(blockData);

    return blockData.type === ModsOfWritePost.text ? (
        <TextMode
            className={Styles.OneceMode}
            openMode={OpenMode}
            id={blockData.id}
            Text={blockData.text}
        ></TextMode>
    ) : blockData.type === ModsOfWritePost.code ? (
        <CodeMode
            className={Styles.OneceMode}
            openMode={OpenMode}
            id={blockData.id}
            Code={blockData.text}
        ></CodeMode>
    ) : (
        blockData.type === ModsOfWritePost.image && (
            <ImageMode
                className={Styles.OneceMode}
                imageUrl={blockData.text}
                openMode={OpenMode}
                id={blockData.id}
            ></ImageMode>
        )
    );
};

export default ControlBlockRender;
