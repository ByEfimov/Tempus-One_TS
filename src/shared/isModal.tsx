import Styles from './style.module.scss';
import React, { FC, useEffect } from 'react';

interface isModalProps {
    children: React.ReactChild | React.ReactNode;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

let CloseModal: () => void;

const IsModal: FC<isModalProps> = ({ children, setModalOpen }) => {
    const ModalRef = React.createRef<HTMLDivElement>();
    useEffect(() => {
        document.documentElement.style.overflowY = 'hidden';
    }, []);
    function closeModal() {
        ModalRef.current?.classList.add(Styles.NavPanelClose);

        setTimeout(() => {
            document.documentElement.style.overflowY = 'auto';
            setModalOpen(false);
        }, 500);
    }
    CloseModal = closeModal;

    return (
        <div className={Styles.Modal} ref={ModalRef}>
            <div className={Styles.back} onClick={closeModal}></div>

            <div className={Styles.content}>
                <div className={Styles.line}></div>
                {children}
            </div>
        </div>
    );
};
export { IsModal, CloseModal };
