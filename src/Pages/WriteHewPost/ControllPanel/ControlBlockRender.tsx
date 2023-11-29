import classNames from 'classnames';
import ShowCode from '../../../Components/ShowPosts/postsComp/ShowCode';
import ShowImage from '../../../Components/ShowPosts/postsComp/ShowImage';
import { ModsOfWritePost } from '../../../Utils/ModsOfComps';
import Styles from '../Styles.module.scss';
import { FC } from 'react';

interface ControlBlockRenderProps {
    blockData: {
        id: number;
        type: string;
        text: string;
        title?: string | undefined;
    };
    openMod: (blockData: { type: string; id: number }) => void;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    SelectMode: {
        type: string;
        id: number;
    };
    setSelectBlockForModal: React.Dispatch<
        React.SetStateAction<
            | {
                  text: string;
                  type: string;
                  id: number;
                  title?: string | undefined;
              }
            | undefined
        >
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

    const handleInteractionStart = (blockData: {
        text: string;
        type: string;
        id: number;
        title?: string;
    }) => {
        TimeHoldOnButton = setTimeout(() => {
            setIsModalOpen(true);
            window.navigator.vibrate(100);
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
                ) : blockData.type === ModsOfWritePost.kod ? (
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
