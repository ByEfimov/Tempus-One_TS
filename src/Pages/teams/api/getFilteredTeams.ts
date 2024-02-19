import { getRequestArray } from '@/Api/requests/get-requests';
import { OpenTeamType } from '@/Types/TypesOfData/team-or-user/open-team-type';
import { filterTeams } from '@/Utils/filters/filter-users';

export function getFilteredTeams(
    HeaderSearchBar: string,
    callback: React.Dispatch<React.SetStateAction<OpenTeamType[] | undefined>>,
    teams: OpenTeamType[] | undefined,
) {
    if (HeaderSearchBar) {
        const filteredUsers = filterTeams(HeaderSearchBar, teams);
        callback(filteredUsers);
    } else {
        getRequestArray('teams/').then((teams) => {
            callback(teams);
        });
    }
}
