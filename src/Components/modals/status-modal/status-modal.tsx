import { IsModal } from '../is-modal';
import Styles from '../style.module.scss';
import { statusType } from 'Pages/open-pages/open-user/user-page';

const StatusModal = ({
    setModalOpen,
    status,
}: {
    status?: statusType;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    return (
        <IsModal setModalOpen={setModalOpen}>
            <div className={Styles.StatusModal}>
                <div className={Styles.image}>
                    <img src={status?.image} alt="" />
                </div>
                <div className={Styles.text}>
                    <h1>{status?.name}</h1>
                    <h2>{status?.desc}</h2>
                </div>
            </div>
        </IsModal>
    );
};
export default StatusModal;
