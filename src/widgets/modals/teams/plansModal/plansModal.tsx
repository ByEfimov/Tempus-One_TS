import CreatePlan from './createPlan';
import RenderPlans from './renderPlans';
import { OpenTeamType } from '@/app/types/TypesOfData/team-or-user/open-team-type';
import { IsModal } from '@/shared/modals/isModal';
import { useState } from 'react';

const PlansModal = ({
  setModalOpen,
  OpenTeam,
  UserAdmin,
}: {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  UserAdmin: boolean;
  OpenTeam: OpenTeamType;
}) => {
  const [selectCreate, setSelectCreate] = useState(false);
  return (
    <IsModal setModalOpen={setModalOpen}>
      {UserAdmin && selectCreate && <CreatePlan OpenTeam={OpenTeam} setSelectCreate={setSelectCreate} />}
      {!selectCreate && <RenderPlans userAdmin={UserAdmin} setSelectCreate={setSelectCreate} />}
    </IsModal>
  );
};

export default PlansModal;
