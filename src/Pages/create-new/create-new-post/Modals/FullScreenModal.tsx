import ShowResultBlock from '../ShowResultBlock/ShowResultBlock';
import Styles from '../Styles.module.scss';
import ButtonVoid from 'Components/mini-components/button';
import { CloseModal, IsModal } from 'Components/modals/is-modal';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { useWritePost } from 'Hooks/useWritePost';
import {
    clearBlockOfPost,
    removeBlockOfPost,
} from 'Store/slices/wite-post/write-post-slice';
import { BlockOfPostType } from 'Types/TypesOfData/post/write-post';
import { ModsOfWritePost } from 'Utils/mods-of-comps';
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
