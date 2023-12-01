import React, { FC, RefObject } from 'react';
import Styles from './SelectModal.module.scss';
import ButtonVoid from '../../../Components/minicops/B-void';
import { ModsOfWritePost } from '../../../Utils/ModsOfComps';
import { AllDataOfPost } from '../WritePost';
import ShowCode from '../../../Components/ShowPosts/postsComp/ShowCode';
import closePopup from '../../../Utils/anims/closePopup';
import ShowImage from '../../../Components/ShowPosts/postsComp/ShowImage';
import { useAppDispatch } from '../../../Hooks/redus-hooks';
import {
    clearBlockOfPost,
    removeBlockOfPost,
} from '../../../Store/slices/WritePostSlice';

interface SelectModalProps {
    setIsModalOpen: (open: boolean) => void;
    ResultObject?: AllDataOfPost;
}
interface ShowResultProps {
    ResultObject: AllDataOfPost | undefined;
}

const ShowResult: FC<ShowResultProps> = ({ ResultObject }) => {
    return (
        <div className={Styles.ResultBlock}>
            {ResultObject?.type === ModsOfWritePost.text ? (
                ResultObject?.text || 'Здесь будет результат.'
            ) : ResultObject?.type === ModsOfWritePost.kod ? (
                <ShowCode UserCode={ResultObject.text} />
            ) : (
                ResultObject?.type === ModsOfWritePost.image && (
                    <div className={Styles.image}>
                        <ShowImage imageSrc={ResultObject.text} />
                    </div>
                )
            )}
        </div>
    );
};

const FullDataModal: FC<SelectModalProps> = ({
    setIsModalOpen,
    ResultObject,
}) => {
    const dispatch = useAppDispatch();
    const SelectModalRef: RefObject<HTMLDivElement> = React.createRef();

    function deleteMode() {
        dispatch(removeBlockOfPost({ id: ResultObject?.id || 0 }));
        closePopup(SelectModalRef, Styles.SelectModalClose, setIsModalOpen);
    }

    function clearMode() {
        dispatch(
            clearBlockOfPost({
                id: ResultObject?.id || 0,
                type: ResultObject?.type || ModsOfWritePost.text,
            })
        );
        closePopup(SelectModalRef, Styles.SelectModalClose, setIsModalOpen);
    }

    return (
        <div className={Styles.SelectModal} ref={SelectModalRef}>
            <div className={Styles.content}>
                <>
                    {ResultObject?.title && (
                        <div className={Styles.Title}>{ResultObject.title}</div>
                    )}

                    <ShowResult ResultObject={ResultObject} />
                </>

                <ButtonVoid
                    clickHandler={clearMode}
                    title="Очистить"
                ></ButtonVoid>
                <ButtonVoid
                    clickHandler={deleteMode}
                    title="Удалить"
                ></ButtonVoid>
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
export default FullDataModal;
