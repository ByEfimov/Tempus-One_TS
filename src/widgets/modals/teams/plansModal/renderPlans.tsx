import Styles from './styles.module.scss';
import { formContainer, formItem } from '@/app/assets/Tempus-Ui';
import { motion } from 'framer-motion';

const RenderPlans = ({
  setSelectCreate,
  userAdmin,
}: {
  setSelectCreate: React.Dispatch<React.SetStateAction<boolean>>;
  userAdmin: boolean;
}) => {
  return (
    <motion.div {...formContainer}>
      {userAdmin && (
        <motion.div
          variants={formItem}
          className={Styles.TitleC}
          onClick={() => {
            setSelectCreate(true);
          }}
        >
          Добавить план
        </motion.div>
      )}
    </motion.div>
  );
};

export default RenderPlans;
