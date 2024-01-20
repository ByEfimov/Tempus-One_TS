import Styles from '../Styles.module.scss';
import ButtonVoid from 'Components/mini-components/button';
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
        <>
            <ButtonVoid
                title="Код"
                classes={Styles.PopupButton}
                clickHandler={() => createNewMode(ModsOfWritePost.code)}
                padding={false}
            ></ButtonVoid>
            <ButtonVoid
                title="Картинка"
                padding={false}
                classes={Styles.PopupButton}
                clickHandler={() => createNewMode(ModsOfWritePost.image)}
            ></ButtonVoid>
            <ButtonVoid
                title="Опрос"
                classes={Styles.PopupButton}
                padding={false}
                clickHandler={() => createNewMode(ModsOfWritePost.survey)}
            ></ButtonVoid>
        </>
    );
};

interface ShowModalProps {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalAddNewMode: FC<ShowModalProps> = ({ setIsModalOpen }) => {
    return (
        <IsModal setModalOpen={setIsModalOpen} title="Выбери что добавить:">
            <ButtonsSelectMode></ButtonsSelectMode>
        </IsModal>
    );
};

export default ModalAddNewMode;
