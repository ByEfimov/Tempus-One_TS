import { OpenTeamType } from 'Types/TypesOfData/TeamOrUser/OpenTeamType';
import { getDatabase, onValue, ref } from 'firebase/database';

export function getAllTeams() {
    const db = getDatabase();
    return new Promise<OpenTeamType[]>((resolve, reject) => {
        onValue(
            ref(db, 'teams/'),
            (snapshot) => {
                if (snapshot.exists()) {
                    const teams = snapshot.val();
                    const outputArray =
                        teams &&
                        Object.keys(teams).map((key) => ({
                            ...teams[key],
                            id: key,
                        }));

                    resolve(outputArray);
                } else {
                    reject(null);
                }
            },
            {
                onlyOnce: true,
            },
        );
    });
}
