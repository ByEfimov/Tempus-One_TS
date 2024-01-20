import { useAppSelector } from './redux-hooks';
import { decryptData } from 'Utils/crypt-data/cripting-data';
import AppRoutes from 'Utils/routes/app-routes';

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
        members,
        viewings,
        experience,
        level,
        selectedVariants,
    } = useAppSelector((state) => state.user);

    const PathToProfile = email
        ? AppRoutes.USER + '/' + decryptData(id)
        : AppRoutes.LOGIN;

    return {
        UserIsAuth: !!email,
        UserCanChanging: !!emailVerified && !!email,
        UserSubscriptions: subscriptions,
        UserEmailVerified: emailVerified,
        UserEmail: email,
        UserId: decryptData(id),
        UserPhoto: photo,
        UserName: name,
        UserAge: age,
        UserPostsLiked: postsLiked,
        UserMembers: members,
        UserViewings: viewings,
        UserExperience: experience || 0,
        UserLevel: level || 1,
        UserSelectedVariants: selectedVariants,
        PathToProfile,
    };
}
