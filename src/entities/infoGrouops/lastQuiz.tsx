import Styles from './styles.module.scss';
import { formItem } from '@/app/assets/Tempus-Ui';
import { motion } from 'framer-motion';

const LastQuiz = ({ errorAuthor, style }: { errorAuthor: string; style?: Record<string, string> }) => {
  return (
    <motion.div variants={formItem} className={style ? style.Group : Styles.Group}>
      <div className={style ? style.Title : Styles.Title}>Последнее соревнование</div>
      <div className={style ? style.Content : Styles.Content}>Это {errorAuthor} еще не соревновалось.</div>
    </motion.div>
  );
};
export { LastQuiz };
