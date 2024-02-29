import { NewTeamType } from '../ui/Page';
import { AddUserXp } from '@/app/providers/levelProvider';
import { postRequestWithNewId } from '@/features/api/requests/post-requests-with-new-id';
import AppRoutes from '@/shared/routes/app-routes';
import { countEmptyValues } from '@/shared/validate-data/countEmptyValues';
import { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';

export function createNewTeam(NewTeam: NewTeamType, navigate: NavigateFunction) {
  if (countEmptyValues(NewTeam) === 0) {
    postRequestWithNewId('teams/', NewTeam).then(() => {
      AddUserXp(80);
      navigate(AppRoutes.TEAMS);
    });
  } else {
    toast.error('Не все поля заполнены.');
  }
}
