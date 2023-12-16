import { getDatabase, ref, onValue } from 'firebase/database';
import { OpenTeamType } from 'Pages/OpenTeam/TeamPage';

export function getTeamFromId(
    id: string | undefined
): Promise<OpenTeamType | null> {
    const db = getDatabase();
    return new Promise((resolve, reject) => {
        onValue(
            ref(db, 'teams/' + id),
            (snapshot) => {
                if (snapshot.exists()) {
                    const outputObject = {
                        ...snapshot.val(),
                        id: snapshot.key,
                    };

                    resolve(outputObject);
                } else {
                    console.error('Команда не найдена.');
                    reject(null);
                }
            },
            {
                onlyOnce: true,
            }
        );
    });
}
