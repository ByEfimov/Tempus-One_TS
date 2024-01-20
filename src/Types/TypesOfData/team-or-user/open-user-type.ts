export type OpenUserType = {
    photo: string;
    name: string;
    email: string;
    id: string;
    age: number;
    emailVerified: boolean;
    experience: number;
    level: number;
    members: { UserId: string; UserRole: string }[];
};
