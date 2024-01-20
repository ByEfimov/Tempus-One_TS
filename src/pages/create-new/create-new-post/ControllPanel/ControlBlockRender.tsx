import ShowResultBlock from '../ShowResultBlock/ShowResultBlock';
import Styles from '../Styles.module.scss';
import {
    BlockOfPostType,
    SelectModeType,
} from 'Types/TypesOfData/Post/WritePost';
import classNames from 'classnames';
import { FC } from 'react';

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
                    blockData.id === SelectMode.id && Styles.wrapperActive,
                )}
            >
                <div className={Styles.Content}>
                    <ShowResultBlock
                        blockData={blockData}
                        ClickFunction={() => openMod(blockData)}
                    ></ShowResultBlock>
                </div>
            </div>
        )
    );
};

export default ControlBlockRender;
