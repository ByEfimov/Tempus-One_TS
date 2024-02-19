import { changeRequest } from '@/Api/requests/change-request';
import { getCurrentUserData } from '@/Api/requests/get-current-user';

export function Verifying(UserId: string) {
    location.reload();
    getCurrentUserData().then((currentUser) => {
        if (currentUser.emailVerified === true) {
            changeRequest('users/' + UserId, '/emailVerified', true);
        }
    });
}
