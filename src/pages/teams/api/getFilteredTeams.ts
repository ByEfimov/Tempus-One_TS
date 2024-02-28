import { OpenTeamType } from '@/app/types/TypesOfData/team-or-user/open-team-type';
import { getRequestArray } from '@/features/api/requests/get-requests';
import { filterTeams } from '@/shared/filters/filter-users';

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
