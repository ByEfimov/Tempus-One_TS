import { useAppSelector } from './redus-hooks';

export function useAuth() {
    const { email, id, photo, name, age } = useAppSelector(
        (state) => state.user
    );
    return {
        UserIsAuth: !!email,
        UserEmail: email,
        UserId: id,
        UserPhoto: photo,
        UserName: name,
        UserAge: age,
    };
}
