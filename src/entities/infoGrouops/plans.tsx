import Styles from './styles.module.scss';
import { TeamIcons, formItem } from '@/app/assets/Tempus-Ui';
import { CloseModal } from '@/shared/modals/isModal';
import { Plan } from '@/widgets/modals/teams/plansModal/createPlan';
import { motion } from 'framer-motion';
import moment from 'moment';

const currentDate = moment().format('YYYY-MM-DD');

const Plans = ({
  errorAuthor,
  plans,
  setPlansModalOpen,
  style,
  teamModal,
}: {
  errorAuthor: string;
  plans: Plan[];
  teamModal?: boolean;
  style?: Record<string, string>;
  setPlansModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const currentPlan =
    plans &&
    Object.values(plans).find((obj) =>
      Array.isArray(obj.date) ? obj.date.includes(currentDate) : obj.date === currentDate,
    );

  return (
    <motion.div
      variants={formItem}
      style={{ cursor: 'pointer' }}
      onClick={() => {
        teamModal && CloseModal();
        setPlansModalOpen(true);
      }}
      className={style ? style.Group : Styles.Group}
    >
      <div className={style ? style.Title : Styles.Title}>
        Планы на {currentDate} {}
      </div>
      <div className={style ? style.Content : Styles.Content}>
        {currentPlan ? <RenderPlan currentPlan={currentPlan} /> : `В этот день у ${errorAuthor} еще нет планов.`}
      </div>
    </motion.div>
  );
};
export { Plans };

const RenderPlan = ({ currentPlan }: { currentPlan: Plan }) => {
  return (
    <motion.div className={Styles.Plan}>
      <motion.div className={Styles.Type}>
        <TeamIcons Icon={currentPlan.type} />
      </motion.div>
      <motion.div className={Styles.Text}>
        <div className={Styles.Title}>{currentPlan.title}</div>
        <div className={Styles.Desc}>{currentPlan.desc}</div>
      </motion.div>
    </motion.div>
  );
};
