import Styles from './styles.module.scss';
import { Members, formItem } from '@/app/assets/Tempus-Ui';
import { motion } from 'framer-motion';

const Subscribers = ({
  members,
  errorAuthor,
  style,
  title,
}: {
  members:
    | null
    | {
        UserId: string;
        UserRole: string;
      }[];
  errorAuthor: string;
  title: string;
  style?: Record<string, string>;
}) => {
  return (
    <motion.div className={style ? style.Group : Styles.Group} variants={formItem}>
      <div className={style ? style.Title : Styles.Title}>{title}</div>
      <div className={style ? style.Content : Styles.Content}>
        {members ? <Members members={members}></Members> : `У этого ${errorAuthor} еще нет подписчиков.`}
      </div>
    </motion.div>
  );
};
export { Subscribers };
