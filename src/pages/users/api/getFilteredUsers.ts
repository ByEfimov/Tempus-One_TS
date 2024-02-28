import { OpenUserType } from '@/app/types/TypesOfData/team-or-user/open-user-type';
import { getRequestArray } from '@/features/api/requests/get-requests';
import { filterUsers } from '@/shared/filters/filter-users';

export function getFilteredUsers(
  HeaderSearchBar: string,
  callback: React.Dispatch<React.SetStateAction<OpenUserType[] | undefined>>,
  users: OpenUserType[] | undefined,
) {
  if (HeaderSearchBar) {
    const filteredUsers = filterUsers(HeaderSearchBar, users);
    callback(filteredUsers);
  } else {
    getRequestArray('users/').then((users) => {
      callback(users);
    });
  }
}
