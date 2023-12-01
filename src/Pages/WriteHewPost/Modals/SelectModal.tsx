import React, { FC, LegacyRef } from 'react';
import Styles from './SelectModal.module.scss';
import ButtonVoid from '../../../Components/minicops/B-void';
import { ModsOfWritePost } from '../../../Utils/ModsOfComps';
import closePopup from '../../../Utils/anims/closePopup';
import { useAppDispatch } from '../../../Hooks/redus-hooks';
import {
    addBlockToPost,
    setSelectMode,
} from '../../../Store/slices/WritePostSlice';
import { useWritePost } from '../../../Hooks/useWritePost';

interface ShowSelectMode {
    closePopup: () => void;
}

const ShowSelectMode: FC<ShowSelectMode> = ({ closePopup }) => {
    const dispatch = useAppDispatch();
    const { BlocksOfPost } = useWritePost();
    function createNewMode(type: string) {
        dispatch(addBlockToPost({ type }));
        dispatch(setSelectMode({ id: BlocksOfPost.length, type }));
        closePopup();
    }

    return (
        <>
            <h1 className={Styles.Title}>Выбери что ты хочешь добавить:</h1>
            <ButtonVoid
                title="Код"
                clickHandler={() => createNewMode(ModsOfWritePost.kod)}
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
}

const ModalAddNewMode: FC<ShowModalProps> = ({ setIsModalOpen }) => {
    const SelectModalRef: LegacyRef<HTMLDivElement> = React.createRef();

    return (
        <div className={Styles.SelectModal} ref={SelectModalRef}>
            <div className={Styles.content}>
                <ShowSelectMode
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

export default ModalAddNewMode;
