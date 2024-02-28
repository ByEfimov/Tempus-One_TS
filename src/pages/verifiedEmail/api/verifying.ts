import { changeRequest } from '@/features/api/requests/change-request';
import { getCurrentUserData } from '@/features/api/requests/get-current-user';

export function Verifying(UserId: string) {
  location.reload();
  getCurrentUserData().then((currentUser) => {
    if (UserId && currentUser.emailVerified === true) {
      changeRequest('users/' + UserId, '/emailVerified', true);
    }
  });
}
