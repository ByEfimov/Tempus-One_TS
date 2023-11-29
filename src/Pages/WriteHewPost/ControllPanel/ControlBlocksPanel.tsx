import { ModsOfWritePost } from '../../../Utils/ModsOfComps';
import Styles from '../Styles.module.scss';
import FeatherIcon from 'feather-icons-react';
import { FC, useState } from 'react';
import FullDataModal from '../Modals/FullScreenModal';
import ModalAddNewMode from '../Modals/SelectModal';
import { PostData } from '../WritePost';
import ControlBlockRender from './ControlBlockRender';

interface ControlPanelProps {
    AllDataOfPost: Array<{
        id: number;
        type: string;
        text: string;
        title?: string;
    }>;
    SelectMode: { type: string; id: number };
    setAllDataForPost: React.Dispatch<React.SetStateAction<PostData>>;
    setSelectMode: (mode: { type: string; id: number }) => void;
}

export const ControlBlocksPanel: FC<ControlPanelProps> = ({
    AllDataOfPost,
    setAllDataForPost,
    setSelectMode,
    SelectMode,
}) => {
    const [isModalFullOpen, setIsModalFullOpen] = useState(false);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [selectBlockForModal, setSelectBlockForModal] = useState<{
        text: string;
        type: string;
        id: number;
        title?: string;
    }>();

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
