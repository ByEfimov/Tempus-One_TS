import { getDatabase, push, ref, set } from '@firebase/database';

type NewTeam = {
    title: string;
    desc: string;
    projectTitle: string;
    projectDesc: string;
    image: string;
    teamMembers: { UserId: string; UserRole: string }[];
};

export function addNewTeam(NewTeam: NewTeam) {
    const db = getDatabase();
    const postListRef = ref(db, 'teams/');
    const newPostRef = push(postListRef);
    set(newPostRef, NewTeam);
}
