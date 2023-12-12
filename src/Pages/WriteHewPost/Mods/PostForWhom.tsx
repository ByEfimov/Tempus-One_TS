/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useAuth } from '../../../Hooks/useAuth';
import { useAppDispatch } from '../../../Hooks/redus-hooks';
import { setPostForWhom } from '../../../Store/slices/WritePost/WritePostSlice';
import getUserAdmins from '../../../Api/Teams/GetUserAdmins';

const PostForWhom = () => {
    const { UserId, UserSubscriptions } = useAuth();
    const dispatch = useAppDispatch();
    const [teamsAdmin, setTeamsAdmin] = useState<
        { TeamName: string; TeamId: string }[]
    >([]);

    useEffect(() => {
        if (UserSubscriptions?.teams) {
            getUserAdmins(UserId).then((teams) => setTeamsAdmin(teams));
        }
        dispatch(setPostForWhom({ PostForWhom: UserId }));
    }, []);

    return (
        UserId && (
            <select
                defaultValue={UserId}
                onChange={(e) =>
                    dispatch(setPostForWhom({ PostForWhom: e.target.value }))
                }
            >
                <option value={UserId}>Для себя</option>
                {teamsAdmin &&
                    teamsAdmin.map((team) => (
                        <option key={team.TeamId} value={team.TeamId}>
                            {team.TeamName}
                        </option>
                    ))}
            </select>
        )
    );
};
export default PostForWhom;
