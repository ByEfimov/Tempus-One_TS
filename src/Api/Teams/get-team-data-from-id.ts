import { OpenTeamType } from 'Types/TypesOfData/team-or-user/open-team-type';
import { getDatabase, onValue, ref } from 'firebase/database';

export function getTeamFromId(
    id: string | undefined,
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
                    reject(null);
                }
            },
            {
                onlyOnce: true,
            },
        );
    });
}
