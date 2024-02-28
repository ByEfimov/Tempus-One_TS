import { WhoWrotePost } from '@/entities/post/postRender';

export const itsMember = (
  UserId: string | null,
  UserSubscriptions:
    | {
        teams?:
          | {
              [key: string]: string;
            }
          | undefined;
        users?:
          | {
              [key: string]: string;
            }
          | undefined;
      }
    | null
    | undefined,
  WhoWrotePost?: WhoWrotePost,
) =>
  WhoWrotePost?.id === UserId ||
  (UserSubscriptions?.users && Object.values(UserSubscriptions?.users).some((member) => member === WhoWrotePost?.id)) ||
  (UserSubscriptions?.teams && Object.values(UserSubscriptions?.teams).some((member) => member === WhoWrotePost?.id)) ||
  (WhoWrotePost?.members &&
    Object.values(WhoWrotePost?.members).some(
      (member) => member.UserId === UserId && member.UserRole === 'Administrator',
    ));
