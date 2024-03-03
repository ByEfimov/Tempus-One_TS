import { getRequestObject } from '../requests/get-requests';

export async function getUsersFromIdArray(array: { UserId: string }[]) {
  const memberPromises = Object.values(array).map(async (user) => {
    return await getRequestObject('users/' + user.UserId);
  });
  return await Promise.all(memberPromises);
}
