import React, { FC } from 'react';
import Styles from './Modal.module.scss';

interface isModalProps {
    children: React.ReactChild | React.ReactNode;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
}

const IsModal: FC<isModalProps> = ({ children, setModalOpen, title }) => {
    const ModalRef = React.createRef<HTMLDivElement>();

    function closeModal() {
        ModalRef.current?.classList.add(Styles.NavPanelClose);

        setTimeout(() => {
            document.body.style.overflowY = 'auto';
            setModalOpen(false);
        }, 500);
    }

    return (
        <div className={Styles.Modal} ref={ModalRef}>
            <div className={Styles.back} onClick={closeModal}></div>

            <div className={Styles.content}>
                <div className={Styles.Title}>{title}</div>
                {children}
            </div>
        </div>
    );
};
export default IsModal;
