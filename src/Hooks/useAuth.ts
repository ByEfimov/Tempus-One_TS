import { useAppSelector } from './redux-hooks';

export function useAuth() {
    const {
        email,
        id,
        photo,
        name,
        age,
        emailVerified,
        subscriptions,
        postsLiked,
    } = useAppSelector((state) => state.user);

    return {
        UserIsAuth: !!email,
        UserCanChanging: !!emailVerified && !!email,
        UserSubscriptions: subscriptions,
        UserEmailVerified: emailVerified,
        UserEmail: email,
        UserId: id,
        UserPhoto: photo,
        UserName: name,
        UserAge: age,
        UserPostsLiked: postsLiked,
    };
}
