import { IsModal } from '../is-modal';
import Styles from '../style.module.scss';
import {
    formContainer,
    formItem,
} from 'Assets/Tempus-Ui/Animation/Form-animate';
import { statusType } from 'Pages/open-pages/open-user/user-page';
import { motion } from 'framer-motion';

const StatusModal = ({
    setModalOpen,
    status,
}: {
    status?: statusType;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    return (
        <IsModal setModalOpen={setModalOpen}>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={formContainer}
                className={Styles.StatusModal}
            >
                <motion.div variants={formItem} className={Styles.image}>
                    <img src={status?.image} alt="" />
                </motion.div>
                <motion.div variants={formItem} className={Styles.text}>
                    <h1>{status?.name}</h1>
                    <h2>{status?.desc}</h2>
                </motion.div>
            </motion.div>
        </IsModal>
    );
};
export default StatusModal;
