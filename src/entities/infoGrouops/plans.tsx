import Styles from './styles.module.scss';
import { formItem } from '@/app/assets/Tempus-Ui';
import { motion } from 'framer-motion';
import moment from 'moment';

const currentDate = moment().format('DD.MM.YY');

const Plans = ({ errorAuthor }: { errorAuthor: string }) => {
  return (
    <motion.div variants={formItem} className={Styles.Group}>
      <div className={Styles.Title}>
        Планы на {currentDate} {}
      </div>
      <div className={Styles.Content}>У этого {errorAuthor} еще нет планов.</div>
    </motion.div>
  );
};
export { Plans };
