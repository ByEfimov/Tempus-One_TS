import React, { FC } from 'react';
import ButtonVoid from 'Components/MiniComponents/button';
import { ModsOfWritePost } from 'Utils/ModsOfComps';
import { useAppDispatch } from 'Hooks/redux-hooks';
import {
    addBlockToPost,
    setSelectMode,
} from 'Store/slices/WritePost/WritePostSlice';
import { useWritePost } from 'Hooks/useWritePost';
import IsModal from 'Components/Modals/isModal';
import Styles from '../Styles.module.scss';

const ButtonsSelectMode = () => {
    const dispatch = useAppDispatch();
    const { BlocksOfPost } = useWritePost();
    function createNewMode(type: string) {
        dispatch(addBlockToPost({ type }));
        dispatch(setSelectMode({ id: BlocksOfPost.length, type }));
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
