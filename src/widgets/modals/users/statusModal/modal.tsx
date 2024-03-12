import Styles from './styles.module.scss';
import { formContainer, formItem } from '@/app/assets/Tempus-Ui';
import { IsModal } from '@/shared/modals/isModal';
import { statusType } from '@/shared/userLogo/userLogoWithXp';
import { motion } from 'framer-motion';

const StatusModal = ({
  setModalOpen,
  status,
}: {
  status: statusType | null;
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
