import ShowResultBlock from '../ShowResultBlock/ShowResultBlock';
import Styles from '../Styles.module.scss';
import { Button, ButtonTypes } from 'Assets/Tempus-Ui';
import { CloseModal, IsModal } from 'Components/modals/is-modal';
import { useAppDispatch } from 'Hooks/redux-hooks';
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
        <IsModal setModalOpen={setIsModalOpen}>
            <div className={Styles.FullScreenModal}>
                <ShowResultBlock blockData={ResultObject} />
                <Button
                    Click={clearMode}
                    Title="Очистить"
                    Type={ButtonTypes.error}
                ></Button>
                <Button
                    Click={deleteMode}
                    Title="Удалить"
                    Type={ButtonTypes.error}
                ></Button>
            </div>
        </IsModal>
    );
};

export default ActivityModal;
