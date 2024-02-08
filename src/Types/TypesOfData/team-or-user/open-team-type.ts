export type OpenTeamType = {
    desc: string;
    image: string;
    members: { UserId: string; UserRole: string }[];
    title: string;
    id: string;
    level: number;
    experience: number;
    direction: string;
};
