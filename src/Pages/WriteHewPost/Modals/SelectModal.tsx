import React, { FC, LegacyRef } from 'react';
import Styles from './SelectModal.module.scss';
import ButtonVoid from '../../../Components/minicops/B-void';
import { PostData } from '../WritePost';
import { ModsOfWritePost } from '../../../Utils/ModsOfComps';
import closePopup from '../../../Utils/anims/closePopup';

interface ShowSelectModeProps {
    setAllDataForPost: React.Dispatch<React.SetStateAction<PostData>>;
    AllDataOfPost: Array<{
        id: number;
        type: string;
        text: string;
        title?: string;
    }>;
    openMod: (blockData: { type: string; id: number }) => void;
    closePopup: () => void;
}

const ShowSelectMode: FC<ShowSelectModeProps> = ({
    setAllDataForPost,
    AllDataOfPost,
    openMod,
    closePopup,
}) => {
    function createNewMode(type: string, text = '', title = '') {
        setAllDataForPost([
            ...AllDataOfPost,
            {
                text: text,
                type: type,
                id: AllDataOfPost.length,
                title: title,
            },
        ]);
        openMod({ type: type, id: AllDataOfPost.length });
        closePopup();
    }

    return (
        <>
            <h1 className={Styles.Title}>Выбери что ты хочешь добавить:</h1>
            <ButtonVoid
                title="Код"
                clickHandler={() =>
                    createNewMode(
                        ModsOfWritePost.kod,
                        '<div>Пиши свой код здесь.</div>'
                    )
                }
            ></ButtonVoid>
            <ButtonVoid
                title="Картинка"
                clickHandler={() => createNewMode(ModsOfWritePost.image)}
            ></ButtonVoid>
        </>
    );
};

interface ShowModalProps {
    setIsModalOpen: (open: boolean) => void;
    setAllDataForPost: React.Dispatch<React.SetStateAction<PostData>>;
    AllDataOfPost: Array<{
        id: number;
        type: string;
        text: string;
        title?: string;
    }>;
    openMod: (blockData: { type: string; id: number }) => void;
}

const SelectModal: FC<ShowModalProps> = ({
    setIsModalOpen,
    setAllDataForPost,
    AllDataOfPost,
    openMod,
}) => {
    const SelectModalRef: LegacyRef<HTMLDivElement> = React.createRef();

    return (
        <div className={Styles.SelectModal} ref={SelectModalRef}>
            <div className={Styles.content}>
                <ShowSelectMode
                    openMod={openMod}
                    setAllDataForPost={setAllDataForPost}
                    AllDataOfPost={AllDataOfPost}
                    closePopup={() =>
                        closePopup(
                            SelectModalRef,
                            Styles.SelectModalClose,
                            setIsModalOpen
                        )
                    }
                ></ShowSelectMode>
                <ButtonVoid
                    clickHandler={() =>
                        closePopup(
                            SelectModalRef,
                            Styles.SelectModalClose,
                            setIsModalOpen
                        )
                    }
                    title="Закрыть"
                    classes={Styles.ButtonClose}
                ></ButtonVoid>
            </div>
        </div>
    );
};

export default SelectModal;
