import { NewTeamType } from '../ui/Page';
import { postRequestWithNewId } from '@/app/api/requests/post-requests-with-new-id';
import { AddUserXp } from '@/app/providers/levelProvider';
import AppRoutes from '@/shared/routes/app-routes';
import isObjectValuesNotEmpty from '@/shared/validate-data/not-empty-values';
import { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';

export function createNewTeam(NewTeam: NewTeamType, navigate: NavigateFunction) {
  if (isObjectValuesNotEmpty(NewTeam)) {
    postRequestWithNewId('teams/', NewTeam).then(() => {
      AddUserXp(80);
      navigate(AppRoutes.TEAMS);
    });
  } else {
    toast.error('Не все поля заполнены.');
  }
}
