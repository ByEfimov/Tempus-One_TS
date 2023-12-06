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
                            desc: teams[key].desc,
                            image: teams[key].image,
                            projectDesc: teams[key].projectDesc,
                            projectTitle: teams[key].projectTitle,
                            teamMembers: teams[key].teamMembers,
                            title: teams[key].title,
                            id: key,
                        }));

                    resolve(outputArray);
                } else {
                    reject(null);
                }
            },
            {
                onlyOnce: true,
            }
        );
    });
}
