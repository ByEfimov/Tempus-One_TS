import { getDatabase, ref, onValue } from 'firebase/database';
import { OpenTeamType } from '../../Pages/OpenTeam/TeamPage';

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
                    console.error('Команды не быди получены.');
                    reject(null);
                }
            },
            {
                onlyOnce: true,
            }
        );
    });
}
