import Styles from './styles.module.scss';
import { ButtonIcons, Members, buttonIcons, formContainer, formItem } from '@/app/assets/Tempus-Ui';
import { OpenTeamType } from '@/app/types/TypesOfData/team-or-user/open-team-type';
import { motion } from 'framer-motion';
import moment from 'moment';

const currentDate = moment().format('DD.MM.YY');

export default function TeamInfo({
  OpenTeam,
  setInfoModalOpen,
}: {
  OpenTeam: OpenTeamType;
  setInfoModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  if (!OpenTeam.members) {
    return <></>;
  }
  if (window.innerWidth < 900) {
    return (
      <motion.div variants={formItem} className={Styles.TeamInfo}>
        <motion.div
          className={Styles.Title}
          onClick={() => {
            setInfoModalOpen(true);
          }}
        >
          Информация
          <div>
            <ButtonIcons Icon={buttonIcons.Arrow}></ButtonIcons>
          </div>
        </motion.div>
      </motion.div>
    );
  }
  if (window.innerWidth >= 900) {
    return (
      <motion.ul {...formContainer} className={Styles.TeamInformation}>
        <motion.li className={Styles.Group}>
          <Members members={OpenTeam.members}></Members>
        </motion.li>
        <motion.li variants={formItem} className={Styles.Group}>
          <div className={Styles.Title}>
            Планы на {currentDate} {}
          </div>
          <div className={Styles.Content}>У этого сообщества еще нет планов.</div>
        </motion.li>
        <motion.li variants={formItem} className={Styles.Group}>
          <div className={Styles.Title}>Последнее соревнование</div>
          <div className={Styles.Content}>Это сообщество еще не соревновалось.</div>
        </motion.li>
      </motion.ul>
    );
  }
}
