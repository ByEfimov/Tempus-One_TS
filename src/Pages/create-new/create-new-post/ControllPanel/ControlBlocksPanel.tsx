import ActivityModal from '../Modals/FullScreenModal';
import ModalAddNewMode from '../Modals/SelectModal';
import Styles from '../Styles.module.scss';
import ControlBlockRender from './ControlBlockRender';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { useWritePost } from 'Hooks/useWritePost';
import { setSelectMode } from 'Store/slices/wite-post/write-post-slice';
import { BlockOfPostType } from 'Types/TypesOfData/post/write-post';
import FeatherIcon from 'feather-icons-react';
import { useState } from 'react';

export const ControlBlocksPanel = () => {
    const { selectMode, BlocksOfPost } = useWritePost();
    const dispatch = useAppDispatch();
    const [ActivityModalOpen, setActivityModalOpen] = useState(false);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [selectBlockForModal, setSelectBlockForModal] =
        useState<BlockOfPostType>();

    function openMod(blockData: { type: string; id: number }) {
        dispatch(setSelectMode({ type: blockData.type, id: blockData.id }));
    }

    return (
        <>
            {ActivityModalOpen && (
                <ActivityModal
                    setIsModalOpen={setActivityModalOpen}
                    ResultObject={selectBlockForModal}
                ></ActivityModal>
            )}
            {isModalAddOpen && (
                <ModalAddNewMode
                    setIsModalOpen={setIsModalAddOpen}
                ></ModalAddNewMode>
            )}

            <div className={Styles.ControlPanel}>
                {BlocksOfPost.map((blockData) => (
                    <ControlBlockRender
                        key={blockData.id}
                        blockData={blockData}
                        openMod={openMod}
                        setIsModalOpen={setActivityModalOpen}
                        SelectMode={selectMode}
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
