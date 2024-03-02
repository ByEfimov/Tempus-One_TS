import Styles from './styles.module.scss';
import { formItem } from '@/app/assets/Tempus-Ui';
import { motion } from 'framer-motion';

const LastQuiz = ({ errorAuthor }: { errorAuthor: string }) => {
  return (
    <motion.div variants={formItem} className={Styles.Group}>
      <div className={Styles.Title}>Последнее соревнование</div>
      <div className={Styles.Content}>Это {errorAuthor} еще не соревновалось.</div>
    </motion.div>
  );
};
export { LastQuiz };
