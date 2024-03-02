import Styles from './styles.module.scss';
import { Members } from '@/app/assets/Tempus-Ui';
import { motion } from 'framer-motion';

const Subscribers = ({
  members,
  errorAuthor,
}: {
  members:
    | null
    | {
        UserId: string;
        UserRole: string;
      }[];
  errorAuthor: string;
}) => {
  return (
    <motion.div className={Styles.Group}>
      <div className={Styles.Title}>Подписчики</div>
      {members ? (
        <Members members={members}></Members>
      ) : (
        <div className={Styles.Content}>У этого {errorAuthor} еще нет подписчиков.</div>
      )}
    </motion.div>
  );
};
export { Subscribers };
