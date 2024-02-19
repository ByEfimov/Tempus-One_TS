import { NewTeamType } from '../ui/Page';
import { changeRequest } from '@/Api/requests/change-request';
import { postRequestWithNewId } from '@/Api/requests/post-requests-with-new-id';
import { ErrorNotification } from '@/Components/notifications/notifications';
import AppRoutes from '@/Utils/routes/app-routes';
import isObjectValuesNotEmpty from '@/Utils/validate-data/not-empty-values';
import { NavigateFunction } from 'react-router-dom';

export function createNewTeam(
    NewTeam: NewTeamType,
    UserId: string,
    UserExperience: number,
    navigate: NavigateFunction,
) {
    if (isObjectValuesNotEmpty(NewTeam)) {
        postRequestWithNewId('teams/', NewTeam).then(() => {
            changeRequest(
                'users/' + UserId,
                '/experience',
                UserExperience + 80,
            );
            navigate(AppRoutes.TEAMS);
        });
    } else {
        ErrorNotification('Не все поля заполнены.');
    }
}
