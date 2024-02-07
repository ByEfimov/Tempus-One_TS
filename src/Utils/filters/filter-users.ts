import { OpenTeamType } from 'Types/TypesOfData/team-or-user/open-team-type';
import { OpenUserType } from 'Types/TypesOfData/team-or-user/open-user-type';

export function filterUsers(filter: string, array?: OpenUserType[]) {
    const filteredArray = array;
    if (filter) {
        return filteredArray?.filter((user) =>
            user.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
        );
    }
    return array;
}

export function filterTeams(filter: string, array?: OpenTeamType[]) {
    if (filter) {
        return array?.filter((team) =>
            team.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
        );
    }
    return array;
}
