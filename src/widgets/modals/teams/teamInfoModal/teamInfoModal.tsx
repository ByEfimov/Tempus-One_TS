import Styles from './styles.module.scss';
import { formContainer } from '@/app/assets/Tempus-Ui';
import { OpenTeamType } from '@/app/types/TypesOfData/team-or-user/open-team-type';
import { Description, LastQuiz, Plans, Subscribers } from '@/entities/infoGrouops';
import { IsModal } from '@/shared/modals/isModal';
import { motion } from 'framer-motion';

const TeamInfoModal = ({
  setModalOpen,
  setPlansModalOpen,
  OpenTeam,
}: {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPlansModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  OpenTeam: OpenTeamType;
}) => {
  return (
    <IsModal setModalOpen={setModalOpen}>
      <motion.ul className={Styles.TeamInfoModal} {...formContainer}>
        <Description desc={OpenTeam.desc} style={Styles} />
        <Subscribers title="Участники" members={OpenTeam.members} errorAuthor="сообщества" style={Styles} />
        <LastQuiz errorAuthor="Это сообщество еще не соревновалось." style={Styles} />
        <Plans
          teamModal
          setPlansModalOpen={setPlansModalOpen}
          style={Styles}
          errorAuthor="сообщества"
          plans={OpenTeam.plans}
        />
      </motion.ul>
    </IsModal>
  );
};
export default TeamInfoModal;
