import { ModsOfWritePost } from '../../../Utils/ModsOfComps';
import Styles from '../Styles.module.scss';
import FeatherIcon from 'feather-icons-react';
import { FC, useState } from 'react';
import FullDataModal from '../Modals/FullScreenModal';
import ModalAddNewMode from '../Modals/SelectModal';
import { AllDataOfPost, SelectMode } from '../WritePost';
import ControlBlockRender from './ControlBlockRender';

interface ControlPanelProps {
    AllDataOfPost: AllDataOfPost[];
    SelectMode: SelectMode;
    setAllDataForPost: React.Dispatch<React.SetStateAction<AllDataOfPost[]>>;
    setSelectMode: (mode: SelectMode) => void;
}

export const ControlBlocksPanel: FC<ControlPanelProps> = ({
    AllDataOfPost,
    setAllDataForPost,
    setSelectMode,
    SelectMode,
}) => {
    const [isModalFullOpen, setIsModalFullOpen] = useState(false);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [selectBlockForModal, setSelectBlockForModal] =
        useState<AllDataOfPost>();

    function openMod(blockData: SelectMode) {
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

    return (
        <>
            {isModalFullOpen && (
                <FullDataModal
                    setIsModalOpen={setIsModalFullOpen}
                    ResultObject={selectBlockForModal}
                    setSelectMode={setSelectMode}
                    setAllDataForPost={setAllDataForPost}
                    AllDataOfPost={AllDataOfPost}
                ></FullDataModal>
            )}
            {isModalAddOpen && (
                <ModalAddNewMode
                    openMod={openMod}
                    setIsModalOpen={setIsModalAddOpen}
                    setAllDataForPost={setAllDataForPost}
                    AllDataOfPost={AllDataOfPost}
                ></ModalAddNewMode>
            )}

            <div className={Styles.ControlPanel}>
                {AllDataOfPost.map((blockData) => (
                    <ControlBlockRender
                        blockData={blockData}
                        openMod={openMod}
                        setIsModalOpen={setIsModalFullOpen}
                        SelectMode={SelectMode}
                        setSelectBlockForModal={setSelectBlockForModal}
                    />
                ))}
                <button
                    className={Styles.ButtonAdd}
                    onClick={() => {
                        setIsModalAddOpen(true);
                    }}
                >
                    <FeatherIcon icon="plus" className={Styles.Img} />
                </button>
            </div>
        </>
    );
};
