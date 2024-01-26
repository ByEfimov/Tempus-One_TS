import { IsModal } from 'Components/modals/is-modal';
import { useWritePost } from 'Hooks/useWritePost';
import React, { FC } from 'react';
import { LiveError, LiveProvider } from 'react-live';

interface ShowModalProps {
    mode: string;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShowErrorsOrAlert: FC<ShowModalProps> = ({ mode, setIsModalOpen }) => {
    const { selectMode, BlocksOfPost } = useWritePost();

    const userText = BlocksOfPost[selectMode.id].text;

    return (
        <IsModal setModalOpen={setIsModalOpen}>
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
