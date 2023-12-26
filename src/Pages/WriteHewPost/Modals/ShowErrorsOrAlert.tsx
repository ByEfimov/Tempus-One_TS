import React, { FC } from 'react';
import { LiveError, LiveProvider } from 'react-live';
import { useWritePost } from 'Hooks/useWritePost';
import { IsModal } from 'Components/Modals/isModal';

interface ShowModalProps {
    mode: string;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShowErrorsOrAlert: FC<ShowModalProps> = ({ mode, setIsModalOpen }) => {
    const { selectMode, BlocksOfPost } = useWritePost();

    const userText = BlocksOfPost[selectMode.id].text;
    const title =
        mode === ModsForShowModal.ClueCode ? 'Подсказки' : 'Ошибки в коде';

    return (
        <IsModal setModalOpen={setIsModalOpen} title={title}>
            {mode === ModsForShowModal.ClueCode ? (
                <ShowClueForWriteCode></ShowClueForWriteCode>
            ) : (
                mode === ModsForShowModal.Errors && (
                    <LiveProvider code={userText}>
                        <LiveError />
                    </LiveProvider>
                )
            )}
        </IsModal>
    );
};

export default ShowErrorsOrAlert;

export const ModsForShowModal = {
    ClueCode: 'ClueCode',
    Errors: 'Errors',
};

const ShowClueForWriteCode = () => {
    return (
        <>
            <h1>Подсказки для написания кода:</h1>
            <div>
                В будущем здесь должны быть подсказки. Если их нет на этапе
                релиза, пожалуйста обратитесь к администрации.
            </div>
        </>
    );
};
