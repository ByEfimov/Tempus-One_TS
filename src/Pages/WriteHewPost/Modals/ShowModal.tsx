import React, { FC, LegacyRef } from 'react';
import Styles from './SelectModal.module.scss';
import ButtonVoid from '../../../Components/minicops/buton';
import { LiveError, LiveProvider } from 'react-live';
import { useWritePost } from '../../../Hooks/useWritePost';

const ShowClueForWriteCode = () => {
    return (
        <>
            <h1 className={Styles.Title}>Подсказки для написания кода:</h1>
            <div className={Styles.ResultBlock}>
                В будущем здесь должны быть подсказки. Если их нет на этапе
                релиза, пожалуйста обратитесь к администрации.
            </div>
        </>
    );
};
interface ShowErrorsOfCodeProps {
    userText: string;
}

const ShowErrorsOfCode: FC<ShowErrorsOfCodeProps> = ({ userText }) => {
    return (
        <>
            <h1 className={Styles.Title}>Ваши ошибки:</h1>
            <div className={Styles.ResultBlock}>
                <LiveProvider code={userText}>
                    <LiveError />
                </LiveProvider>
            </div>
        </>
    );
};

interface ShowModalProps {
    mode: string;
    setIsModalOpen: (open: boolean) => void;
}

const ShowModal: FC<ShowModalProps> = ({ mode, setIsModalOpen }) => {
    const { selectMode, BlocksOfPost } = useWritePost();
    const SelectModalRef: LegacyRef<HTMLDivElement> = React.createRef();
    const userText = BlocksOfPost[selectMode.id].text;
    return (
        <div className={Styles.SelectModal} ref={SelectModalRef}>
            <div className={Styles.content}>
                {mode === ModsForShowModal.ClueCode ? (
                    <ShowClueForWriteCode></ShowClueForWriteCode>
                ) : (
                    mode === ModsForShowModal.Errors && (
                        <ShowErrorsOfCode
                            userText={userText || ''}
                        ></ShowErrorsOfCode>
                    )
                )}
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

export default ShowModal;

export const ModsForShowModal = {
    ClueCode: 'ClueCode',
    Errors: 'Errors',
};
