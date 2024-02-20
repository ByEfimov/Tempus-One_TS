import { NewTeamType } from '../ui/Page';
import { postRequestWithNewId } from '@/Api/requests/post-requests-with-new-id';
import AppRoutes from '@/Utils/routes/app-routes';
import isObjectValuesNotEmpty from '@/Utils/validate-data/not-empty-values';
import { AddUserXp } from '@/app/providers/levelProvider';
import { ErrorNotification } from '@/features/notifications/notifications';
import { NavigateFunction } from 'react-router-dom';

export function createNewTeam(
    NewTeam: NewTeamType,
    navigate: NavigateFunction,
) {
    if (isObjectValuesNotEmpty(NewTeam)) {
        postRequestWithNewId('teams/', NewTeam).then(() => {
            AddUserXp(80);
            navigate(AppRoutes.TEAMS);
        });
    } else {
        ErrorNotification('Не все поля заполнены.');
    }
}
