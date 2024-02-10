import Styles from '../Styles.module.scss';
import { Button, ButtonTypes } from 'Assets/Tempus-Ui';
import { CloseModal, IsModal } from 'Components/modals/is-modal';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { useWritePost } from 'Hooks/useWritePost';
import {
    addBlockToPost,
    setSelectMode,
} from 'Store/slices/wite-post/write-post-slice';
import { ModsOfWritePost } from 'Utils/mods-of-comps';
import React, { FC } from 'react';

const ButtonsSelectMode = () => {
    const dispatch = useAppDispatch();
    const { BlocksOfPost } = useWritePost();
    function createNewMode(type: string) {
        dispatch(addBlockToPost({ type }));
        dispatch(setSelectMode({ id: BlocksOfPost.length, type }));
        CloseModal();
    }

    return (
        <div className={Styles.ButtonsOfSelect}>
            <Button
                Title="Код"
                Type={ButtonTypes.active}
                Click={() => createNewMode(ModsOfWritePost.code)}
            ></Button>
            <Button
                Title="Картинка"
                Type={ButtonTypes.active}
                Click={() => createNewMode(ModsOfWritePost.image)}
            ></Button>
            <Button
                Title="Опрос"
                Type={ButtonTypes.active}
                Click={() => createNewMode(ModsOfWritePost.survey)}
            ></Button>
        </div>
    );
};

interface ShowModalProps {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalAddNewMode: FC<ShowModalProps> = ({ setIsModalOpen }) => {
    return (
        <IsModal setModalOpen={setIsModalOpen}>
            <ButtonsSelectMode></ButtonsSelectMode>
        </IsModal>
    );
};

export default ModalAddNewMode;
