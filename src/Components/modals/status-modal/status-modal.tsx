import { IsModal } from '../is-modal';
import Styles from '../style.module.scss';
import { formContainer, formItem } from '@/Assets/Tempus-Ui';
import { statusType } from '@/Pages/openUser/ui/Page';
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
            <motion.div {...formContainer} className={Styles.StatusModal}>
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
