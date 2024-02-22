import Styles from './styles.module.scss';
import { ButtonIcons, buttonIcons, formItem } from '@/app/assets/Tempus-Ui';
import { OpenTeamType } from '@/app/types/TypesOfData/team-or-user/open-team-type';
import { motion } from 'framer-motion';

export default function TeamInfo({
  OpenTeam,
  setInfoModalOpen,
}: {
  OpenTeam: OpenTeamType;
  setInfoModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    OpenTeam && (
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
    )
  );
}
