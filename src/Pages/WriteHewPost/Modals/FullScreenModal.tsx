import React, { FC, LegacyRef } from 'react';
import Styles from './SelectModal.module.scss';
import ButtonVoid from '../../../Components/minicops/B-void';
import { ModsOfWritePost } from '../../../Utils/ModsOfComps';
import { PostData } from '../WritePost';
import ShowCode from '../../../Components/ShowPosts/postsComp/ShowCode';
import ShowImage from '../../../Components/ShowPosts/postsComp/ShowImage';

interface SelectModalProps {
    setIsModalOpen: (open: boolean) => void;
    ResultObject?: {
        text: string;
        type: string;
        id: number;
        title?: string;
    };
    AllDataOfPost: Array<{
        id: number;
        type: string;
        text: string;
        title?: string;
    }>;
    setSelectMode: (mode: { type: string; id: number }) => void;
    setAllDataForPost: React.Dispatch<React.SetStateAction<PostData>>;
}
interface ShowResultProps {
    ResultObject?: {
        text: string;
        type: string;
        id: number;
        title?: string;
    };
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

const FullScreenModal: FC<SelectModalProps> = ({
    setIsModalOpen,
    ResultObject,
    setSelectMode,
    setAllDataForPost,
    AllDataOfPost,
}) => {
    const SelectModalRef: LegacyRef<HTMLDivElement> = React.createRef();
    function deleteMode() {
        if (ResultObject?.id !== 0) {
            setAllDataForPost(
                AllDataOfPost.filter((item) => item.id !== ResultObject?.id)
            );
            setSelectMode({
                type: ModsOfWritePost.text,
                id: 0,
            });
            closePopup();
        }
    }

    function clearMode() {
        const updatedData = AllDataOfPost.map((item) => {
            if (item.id === ResultObject?.id) {
                return { ...item, text: '', title: '' };
            }
            return item;
        });
        setAllDataForPost(updatedData);
        setSelectMode({
            type: ModsOfWritePost.text,
            id: 0,
        });

        closePopup();
    }

    const closePopup = () => {
        SelectModalRef.current?.classList.add(Styles.SelectModalClose);
        setTimeout(() => {
            setIsModalOpen(false);
        }, 300);
    };

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
                    clickHandler={closePopup}
                    title="Закрыть"
                    classes={Styles.ButtonClose}
                ></ButtonVoid>
            </div>
        </div>
    );
};
export default FullScreenModal;