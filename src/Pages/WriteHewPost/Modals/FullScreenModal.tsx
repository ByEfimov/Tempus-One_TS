import React, { FC, RefObject } from 'react';
import Styles from './SelectModal.module.scss';
import ButtonVoid from '../../../Components/minicops/B-void';
import { ModsOfWritePost } from '../../../Utils/ModsOfComps';
import { PostData } from '../WritePost';
import ShowCode from '../../../Components/ShowPosts/postsComp/ShowCode';
import closePopup from '../../../Utils/anims/closePopup';
import ShowImage from '../../../Components/ShowPosts/postsComp/ShowImage';
import { AllDataOfPost } from '../ControllPanel/ControlBlocksPanel';

interface SelectModalProps {
    setIsModalOpen: (open: boolean) => void;
    ResultObject?: AllDataOfPost;
    AllDataOfPost: PostData;
    setSelectMode: (mode: { type: string; id: number }) => void;
    setAllDataForPost: React.Dispatch<React.SetStateAction<PostData>>;
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
    setSelectMode,
    setAllDataForPost,
    AllDataOfPost,
}) => {
    const SelectModalRef: RefObject<HTMLDivElement> = React.createRef();

    function deleteMode() {
        if (ResultObject?.id !== 0) {
            setAllDataForPost(
                AllDataOfPost.filter((item) => item.id !== ResultObject?.id)
            );
            setSelectMode({
                type: ModsOfWritePost.text,
                id: 0,
            });

            closePopup(SelectModalRef, Styles.SelectModalClose, setIsModalOpen);
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
