import TeamInfoModal from './team-info-modal';
import { OpenTeamType } from '@/app/types/TypesOfData/team-or-user/open-team-type';
import SettingsTeamModal from '@/widgets/settingsModal/teamSettings';

interface modalInterface {
  setSettingsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  OpenTeam: OpenTeamType;
  setInfoModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  infoModalOpen: boolean;
  settingsModalOpen: boolean;
}

function TeamModals({
  setSettingsModalOpen,
  OpenTeam,
  setInfoModalOpen,
  infoModalOpen,
  settingsModalOpen,
}: modalInterface) {
  return (
    <>
      {settingsModalOpen && <SettingsTeamModal setModalOpen={setSettingsModalOpen} team={OpenTeam} />}
      {infoModalOpen && <TeamInfoModal setModalOpen={setInfoModalOpen} OpenTeam={OpenTeam}></TeamInfoModal>}
    </>
  );
}
export default TeamModals;
