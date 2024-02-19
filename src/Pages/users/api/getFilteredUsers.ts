import { getRequestArray } from '@/Api/requests/get-requests';
import { OpenUserType } from '@/Types/TypesOfData/team-or-user/open-user-type';
import { filterUsers } from '@/Utils/filters/filter-users';

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
