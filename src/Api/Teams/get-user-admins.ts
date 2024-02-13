import {
    equalTo,
    getDatabase,
    onValue,
    orderByChild,
    query,
    ref,
} from '@firebase/database';

export default function getUserAdmins(UserId: string | null) {
    return new Promise<{ value: string; label: string }[]>(
        (resolve, reject) => {
            const db = getDatabase();
            const teamsRef = ref(db, '/teams/');

            const teamAdmin = query(
                teamsRef,
                orderByChild('/members/' + UserId + '/UserRole'),
                equalTo('Administrator'),
            );
            onValue(teamAdmin, (admin) => {
                if (admin.val()) {
                    const Array = [];
                    for (const team in admin.val()) {
                        Array.push({
                            value: team,
                            label: admin.val()[team].title,
                        });
                    }
                    resolve(Array);
                } else {
                    reject(null);
                }
            });
        },
    );
}
