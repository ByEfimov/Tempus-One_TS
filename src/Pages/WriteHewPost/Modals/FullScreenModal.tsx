import React, { FC, LegacyRef } from 'react';
import Styles from './SelectModal.module.css';
import ButtonVoid from '../../../Components/minicops/B-void';
import { ModsOfWritePost } from '../../../Utils/ModsOfComps';
import { PostData } from '../WritePost';
import { LiveProvider, LivePreview } from 'react-live';

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
            {ResultObject?.type === ModsOfWritePost.text
                ? ResultObject?.text || 'Здесь будет результат.'
                : ResultObject?.type === ModsOfWritePost.kod && (
                      <LiveProvider
                          enableTypeScript={true}
                          code={ResultObject.text}
                      >
                          <LivePreview />
                      </LiveProvider>
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
            setIsModalOpen(false);
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

        setIsModalOpen(false);
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
                    classes={Styles.ButtonClose}
                ></ButtonVoid>
                <ButtonVoid
                    clickHandler={deleteMode}
                    title="Удалить"
                    classes={Styles.ButtonClose}
                ></ButtonVoid>
                <ButtonVoid
                    clickHandler={() => {
                        SelectModalRef.current?.classList.add(
                            Styles.SelectModalClose
                        );
                        setTimeout(() => {
                            setIsModalOpen(false);
                        }, 300);
                    }}
                    title="Закрыть"
                    classes={Styles.ButtonClose}
                ></ButtonVoid>
            </div>
        </div>
    );
};
export default FullScreenModal;
