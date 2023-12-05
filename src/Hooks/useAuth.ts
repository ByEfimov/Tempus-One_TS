import { useAppSelector } from './redus-hooks';

export function useAuth() {
    const { email, id, photo, name, age, emailVerified } = useAppSelector(
        (state) => state.user
    );

    return {
        UserIsAuth: !!email,
        UserCanChanging: !!emailVerified && !!email,
        UserEmailVerified: emailVerified,
        UserEmail: email,
        UserId: id,
        UserPhoto: photo,
        UserName: name,
        UserAge: age,
    };
}
