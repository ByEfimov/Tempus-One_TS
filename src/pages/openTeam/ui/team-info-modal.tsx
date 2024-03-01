import Styles from './styles.module.scss';
import { Members, formContainer, formItem } from '@/app/assets/Tempus-Ui';
import { OpenTeamType } from '@/app/types/TypesOfData/team-or-user/open-team-type';
import { IsModal } from '@/shared/modals/isModal';
import { motion } from 'framer-motion';
import moment from 'moment';

const TeamInfoModal = ({
  setModalOpen,
  OpenTeam,
}: {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  OpenTeam: OpenTeamType;
}) => {
  const currentDate = moment().format('DD.MM.YY');

  return (
    <IsModal setModalOpen={setModalOpen}>
      <motion.ul className={Styles.TeamInfoModal} {...formContainer}>
        <motion.li variants={formItem} className={Styles.Group}>
          <div className={Styles.Title}>
            Участники
            <span>{OpenTeam.members.length > 0 ? OpenTeam.members.length : 0}</span>
          </div>
          <div className={Styles.Content}>
            <Members members={OpenTeam.members}></Members>
          </div>
        </motion.li>
        <motion.li variants={formItem} className={Styles.Group}>
          <div className={Styles.Title}>Соревнования {}</div>
          <div className={Styles.Content}></div>
        </motion.li>
        <motion.li variants={formItem} className={Styles.Group}>
          <div className={Styles.Title}>
            Планы на {currentDate} {}
          </div>
          <div className={Styles.Content}></div>
        </motion.li>
      </motion.ul>
    </IsModal>
  );
};
export default TeamInfoModal;
