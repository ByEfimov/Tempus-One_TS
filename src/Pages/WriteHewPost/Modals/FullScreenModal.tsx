import React, { FC } from 'react';
import ButtonVoid from 'Components/MiniComponents/button';
import { ModsOfWritePost } from 'Utils/ModsOfComps';
import { useAppDispatch } from 'Hooks/redux-hooks';
import {
    clearBlockOfPost,
    removeBlockOfPost,
} from '../../../Store/slices/WritePost/WritePostSlice';
import { BlockOfPostType } from 'Types/TypesOfData/Post/WritePost';
import IsModal from 'Components/Modals/isModal';
import ShowResultBlock from '../ShowResultBlock/ShowResultBlock';
import Styles from '../Styles.module.scss';
import { useWritePost } from 'Hooks/useWritePost';

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
    }

    function clearMode() {
        dispatch(
            clearBlockOfPost({
                id: ResultObject?.id || 0,
                type: ResultObject?.type || ModsOfWritePost.text,
            })
        );
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
