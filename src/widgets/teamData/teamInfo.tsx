import Styles from './styles.module.scss';
import { ButtonIcons, buttonIcons, formContainer, formItem } from '@/app/assets/Tempus-Ui';
import { OpenTeamType } from '@/app/types/TypesOfData/team-or-user/open-team-type';
import { LastQuiz, Plans, Subscribers } from '@/entities/infoGrouops';
import { motion } from 'framer-motion';

export default function TeamInfo({
  OpenTeam,
  setInfoModalOpen,
}: {
  OpenTeam: OpenTeamType;
  setInfoModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
        <Subscribers errorAuthor="сообщества" members={OpenTeam.members} />
        <Plans errorAuthor="сообщества" />
        <LastQuiz errorAuthor="сообщество" />
      </motion.ul>
    );
  }
}
