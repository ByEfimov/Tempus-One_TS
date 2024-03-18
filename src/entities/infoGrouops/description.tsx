import Styles from './styles.module.scss';
import { formItem } from '@/app/assets/Tempus-Ui';
import { motion } from 'framer-motion';

const Description = ({ desc, style }: { desc: string; style?: Record<string, string> }) => {
  return (
    <motion.div variants={formItem} className={style ? style.Group : Styles.Group}>
      <div className={style ? style.Title : Styles.Title}>Описание</div>
      <div
        className={style ? style.Content : Styles.Content}
        style={desc.length > 20 ? { textAlign: 'start' } : { textAlign: 'center', width: '100%' }}
      >
        {desc}
      </div>
    </motion.div>
  );
};
export { Description };
