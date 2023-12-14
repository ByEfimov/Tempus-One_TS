import { getDatabase, push, ref, set } from '@firebase/database';

type NewTeam = {
    title: string;
    desc: string;
    projectTitle: string;
    projectDesc: string;
    image: string;
    members: { [key: string]: { UserId: string; UserRole: string } };
};

export function addNewTeam(NewTeam: NewTeam) {
    return new Promise<string | null>((resolve, reject) => {
        const db = getDatabase();
        const postListRef = ref(db, 'teams/');
        const newPostRef = push(postListRef);

        set(newPostRef, NewTeam)
            .then(() => {
                resolve(newPostRef.key);
            })
            .catch((error) => {
                console.error('Ошибка при создании команды.');
                reject(error);
            });
    });
}
