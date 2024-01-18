import {
    clearBlockOfPost,
    removeBlockOfPost,
} from '../../../Store/slices/WritePost/WritePostSlice';
import ShowResultBlock from '../ShowResultBlock/ShowResultBlock';
import Styles from '../Styles.module.scss';
import ButtonVoid from 'Components/MiniComponents/button';
import { CloseModal, IsModal } from 'Components/Modals/is-modal';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { useWritePost } from 'Hooks/useWritePost';
import { BlockOfPostType } from 'Types/TypesOfData/Post/WritePost';
import { ModsOfWritePost } from 'Utils/ModsOfComps';
import React, { FC } from 'react';

interface SelectModalProps {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    ResultObject?: BlockOfPostType;
}

const ActivityModal: FC<SelectModalProps> = ({
    setIsModalOpen,
    ResultObject,
}) => {
    const dispatch = useAppDispatch();
    const { TitleOfPost } = useWritePost();

    function deleteMode() {
        dispatch(removeBlockOfPost({ id: ResultObject?.id || 0 }));
        CloseModal();
    }

    function clearMode() {
        dispatch(
            clearBlockOfPost({
                id: ResultObject?.id || 0,
                type: ResultObject?.type || ModsOfWritePost.text,
            }),
        );
        CloseModal();
    }

    return (
        <IsModal
            setModalOpen={setIsModalOpen}
            title={ResultObject?.title || TitleOfPost}
        >
            <ShowResultBlock blockData={ResultObject} />
            <ButtonVoid
                clickHandler={clearMode}
                title="Очистить"
                classes={Styles.BadButton}
                padding={false}
            ></ButtonVoid>
            <ButtonVoid
                clickHandler={deleteMode}
                title="Удалить"
                classes={Styles.BadButton}
                padding={false}
            ></ButtonVoid>
        </IsModal>
    );
};

export default ActivityModal;
