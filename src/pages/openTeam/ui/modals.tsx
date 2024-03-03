import { OpenTeamType } from '@/app/types/TypesOfData/team-or-user/open-team-type';
import SettingsTeamModal from '@/widgets/modals/settingsModals/teamSettings';
import PlansModal from '@/widgets/modals/teams/plansModal/plansModal';
import TeamInfoModal from '@/widgets/modals/teams/teamInfoModal/teamInfoModal';

interface modalInterface {
  setSettingsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setInfoModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPlansModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  OpenTeam: OpenTeamType;
  infoModalOpen: boolean;
  settingsModalOpen: boolean;
  plansModalOpen: boolean;
  UserAdmin: boolean;
}

function TeamModals({
  UserAdmin,
  setSettingsModalOpen,
  OpenTeam,
  setInfoModalOpen,
  infoModalOpen,
  settingsModalOpen,
  plansModalOpen,
  setPlansModalOpen,
}: modalInterface) {
  return (
    <>
      {settingsModalOpen && <SettingsTeamModal setModalOpen={setSettingsModalOpen} team={OpenTeam} />}
      {plansModalOpen && <PlansModal OpenTeam={OpenTeam} setModalOpen={setPlansModalOpen} UserAdmin={UserAdmin} />}{' '}
      {infoModalOpen && window.innerWidth < 900 && (
        <TeamInfoModal setPlansModalOpen={setPlansModalOpen} setModalOpen={setInfoModalOpen} OpenTeam={OpenTeam} />
      )}
    </>
  );
}
export default TeamModals;
