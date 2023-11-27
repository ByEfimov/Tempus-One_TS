import classNames from 'classnames';
import { ModsOfWritePost } from '../../../Utils/ModsOfComps';
import Styles from '../Styles.module.scss';
import { PostData } from '../WritePost';
import FeatherIcon from 'feather-icons-react';
import { FC, useState } from 'react';
import FullScreenModal from '../Modals/FullScreenModal';
import SelectModal from '../Modals/SelectModal';
import ShowCode from '../../../Components/ShowPosts/postsComp/ShowCode';
import ShowImage from '../../../Components/ShowPosts/postsComp/ShowImage';

interface ControlPanelProps {
    AllDataOfPost: Array<{
        id: string;
        type: string;
        text: string;
        title?: string;
    }>;
    SelectMode: { type: string; id: number };
    setAllDataForPost: React.Dispatch<React.SetStateAction<PostData>>;
    setSelectMode: (mode: { type: string; id: number }) => void;
}

const ControlBlocksPanel: FC<ControlPanelProps> = ({
    AllDataOfPost,
    setAllDataForPost,
    setSelectMode,
    SelectMode,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalSelectOpen, setModalSelectOpen] = useState(false);
    const [selectBlockForModal, setSelectBlockForModal] = useState<{
        text: string;
        type: string;
        id: string;
        title?: string;
    }>();

    function createMode() {
        setModalSelectOpen(true);
    }

    function openMod(blockData: { type: string; id: number }) {
        if (blockData.type === ModsOfWritePost.text) {
            document
                .getElementById('topBlock')
                ?.classList.add(Styles.closeTopBlock);
            setTimeout(() => {
                setSelectMode({ type: blockData.type, id: blockData.id });
            }, 300);
        } else {
            setSelectMode({ type: blockData.type, id: blockData.id });
        }
    }

    let TimeHoldOnButton: number;
    const handleInteractionStart = (blockData: {
        text: string;
        type: string;
        id: string;
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
        <>
            {isModalOpen && (
                <FullScreenModal
                    setIsModalOpen={setIsModalOpen}
                    ResultObject={selectBlockForModal}
                    setSelectMode={setSelectMode}
                    setAllDataForPost={setAllDataForPost}
                    AllDataOfPost={AllDataOfPost}
                ></FullScreenModal>
            )}
            {isModalSelectOpen && (
                <SelectModal
                    openMod={openMod}
                    setIsModalOpen={setModalSelectOpen}
                    setAllDataForPost={setAllDataForPost}
                    AllDataOfPost={AllDataOfPost}
                ></SelectModal>
            )}
            <div className={Styles.ControlPanel}>
                {AllDataOfPost.map((blockData) => (
                    <div
                        key={blockData.id}
                        onMouseDown={() => handleInteractionStart(blockData)}
                        onMouseUp={handleInteractionEnd}
                        onTouchStart={() => handleInteractionStart(blockData)}
                        onTouchEnd={handleInteractionEnd}
                        className={classNames(
                            Styles.wrapper,
                            blockData.id === SelectMode.id &&
                                Styles.wrapperActive
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
                                    <ShowImage
                                        imageSrc={blockData.text}
                                    ></ShowImage>
                                </div>
                            )
                        )}
                    </div>
                ))}
                <button className={Styles.ButtonAdd} onClick={createMode}>
                    <FeatherIcon icon="plus" className={Styles.Img} />
                </button>
            </div>
        </>
    );
};

export default ControlBlocksPanel;
